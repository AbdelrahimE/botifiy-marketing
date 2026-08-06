import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("server-only", () => ({}))

import { qualifyLeadWhatsApp } from "@/lib/lead-whatsapp-gate"

const input = {
  name: "أحمد محمد",
  whatsapp: "+966501234567",
  submissionKey: "11111111-1111-4111-8111-111111111111",
}

describe("lead WhatsApp qualification client", () => {
  beforeEach(() => {
    process.env.SUPABASE_URL = "https://example.supabase.co"
    process.env.SUPABASE_ANON_KEY = "public-anon-key"
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns sent only for a confirmed response with a message ID", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ ok: true, status: "sent", whatsappMessageId: "wamid.1" }),
        { status: 200 },
      ),
    )

    await expect(qualifyLeadWhatsApp(input)).resolves.toEqual({
      status: "sent",
      whatsappMessageId: "wamid.1",
    })
    expect(fetch).toHaveBeenCalledWith(
      "https://example.supabase.co/functions/v1/qualify-lead-whatsapp",
      expect.objectContaining({
        headers: expect.objectContaining({
          apikey: "public-anon-key",
          Authorization: "Bearer public-anon-key",
        }),
      }),
    )
  })

  it("preserves the not-registered classification", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "WHATSAPP_NOT_REGISTERED" }), {
        status: 422,
      }),
    )

    await expect(qualifyLeadWhatsApp(input)).resolves.toEqual({ status: "not_registered" })
  })

  it("fails closed for malformed success responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, status: "sent" }), { status: 200 }),
    )

    await expect(qualifyLeadWhatsApp(input)).resolves.toEqual({ status: "unavailable" })
  })
})
