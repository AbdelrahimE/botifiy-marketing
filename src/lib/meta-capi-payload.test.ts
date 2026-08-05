import { describe, expect, it } from "vitest"
import { buildMetaLeadPayload } from "@/lib/meta-capi-payload"

describe("Meta Lead payload", () => {
  it("uses the immutable lead ID for deduplication and never exposes raw matching data", () => {
    const payload = buildMetaLeadPayload({
      eventId: "11111111-1111-4111-8111-111111111111",
      eventTime: 1_786_000_000,
      eventSourceUrl: "https://botifiy.com/activate?source=hero",
      name: "أحمد محمد",
      whatsapp: "+966501234567",
      selectedPlan: "النمو",
      source: "facebook",
      ip: "203.0.113.10",
      userAgent: "Test Browser",
      attribution: {
        version: 1,
        firstTouch: {
          landingPage: "https://botifiy.com/?utm_source=facebook&fbclid=click-123",
          touchedAt: "2026-08-05T10:00:00.000Z",
          utmSource: "facebook",
          fbclid: "click-123",
        },
        lastTouch: {
          landingPage: "https://botifiy.com/activate?source=hero",
          touchedAt: "2026-08-05T10:02:00.000Z",
          utmSource: "facebook",
          internalSource: "hero",
        },
      },
    })

    expect(payload.event_name).toBe("Lead")
    expect(payload.event_id).toBe("11111111-1111-4111-8111-111111111111")
    expect(payload.user_data.ph[0]).toMatch(/^[a-f0-9]{64}$/)
    expect(payload.user_data.fn?.[0]).toMatch(/^[a-f0-9]{64}$/)
    expect(payload.user_data.ctry?.[0]).toMatch(/^[a-f0-9]{64}$/)
    expect(payload.user_data.ph[0]).not.toContain("966501234567")
    expect(payload.user_data.fbc).toBe("fb.1.1785924000000.click-123")
    expect(JSON.stringify(payload)).not.toContain("أحمد")
  })
})
