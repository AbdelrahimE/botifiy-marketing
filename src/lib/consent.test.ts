import { describe, expect, it } from "vitest"
import {
  allowsAnalyticsMeasurement,
  allowsMarketingMeasurement,
  CONSENT_UI_ENABLED,
  parseConsentCookie,
  serializeConsentCookie,
  type ConsentPreferences,
} from "@/lib/consent"

describe("consent cookie", () => {
  it("keeps measurement enabled while the consent UI is intentionally disabled", () => {
    expect(CONSENT_UI_ENABLED).toBe(false)
    expect(allowsAnalyticsMeasurement(null)).toBe(true)
    expect(allowsMarketingMeasurement(null)).toBe(true)
  })

  it("round-trips an explicit consent choice", () => {
    const consent: ConsentPreferences = {
      version: 1,
      analytics: true,
      marketing: false,
      updatedAt: "2026-08-05T12:00:00.000Z",
    }

    expect(parseConsentCookie(serializeConsentCookie(consent))).toEqual(consent)
  })

  it("rejects malformed or outdated values", () => {
    expect(parseConsentCookie("not-json")).toBeNull()
    expect(
      parseConsentCookie(
        encodeURIComponent(JSON.stringify({ v: 2, a: true, m: true, t: "2026-08-05" })),
      ),
    ).toBeNull()
  })
})
