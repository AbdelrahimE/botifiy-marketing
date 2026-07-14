import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js"
import { z } from "zod"

export const BUSINESS_TYPES = [
  "متجر إلكتروني",
  "عيادة",
  "مطعم / كافيه",
  "صالون تجميل / Spa",
  "أكاديمية / كورسات",
  "شركة خدمات",
  "أخرى",
] as const

export const LEAD_NEEDS = [
  "الرد التلقائي على العملاء",
  "متابعة العملاء تلقائياً",
  "الاتنين معاً",
] as const

export const SELECTED_PLANS = ["الإطلاق", "النمو", "الهيمنة", "General"] as const

export type BusinessType = (typeof BUSINESS_TYPES)[number]
export type LeadNeed = (typeof LEAD_NEEDS)[number]
export type SelectedPlan = (typeof SELECTED_PLANS)[number]

const cleanText = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

export const leadFormSchema = z.object({
  name: z
    .string()
    .transform(cleanText)
    .pipe(
      z
        .string()
        .min(2, "اكتب اسمك علشان نعرف نتواصل معاك")
        .max(80, "الاسم طويل جداً")
        .regex(/[\p{L}]/u, "اكتب اسم صحيح"),
    ),
  whatsapp: z
    .string()
    .trim()
    .refine((value) => isValidPhoneNumber(value), "اكتب رقم واتساب صحيح مع كود الدولة")
    .transform((value) => parsePhoneNumberFromString(value)?.number ?? value),
  businessType: z.enum(BUSINESS_TYPES, {
    message: "اختار نوع نشاطك",
  }),
  needs: z
    .array(z.enum(LEAD_NEEDS))
    .min(1, "اختار أكتر حاجة محتاج بوتيفاي يساعدك فيها")
    .max(2, "اختار احتياج واحد أو الاتنين معاً"),
  selectedPlan: z.enum(SELECTED_PLANS).default("General"),
  source: z
    .string()
    .transform(cleanText)
    .pipe(z.string().min(1).max(120))
    .default("direct"),
  submissionKey: z.string().uuid(),
  companyWebsite: z.string().max(200).optional().default(""),
})

export type LeadFormPayload = z.infer<typeof leadFormSchema>

export const planFromQuery = (plan?: string): SelectedPlan => {
  const normalizedPlan = plan?.toLowerCase().trim()

  if (normalizedPlan === "launch" || normalizedPlan === "الإطلاق") return "الإطلاق"
  if (normalizedPlan === "growth" || normalizedPlan === "النمو") return "النمو"
  if (normalizedPlan === "dominate" || normalizedPlan === "الهيمنة") return "الهيمنة"

  return "General"
}
