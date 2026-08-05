export const CONSENT_COOKIE_NAME = "botifiy_consent_v1"
export const CONSENT_EVENT_NAME = "botifiy:consent-updated"

/**
 * Intentionally disabled for the current release (2026-08-05).
 * The current paid campaigns target Arab-region markets only, and the product
 * owner chose not to interrupt the lead journey with a consent dialog. Keep the
 * complete consent implementation in place so it can be re-enabled here if the
 * targeting geography, legal requirements, or business policy changes later.
 */
export const CONSENT_UI_ENABLED = false

export type ConsentPreferences = {
  version: 1
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function allowsAnalyticsMeasurement(consent: ConsentPreferences | null) {
  return !CONSENT_UI_ENABLED || consent?.analytics === true
}

export function allowsMarketingMeasurement(consent: ConsentPreferences | null) {
  return !CONSENT_UI_ENABLED || consent?.marketing === true
}

type StoredConsent = {
  v?: unknown
  a?: unknown
  m?: unknown
  t?: unknown
}

export function parseConsentCookie(value?: string | null): ConsentPreferences | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as StoredConsent
    if (
      parsed.v !== 1 ||
      typeof parsed.a !== "boolean" ||
      typeof parsed.m !== "boolean" ||
      typeof parsed.t !== "string" ||
      Number.isNaN(Date.parse(parsed.t))
    ) {
      return null
    }

    return {
      version: 1,
      analytics: parsed.a,
      marketing: parsed.m,
      updatedAt: parsed.t,
    }
  } catch {
    return null
  }
}

export function serializeConsentCookie(preferences: ConsentPreferences) {
  return encodeURIComponent(
    JSON.stringify({
      v: preferences.version,
      a: preferences.analytics,
      m: preferences.marketing,
      t: preferences.updatedAt,
    }),
  )
}

export function readBrowserCookie(name: string) {
  if (typeof document === "undefined") return undefined

  const prefix = `${name}=`
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length)
}

export function readBrowserConsent() {
  return parseConsentCookie(readBrowserCookie(CONSENT_COOKIE_NAME))
}

function expireCookie(name: string, domain?: string) {
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : ""
  const cookieDomain = domain ? `; Domain=${domain}` : ""
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${cookieDomain}${secure}`
}

function clearMetaCookies() {
  if (typeof document === "undefined") return

  for (const name of ["_fbc", "_fbp"]) {
    expireCookie(name)

    if (typeof location !== "undefined") {
      const hostname = location.hostname.replace(/^www\./, "")
      if (hostname.includes(".")) expireCookie(name, `.${hostname}`)
    }
  }
}

export function writeBrowserConsent(input: Pick<ConsentPreferences, "analytics" | "marketing">) {
  if (typeof document === "undefined") return null

  const preferences: ConsentPreferences = {
    version: 1,
    analytics: input.analytics,
    marketing: input.marketing,
    updatedAt: new Date().toISOString(),
  }
  const secure = location.protocol === "https:" ? "; Secure" : ""

  document.cookie = `${CONSENT_COOKIE_NAME}=${serializeConsentCookie(preferences)}; Path=/; Max-Age=15552000; SameSite=Lax${secure}`

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq
  if (preferences.marketing) {
    fbq?.("consent", "grant")
  } else {
    fbq?.("consent", "revoke")
    clearMetaCookies()
  }

  window.dispatchEvent(
    new CustomEvent<ConsentPreferences>(CONSENT_EVENT_NAME, { detail: preferences }),
  )

  return preferences
}
