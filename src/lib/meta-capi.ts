import "server-only"

import type { AttributionData } from "@/lib/attribution"
import { buildMetaLeadPayload } from "@/lib/meta-capi-payload"

type SendMetaLeadInput = {
  eventId: string
  createdAt: string
  eventSourceUrl: string
  name: string
  whatsapp: string
  selectedPlan: string
  source: string
  ip: string
  userAgent: string
  fbc?: string
  fbp?: string
  attribution: AttributionData | null
}

type MetaApiResponse = {
  events_received?: number
  messages?: string[]
  fbtrace_id?: string
  error?: { message?: string; code?: number }
}

export type MetaSendResult =
  | { status: "sent"; traceId?: string }
  | { status: "skipped"; reason: "configuration_missing" }

function graphApiVersion() {
  const configured = process.env.META_GRAPH_API_VERSION?.trim()
  return configured && /^v\d+\.\d+$/.test(configured) ? configured : "v25.0"
}

export async function sendMetaLead(input: SendMetaLeadInput): Promise<MetaSendResult> {
  const pixelId =
    process.env.META_PIXEL_ID?.trim() ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
    "1387649563296613"
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN?.trim()

  if (!pixelId || !accessToken) {
    return { status: "skipped", reason: "configuration_missing" }
  }

  const createdAt = Date.parse(input.createdAt)
  const eventTime = Math.floor((Number.isNaN(createdAt) ? Date.now() : createdAt) / 1_000)
  const payload: { data: unknown[]; test_event_code?: string } = {
    data: [buildMetaLeadPayload({ ...input, eventTime })],
  }
  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim()
  if (testEventCode) payload.test_event_code = testEventCode

  const response = await fetch(
    `https://graph.facebook.com/${graphApiVersion()}/${encodeURIComponent(pixelId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    },
  )
  const result = (await response.json().catch(() => null)) as MetaApiResponse | null

  if (!response.ok || result?.error || (result?.events_received ?? 0) < 1) {
    const code = result?.error?.code ?? response.status
    const message = result?.error?.message ?? result?.messages?.join("; ") ?? "UNKNOWN_RESPONSE"
    throw new Error(`META_CAPI_${code}:${message.slice(0, 300)}`)
  }

  return { status: "sent", traceId: result?.fbtrace_id }
}
