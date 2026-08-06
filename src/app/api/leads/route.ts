import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  attributionSource,
  parseAttributionCookie,
  ATTRIBUTION_COOKIE_NAME,
} from "@/lib/attribution"
import {
  allowsMarketingMeasurement,
  CONSENT_COOKIE_NAME,
  parseConsentCookie,
} from "@/lib/consent"
import { sendLeadToGoogleSheets } from "@/lib/google-sheets"
import { leadFormSchema } from "@/lib/lead-schema"
import { qualifyLeadWhatsApp } from "@/lib/lead-whatsapp-gate"
import { sendMetaLead } from "@/lib/meta-capi"
import { saveLead } from "@/lib/supabase-leads"

export const runtime = "nodejs"
export const maxDuration = 60

const MAX_BODY_SIZE = 12_000
const PRODUCTION_ORIGINS = new Set([
  "https://botifiy.com",
  "https://www.botifiy.com",
])

function isAllowedOrigin(request: NextRequest, origin: string | null) {
  if (!origin) return true

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_ORIGINS.has(origin)
  }

  return origin === request.nextUrl.origin
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return (
    request.headers.get("cf-connecting-ip") ??
    forwardedFor ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0"
  ).slice(0, 64)
}

function getEventSourceUrl(request: NextRequest) {
  const fallback = `${request.nextUrl.origin}/activate`
  const referer = request.headers.get("referer")
  if (!referer) return fallback

  try {
    const url = new URL(referer)
    if (!["http:", "https:"].includes(url.protocol)) return fallback
    if (url.origin !== request.nextUrl.origin && !PRODUCTION_ORIGINS.has(url.origin)) return fallback
    return `${url.origin}${url.pathname}`.slice(0, 2_000)
  } catch {
    return fallback
  }
}

