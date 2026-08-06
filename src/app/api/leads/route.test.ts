import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"
import { serializeAttributionCookie, ATTRIBUTION_COOKIE_NAME } from "@/lib/attribution"
import { CONSENT_COOKIE_NAME, serializeConsentCookie } from "@/lib/consent"

const mocks = vi.hoisted(() => ({
  saveLead: vi.fn(),
  qualifyLeadWhatsApp: vi.fn(),
  sendMetaLead: vi.fn(),
  sendLeadToGoogleSheets: vi.fn(),
}))

vi.mock("server-only", () => ({}))
vi.mock("@/lib/supabase-leads", () => ({ saveLead: mocks.saveLead }))
vi.mock("@/lib/lead-whatsapp-gate", () => ({
  qualifyLeadWhatsApp: mocks.qualifyLeadWhatsApp,
}))
vi.mock("@/lib/meta-capi", () => ({ sendMetaLead: mocks.sendMetaLead }))
vi.mock("@/lib/google-sheets", () => ({ sendLeadToGoogleSheets: mocks.sendLeadToGoogleSheets }))

import { POST } from "@/app/api/leads/route"

const validPayload = {
  name: "أحمد محمد",
  whatsapp: "+966501234567",
  businessType: "شركة خدمات",
  needs: ["الرد التلقائي على العملاء"],
  selectedPlan: "النمو",
  source: "hero",
  submissionKey: "11111111-1111-4111-8111-111111111111",
  companyWebsite: "",
}

function leadRequest(body: Record<string, unknown>, cookie?: string) {
  return new NextRequest("https://botifiy.com/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://botifiy.com",
      referer: "https://botifiy.com/activate?source=hero",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  })
}

describe("lead route tracking guarantees", () => {
  beforeEach(() => {
    vi.spyOn(console, "info").mockImplementation(() => undefined)
    vi.spyOn(console, "warn").mockImplementation(() => undefined)
    vi.spyOn(console, "error").mockImplementation(() => undefined)
    mocks.saveLead.mockResolvedValue({
      id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      created_at: "2026-08-05T10:05:00.000Z",
      status: "new",
      duplicate: false,
    })
    mocks.sendMetaLead.mockResolvedValue({ status: "sent", traceId: "trace-1" })
    mocks.sendLeadToGoogleSheets.mockResolvedValue(undefined)
    mocks.qualifyLeadWhatsApp.mockResolvedValue({
      status: "sent",
      whatsappMessageId: "wamid.test",
    })
  })

  afterEach(() => vi.restoreAllMocks())

  it("does not save or track honeypot submissions", async () => {
    const response = await POST(leadRequest({ ...validPayload, companyWebsite: "spam.example" }))

    expect(response.status).toBe(202)
    await expect(response.json()).resolves.toEqual({ ok: true, accepted: false })
    expect(mocks.saveLead).not.toHaveBeenCalled()
    expect(mocks.qualifyLeadWhatsApp).not.toHaveBeenCalled()
    expect(mocks.sendMetaLead).not.toHaveBeenCalled()
  })

  it("does not save or track a phone that is not registered on WhatsApp", async () => {
    mocks.qualifyLeadWhatsApp.mockResolvedValue({ status: "not_registered" })

    const response = await POST(leadRequest(validPayload))

    expect(response.status).toBe(422)
    await expect(response.json()).resolves.toEqual({
      ok: false,
      code: "WHATSAPP_NOT_REGISTERED",
      field: "whatsapp",
      message: "الرقم ده غير مسجل على واتساب. راجع الرقم وكود الدولة وحاول مرة تانية.",
    })
    expect(mocks.saveLead).not.toHaveBeenCalled()
    expect(mocks.sendMetaLead).not.toHaveBeenCalled()
    expect(mocks.sendLeadToGoogleSheets).not.toHaveBeenCalled()
  })

  it("fails closed without saving or tracking when WhatsApp qualification is unavailable", async () => {
    mocks.qualifyLeadWhatsApp.mockResolvedValue({ status: "unavailable" })

    const response = await POST(leadRequest(validPayload))

    expect(response.status).toBe(503)
    expect(mocks.saveLead).not.toHaveBeenCalled()
    expect(mocks.sendMetaLead).not.toHaveBeenCalled()
    expect(mocks.sendLeadToGoogleSheets).not.toHaveBeenCalled()
  })

  it("uses the saved lead ID for CAPI and keeps the paid source", async () => {
    const consent = serializeConsentCookie({
      version: 1,
      analytics: true,
      marketing: true,
      updatedAt: "2026-08-05T10:00:00.000Z",
    })
    const attribution = serializeAttributionCookie({
      version: 1,
      firstTouch: {
        landingPage: "https://botifiy.com/?utm_source=facebook",
        touchedAt: "2026-08-05T10:00:00.000Z",
        utmSource: "facebook",
      },
      lastTouch: {
        landingPage: "https://botifiy.com/activate?source=hero",
        touchedAt: "2026-08-05T10:02:00.000Z",
        utmSource: "facebook",
        internalSource: "hero",
      },
    })
    const response = await POST(
      leadRequest(
        validPayload,
        `${CONSENT_COOKIE_NAME}=${consent}; ${ATTRIBUTION_COOKIE_NAME}=${attribution}`,
      ),
    )

    expect(mocks.qualifyLeadWhatsApp).toHaveBeenCalledWith({
      name: validPayload.name,
      whatsapp: validPayload.whatsapp,
      submissionKey: validPayload.submissionKey,
    })
    expect(mocks.saveLead).toHaveBeenCalledWith(
      expect.objectContaining({ source: "facebook", marketingConsent: true }),
    )
    expect(mocks.sendMetaLead).toHaveBeenCalledWith(
      expect.objectContaining({
        eventId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        eventSourceUrl: "https://botifiy.com/activate",
        source: "facebook",
      }),
    )
    expect(mocks.qualifyLeadWhatsApp.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.saveLead.mock.invocationCallOrder[0],
    )
    await expect(response.json()).resolves.toEqual({
      ok: true,
      accepted: true,
      leadId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      source: "facebook",
    })
  })

  it("tracks the lead by default while the consent UI is disabled", async () => {
    const response = await POST(leadRequest(validPayload))

    expect(response.status).toBe(200)
    expect(mocks.saveLead).toHaveBeenCalledWith(
      expect.objectContaining({ marketingConsent: true }),
    )
    expect(mocks.sendMetaLead).toHaveBeenCalledWith(
      expect.objectContaining({ eventId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" }),
    )
  })
})
