import "server-only"

type LeadWhatsAppGateInput = {
  name: string
  whatsapp: string
  submissionKey: string
}

export type LeadWhatsAppGateResult =
  | { status: "sent"; whatsappMessageId: string }
  | { status: "not_registered" }
  | { status: "rate_limited" }
  | { status: "unavailable" }

const GATE_TIMEOUT_MS = 25_000

function getQualificationConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, "")
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim()
  if (!supabaseUrl || !anonKey) throw new Error("SUPABASE_CONFIGURATION_MISSING")
  return {
    url: `${supabaseUrl}/functions/v1/qualify-lead-whatsapp`,
    anonKey,
  }
}

export async function qualifyLeadWhatsApp(
  input: LeadWhatsAppGateInput,
): Promise<LeadWhatsAppGateResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), GATE_TIMEOUT_MS)

  try {
    const { url, anonKey } = getQualificationConfig()
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(input),
      cache: "no-store",
      signal: controller.signal,
    })
    const result = (await response.json().catch(() => null)) as
      | {
          ok?: boolean
          status?: string
          code?: string
          whatsappMessageId?: string | null
        }
      | null

    if (
      response.ok
      && result?.ok === true
      && result.status === "sent"
      && typeof result.whatsappMessageId === "string"
      && result.whatsappMessageId
    ) {
      return { status: "sent", whatsappMessageId: result.whatsappMessageId }
    }
    if (response.status === 422 && result?.code === "WHATSAPP_NOT_REGISTERED") {
      return { status: "not_registered" }
    }
    if (response.status === 429 && result?.code === "RATE_LIMITED") {
      return { status: "rate_limited" }
    }

    return { status: "unavailable" }
  } catch {
    return { status: "unavailable" }
  } finally {
    clearTimeout(timeout)
  }
}
