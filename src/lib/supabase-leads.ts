import "server-only"

import { createClient } from "@supabase/supabase-js"
import type { LeadFormPayload } from "@/lib/lead-schema"

export type SavedLead = {
  id: string
  created_at: string
  status: "new"
  duplicate: boolean
}

type ServerLeadData = LeadFormPayload & {
  ip: string
  userAgent: string
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL
  const anonKey = process.env.SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error("SUPABASE_CONFIGURATION_MISSING")
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })
}

export async function saveLead(data: ServerLeadData): Promise<SavedLead> {
  const supabase = getSupabaseClient()
  const { data: savedLead, error } = await supabase.rpc("submit_lead", {
    p_business_type: data.businessType,
    p_ip: data.ip,
    p_name: data.name,
    p_needs: data.needs,
    p_selected_plan: data.selectedPlan,
    p_source: data.source,
    p_submission_key: data.submissionKey,
    p_user_agent: data.userAgent,
    p_whatsapp: data.whatsapp,
  })

  if (error) {
    const cause = new Error(error.message)
    cause.name = error.code ?? "SUPABASE_ERROR"
    throw cause
  }

  if (!savedLead || typeof savedLead !== "object" || !("id" in savedLead)) {
    throw new Error("SUPABASE_INVALID_RESPONSE")
  }

  return savedLead as SavedLead
}

