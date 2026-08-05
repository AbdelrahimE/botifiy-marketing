import { createHash } from "node:crypto"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { buildFbc, type AttributionData } from "@/lib/attribution"

export type MetaLeadPayloadInput = {
  eventId: string
  eventTime: number
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

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

export function normalizeMetaName(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ar")
    .replace(/[^\p{L}\p{N}]/gu, "")
}

export function normalizeMetaPhone(value: string) {
  return value.replace(/\D/g, "")
}

function validMetaCookie(value?: string) {
  const cleaned = value?.trim().slice(0, 500)
  return cleaned && /^fb\.\d+\.\d+\./.test(cleaned) ? cleaned : undefined
}

function attributionFbclid(attribution: AttributionData | null) {
  if (!attribution) return undefined
  return attribution.lastTouch.fbclid ?? attribution.firstTouch.fbclid
}

function attributionTimestamp(attribution: AttributionData | null) {
  if (!attribution) return Date.now()
  const touch = attribution.lastTouch.fbclid ? attribution.lastTouch : attribution.firstTouch
  const timestamp = Date.parse(touch.touchedAt)
  return Number.isNaN(timestamp) ? Date.now() : timestamp
}

export function buildMetaLeadPayload(input: MetaLeadPayloadInput) {
  const phone = parsePhoneNumberFromString(input.whatsapp)
  const firstName = normalizeMetaName(input.name.split(/\s+/u)[0] ?? input.name)
  const normalizedPhone = normalizeMetaPhone(input.whatsapp)
  const fbclid = attributionFbclid(input.attribution)
  const fbc = validMetaCookie(input.fbc) ??
    (fbclid ? buildFbc(fbclid, attributionTimestamp(input.attribution)) : undefined)
  const fbp = validMetaCookie(input.fbp)

  const userData: {
    ph: string[]
    external_id: string[]
    fn?: string[]
    ctry?: string[]
    client_ip_address: string
    client_user_agent: string
    fbc?: string
    fbp?: string
  } = {
    ph: [sha256(normalizedPhone)],
    external_id: [sha256(input.eventId)],
    client_ip_address: input.ip,
    client_user_agent: input.userAgent,
  }

  if (firstName) userData.fn = [sha256(firstName)]
  if (phone?.country) userData.ctry = [sha256(phone.country.toLowerCase())]
  if (fbc) userData.fbc = fbc
  if (fbp) userData.fbp = fbp

  return {
    event_name: "Lead",
    event_time: input.eventTime,
    event_id: input.eventId,
    event_source_url: input.eventSourceUrl,
    action_source: "website",
    user_data: userData,
    custom_data: {
      content_name: "Botifiy activation request",
      content_category: "lead",
      selected_plan: input.selectedPlan,
      source: input.source,
    },
  }
}
