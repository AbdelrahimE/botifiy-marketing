import { describe, expect, it } from "vitest"
import {
  attributionSource,
  captureAttribution,
  parseAttributionCookie,
  serializeAttributionCookie,
} from "@/lib/attribution"

describe("campaign attribution", () => {
  const landingUrl =
    "https://botifiy.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=gulf&utm_id=cmp-1&ad_id=ad-9&fbclid=click-secret"
  const firstSeenAt = new Date("2026-08-05T10:00:00.000Z")

  it("persists campaign data but redacts Meta click IDs without marketing consent", () => {
    const attribution = captureAttribution(landingUrl, "https://facebook.com/", null, false, firstSeenAt)

    expect(attribution.firstTouch.utmSource).toBe("facebook")
    expect(attribution.firstTouch.utmCampaign).toBe("gulf")
    expect(attribution.firstTouch.fbclid).toBeUndefined()
    expect(attribution.firstTouch.landingPage).not.toContain("fbclid")
    expect(attribution.firstTouch.referrer).toBe("https://facebook.com/")
  })

  it("captures fbclid after consent and keeps the ad source across internal navigation", () => {
    const initial = captureAttribution(landingUrl, "https://facebook.com/", null, true, firstSeenAt)
    const activation = captureAttribution(
      "https://botifiy.com/activate?source=hero",
      "https://botifiy.com/",
      initial,
      true,
      new Date("2026-08-05T10:02:00.000Z"),
    )

    expect(activation.firstTouch.fbclid).toBe("click-secret")
    expect(activation.lastTouch.utmSource).toBe("facebook")
    expect(activation.lastTouch.internalSource).toBe("hero")
    expect(attributionSource(activation, "hero")).toBe("facebook")
    expect(parseAttributionCookie(serializeAttributionCookie(activation))).toEqual(activation)
  })

  it("removes a previously stored click ID when marketing consent is withdrawn", () => {
    const accepted = captureAttribution(landingUrl, "", null, true, firstSeenAt)
    const withdrawn = captureAttribution(
      "https://botifiy.com/activate",
      "",
      accepted,
      false,
      new Date("2026-08-05T10:05:00.000Z"),
    )

    expect(withdrawn.firstTouch.fbclid).toBeUndefined()
    expect(withdrawn.lastTouch.fbclid).toBeUndefined()
    expect(withdrawn.firstTouch.landingPage).not.toContain("fbclid")
  })

  it("rejects unsafe stored URLs and keeps the database source within its limit", () => {
    const unsafe = encodeURIComponent(JSON.stringify({
      version: 1,
      firstTouch: { landingPage: "javascript:alert(1)", touchedAt: firstSeenAt.toISOString() },
      lastTouch: { landingPage: "https://botifiy.com/", touchedAt: firstSeenAt.toISOString() },
    }))
    const longSource = "f".repeat(200)

    expect(parseAttributionCookie(unsafe)).toBeNull()
    expect(attributionSource({
      version: 1,
      firstTouch: { landingPage: "https://botifiy.com/", touchedAt: firstSeenAt.toISOString() },
      lastTouch: {
        landingPage: "https://botifiy.com/",
        touchedAt: firstSeenAt.toISOString(),
        utmSource: longSource,
      },
    }, "direct")).toHaveLength(120)
  })
})
