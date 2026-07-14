import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { sendLeadToGoogleSheets } from "@/lib/google-sheets"
import { leadFormSchema } from "@/lib/lead-schema"
import { saveLead } from "@/lib/supabase-leads"

export const runtime = "nodejs"

const MAX_BODY_SIZE = 12_000

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return (
    request.headers.get("cf-connecting-ip") ??
    forwardedFor ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0"
  ).slice(0, 64)
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
  if (origin && origin !== request.nextUrl.origin) {
    logLeadEvent("warn", "origin_rejected", { requestId, origin })
    return NextResponse.json({ ok: false, message: "تعذر إرسال الطلب." }, { status: 403 })
  }

  try {
    const rawBody = await request.json()
    const parsed = leadFormSchema.parse(rawBody)

    // Honeypot: return a neutral response without writing bot traffic to either system.
    if (parsed.companyWebsite) {
      logLeadEvent("warn", "honeypot_triggered", { requestId })
      return NextResponse.json({ ok: true }, { status: 202 })
    }

    const ip = getClientIp(request)
    const userAgent = (request.headers.get("user-agent") ?? "unknown").slice(0, 500)
    const savedLead = await saveLead({ ...parsed, ip, userAgent })

    logLeadEvent("info", "supabase_saved", {
      requestId,
      leadId: savedLead.id,
      duplicate: savedLead.duplicate,
      selectedPlan: parsed.selectedPlan,
    })

    if (!savedLead.duplicate) {
      try {
        await sendLeadToGoogleSheets({ ...parsed, ip, userAgent, savedLead })
        logLeadEvent("info", "google_sheets_synced", { requestId, leadId: savedLead.id })
      } catch (error) {
        logLeadEvent("error", "google_sheets_failed", {
          requestId,
          leadId: savedLead.id,
          error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
        })
      }
    }

    return NextResponse.json({ ok: true, leadId: savedLead.id })
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