function logLeadEvent(
  level: "info" | "warn" | "error",
  event: string,
  details: Record<string, unknown>,
) {
  console[level](JSON.stringify({ service: "lead-capture", event, ...details }))
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const contentLength = Number(request.headers.get("content-length") ?? 0)

  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ ok: false, message: "الطلب أكبر من المسموح." }, { status: 413 })
  }

  const origin = request.headers.get("origin")
  if (!isAllowedOrigin(request, origin)) {
    logLeadEvent("warn", "origin_rejected", { requestId, origin })
    return NextResponse.json({ ok: false, message: "تعذر إرسال الطلب." }, { status: 403 })
  }

  try {
    const rawBody = await request.json()
    const parsed = leadFormSchema.parse(rawBody)

    // Honeypot: return a neutral response without writing bot traffic to either system.
    if (parsed.companyWebsite) {
      logLeadEvent("warn", "honeypot_triggered", { requestId })
      return NextResponse.json({ ok: true, accepted: false }, { status: 202 })
    }

    const ip = getClientIp(request)
    const userAgent = (request.headers.get("user-agent") ?? "unknown").slice(0, 500)
    const qualification = await qualifyLeadWhatsApp({
      name: parsed.name,
      whatsapp: parsed.whatsapp,
      submissionKey: parsed.submissionKey,
    })

    if (qualification.status !== "sent") {
      logLeadEvent("warn", `whatsapp_${qualification.status}`, { requestId })

      if (qualification.status === "not_registered") {
        return NextResponse.json(
          {
            ok: false,
            code: "WHATSAPP_NOT_REGISTERED",
            field: "whatsapp",
            message: "الرقم ده غير مسجل على واتساب. راجع الرقم وكود الدولة وحاول مرة تانية.",
          },
          { status: 422 },
        )
      }
      if (qualification.status === "rate_limited") {
        return NextResponse.json(
          {
            ok: false,
            code: "RATE_LIMITED",
            message: "وصلنا أكتر من طلب لنفس الرقم. استنى شوية أو تواصل معانا على واتساب.",
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          ok: false,
          code: "WHATSAPP_CHECK_UNAVAILABLE",
          message: "مقدرناش نتأكد من رقم واتساب دلوقتي. حاول مرة تانية بعد شوية.",
        },
        { status: 503 },
      )
    }

    logLeadEvent("info", "whatsapp_qualified", {
      requestId,
      hasMessageId: Boolean(qualification.whatsappMessageId),
    })

    const consent = parseConsentCookie(request.cookies.get(CONSENT_COOKIE_NAME)?.value)
    const marketingAllowed = allowsMarketingMeasurement(consent)
    const attribution = parseAttributionCookie(
      request.cookies.get(ATTRIBUTION_COOKIE_NAME)?.value,
    )
    const normalizedLead = {
      name: parsed.name,
      whatsapp: parsed.whatsapp,
      businessType: parsed.businessType,
      needs: parsed.needs,
      selectedPlan: parsed.selectedPlan,
      submissionKey: parsed.submissionKey,
      companyWebsite: parsed.companyWebsite,
      source: attributionSource(attribution, parsed.source),
    }
    const savedLead = await saveLead({
      ...normalizedLead,
      ip,
      userAgent,
      attribution,
      marketingConsent: marketingAllowed,
      consentUpdatedAt: consent?.updatedAt ?? null,
    })

    logLeadEvent("info", "supabase_saved", {
      requestId,
      leadId: savedLead.id,
      duplicate: savedLead.duplicate,
      selectedPlan: normalizedLead.selectedPlan,
    })

    if (marketingAllowed) {
      try {
        const metaResult = await sendMetaLead({
          eventId: savedLead.id,
          createdAt: savedLead.created_at,
          eventSourceUrl: getEventSourceUrl(request),
          name: normalizedLead.name,
          whatsapp: normalizedLead.whatsapp,
          selectedPlan: normalizedLead.selectedPlan,
          source: normalizedLead.source,
          ip,
          userAgent,
          fbc: request.cookies.get("_fbc")?.value,
          fbp: request.cookies.get("_fbp")?.value,
          attribution,
        })

        logLeadEvent(metaResult.status === "sent" ? "info" : "warn", `meta_${metaResult.status}`, {
          requestId,
          leadId: savedLead.id,
          ...(metaResult.status === "sent"
            ? { traceId: metaResult.traceId }
            : { reason: metaResult.reason }),
        })
      } catch (error) {
        logLeadEvent("error", "meta_failed", {
          requestId,
          leadId: savedLead.id,
          error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
        })
      }
    } else {
      logLeadEvent("info", "meta_skipped_no_consent", { requestId, leadId: savedLead.id })
    }

    if (!savedLead.duplicate) {
      try {
        await sendLeadToGoogleSheets({ ...normalizedLead, ip, userAgent, savedLead })
        logLeadEvent("info", "google_sheets_synced", { requestId, leadId: savedLead.id })
      } catch (error) {
        logLeadEvent("error", "google_sheets_failed", {
          requestId,
          leadId: savedLead.id,
          error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
        })
      }
    }

    return NextResponse.json({
      ok: true,
      accepted: true,
      leadId: savedLead.id,
      source: normalizedLead.source,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      logLeadEvent("warn", "validation_failed", {
        requestId,
        fields: error.issues.map((issue) => issue.path.join(".")),
      })
      return NextResponse.json(
        { ok: false, message: "راجع البيانات المكتوبة وحاول مرة تانية." },
        { status: 422 },
      )
    }

    const errorMessage = error instanceof Error ? error.message : "UNKNOWN_ERROR"
    const isRateLimited = errorMessage.includes("RATE_LIMITED")

    logLeadEvent("error", isRateLimited ? "rate_limited" : "supabase_failed", {
      requestId,
      error: errorMessage,
    })

    return NextResponse.json(
      {
        ok: false,
        message: isRateLimited
          ? "وصلنا أكتر من طلب في وقت قصير. استنى شوية أو تواصل معانا على واتساب."
          : "حصلت مشكلة مؤقتة ومقدرناش نحفظ طلبك. حاول مرة تانية أو تواصل معانا على واتساب.",
      },
      { status: isRateLimited ? 429 : 500 },
    )
  }
}
