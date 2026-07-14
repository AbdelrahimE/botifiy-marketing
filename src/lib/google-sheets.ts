import "server-only"

import type { LeadFormPayload } from "@/lib/lead-schema"
import type { SavedLead } from "@/lib/supabase-leads"

type GoogleSheetsLead = Pick<
  LeadFormPayload,
  "name" | "whatsapp" | "businessType" | "needs" | "selectedPlan" | "source"
> & {
  ip: string
  userAgent: string
  savedLead: SavedLead
}

export async function sendLeadToGoogleSheets(lead: GoogleSheetsLead) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL_MISSING")
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET ?? "",
      lead: {
        id: lead.savedLead.id,
        created_at: lead.savedLead.created_at,
        name: lead.name,
        whatsapp: lead.whatsapp,
        business_type: lead.businessType,
        needs: lead.needs,
        selected_plan: lead.selectedPlan,
        source: lead.source,
        ip: lead.ip,
        user_agent: lead.userAgent,
        status: lead.savedLead.status,
      },
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(6_000),
  })

  if (!response.ok) {
    throw new Error(`GOOGLE_SHEETS_HTTP_${response.status}`)
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null
  if (!result?.ok) {
    throw new Error("GOOGLE_SHEETS_REJECTED_REQUEST")
  }
}

