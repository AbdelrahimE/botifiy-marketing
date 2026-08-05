import { readBrowserCookie } from "@/lib/consent"

export const ATTRIBUTION_COOKIE_NAME = "botifiy_attribution_v1"

const FIELD_LIMIT = 240
const URL_LIMIT = 1_200

const OPTIONAL_TOUCH_LIMITS: Partial<Record<keyof AttributionTouch, number>> = {
  referrer: URL_LIMIT,
  utmSource: FIELD_LIMIT,
  utmMedium: FIELD_LIMIT,
  utmCampaign: FIELD_LIMIT,
  utmId: FIELD_LIMIT,
  utmContent: FIELD_LIMIT,
  utmTerm: FIELD_LIMIT,
  campaignId: FIELD_LIMIT,
  adsetId: FIELD_LIMIT,
  adId: FIELD_LIMIT,
  placement: FIELD_LIMIT,
  internalSource: FIELD_LIMIT,
  fbclid: 500,
}

export type AttributionTouch = {
  landingPage: string
  referrer?: string
  touchedAt: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmId?: string
  utmContent?: string
  utmTerm?: string
  campaignId?: string
  adsetId?: string
  adId?: string
  placement?: string
  internalSource?: string
  fbclid?: string
}

export type AttributionData = {
  version: 1
  firstTouch: AttributionTouch
  lastTouch: AttributionTouch
}

const PARAMETER_MAP = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_id: "utmId",
  utm_content: "utmContent",
  utm_term: "utmTerm",
  campaign_id: "campaignId",
  adset_id: "adsetId",
  ad_id: "adId",
  placement: "placement",
  source: "internalSource",
} as const

function cleanValue(value: string | null, limit = FIELD_LIMIT) {
  const cleaned = value
    ?.replace(/[\u0000-\u001F\u007F<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit)

  return cleaned || undefined
}

function isTouch(value: unknown): value is AttributionTouch {
  if (!value || typeof value !== "object") return false
  const touch = value as Partial<AttributionTouch>
  if (
    typeof touch.landingPage !== "string" ||
    touch.landingPage.length > URL_LIMIT ||
    typeof touch.touchedAt !== "string" ||
    touch.touchedAt.length > 40 ||
    Number.isNaN(Date.parse(touch.touchedAt))
  ) return false

  try {
    const landingPage = new URL(touch.landingPage)
    if (!["http:", "https:"].includes(landingPage.protocol)) return false
  } catch {
    return false
  }

  return Object.entries(OPTIONAL_TOUCH_LIMITS).every(([field, limit]) => {
    const fieldValue = touch[field as keyof AttributionTouch]
    return fieldValue === undefined || (typeof fieldValue === "string" && fieldValue.length <= limit)
  })
}

export function parseAttributionCookie(value?: string | null): AttributionData | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<AttributionData>
    if (parsed.version !== 1 || !isTouch(parsed.firstTouch) || !isTouch(parsed.lastTouch)) {
      return null
    }

    return parsed as AttributionData
  } catch {
    return null
  }
}

export function serializeAttributionCookie(attribution: AttributionData) {
  return encodeURIComponent(JSON.stringify(attribution))
}

function sanitizedPageUrl(url: URL, allowMarketing: boolean) {
  const storedUrl = new URL(url.origin + url.pathname)

  for (const parameter of Object.keys(PARAMETER_MAP)) {
    const value = cleanValue(url.searchParams.get(parameter))
    if (value) storedUrl.searchParams.set(parameter, value)
  }

  if (allowMarketing) {
    const fbclid = cleanValue(url.searchParams.get("fbclid"), 500)
    if (fbclid) storedUrl.searchParams.set("fbclid", fbclid)
  }

  return storedUrl.toString().slice(0, URL_LIMIT)
}

function sanitizedReferrer(referrer: string) {
  if (!referrer) return undefined

  try {
    const url = new URL(referrer)
    if (!["http:", "https:"].includes(url.protocol)) return undefined
    return cleanValue(`${url.origin}${url.pathname}`, URL_LIMIT)
  } catch {
    return undefined
  }
}

function createTouch(url: URL, referrer: string, allowMarketing: boolean, touchedAt: string) {
  const touch: AttributionTouch = {
    landingPage: sanitizedPageUrl(url, allowMarketing),
    touchedAt,
  }
  const cleanReferrer = sanitizedReferrer(referrer)
  if (cleanReferrer) touch.referrer = cleanReferrer

  for (const [parameter, field] of Object.entries(PARAMETER_MAP)) {
    const value = cleanValue(url.searchParams.get(parameter))
    if (value) touch[field] = value
  }

  if (allowMarketing) {
    const fbclid = cleanValue(url.searchParams.get("fbclid"), 500)
    if (fbclid) touch.fbclid = fbclid
  }

  return touch
}

function redactMarketingIdentifiers(touch: AttributionTouch): AttributionTouch {
  const redacted = { ...touch }
  delete redacted.fbclid
  const url = new URL(redacted.landingPage)
  url.searchParams.delete("fbclid")
  return { ...redacted, landingPage: url.toString().slice(0, URL_LIMIT) }
}

function hasCampaignContext(touch: AttributionTouch) {
  return Boolean(
    touch.utmSource ||
      touch.utmMedium ||
      touch.utmCampaign ||
      touch.utmId ||
      touch.campaignId ||
      touch.adsetId ||
      touch.adId ||
      touch.placement ||
      touch.internalSource ||
      touch.fbclid,
  )
}

export function captureAttribution(
  currentUrl: string,
  referrer: string,
  existing: AttributionData | null,
  allowMarketing: boolean,
  now = new Date(),
): AttributionData {
  const url = new URL(currentUrl)
  const currentTouch = createTouch(url, referrer, allowMarketing, now.toISOString())

  if (!existing) {
    return { version: 1, firstTouch: currentTouch, lastTouch: currentTouch }
  }

  const firstTouch = allowMarketing
    ? existing.firstTouch
    : redactMarketingIdentifiers(existing.firstTouch)
  let lastTouch = allowMarketing
    ? existing.lastTouch
    : redactMarketingIdentifiers(existing.lastTouch)

  if (hasCampaignContext(currentTouch)) {
    lastTouch = {
      ...lastTouch,
      ...currentTouch,
      referrer: currentTouch.referrer ?? lastTouch.referrer,
    }
  }

  return { version: 1, firstTouch, lastTouch }
}

export function readBrowserAttribution() {
  return parseAttributionCookie(readBrowserCookie(ATTRIBUTION_COOKIE_NAME))
}

export function writeBrowserAttribution(attribution: AttributionData) {
  if (typeof document === "undefined") return
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${ATTRIBUTION_COOKIE_NAME}=${serializeAttributionCookie(attribution)}; Path=/; Max-Age=7776000; SameSite=Lax${secure}`
}

export function attributionSource(attribution: AttributionData | null, fallback: string) {
  const paidSource = attribution?.lastTouch.utmSource ?? attribution?.firstTouch.utmSource
  return cleanValue(typeof paidSource === "string" ? paidSource : fallback, 120) ?? "direct"
}

export function buildFbc(fbclid: string, timestamp = Date.now()) {
  return `fb.1.${timestamp}.${fbclid}`
}
