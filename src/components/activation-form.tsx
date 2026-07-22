"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import PhoneInput, { type Country, type Value } from "react-phone-number-input"
import arPhoneLabels from "react-phone-number-input/locale/ar.json"
import { getCountryCallingCode, isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js"
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"
import {
  BUSINESS_TYPES,
  LEAD_NEEDS,
  leadFormSchema,
  type LeadNeed,
  type SelectedPlan,
} from "@/lib/lead-schema"

type ActivationFormProps = {
  initialCountry: Country
  selectedPlan: SelectedPlan
  source: string
}

type FormErrors = Partial<Record<"name" | "whatsapp" | "businessType" | "needs", string>>

const SUPPORT_WHATSAPP_URL =
  "https://wa.me/201098169094?text=" +
  encodeURIComponent("مرحباً، حاولت إرسال طلب تفعيل بوتيفاي وواجهتني مشكلة.")

function newSubmissionKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) =>
    (Number(char) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(char) / 4)))).toString(16),
  )
}

function normalizeLocalTrunkPrefix(value: Value | undefined, country: Country) {
  if (!value) return value
  if (isValidPhoneNumber(value)) {
    return (parsePhoneNumberFromString(value)?.number ?? value) as Value
  }

  const callingCode = getCountryCallingCode(country)
  const prefixWithTrunkZero = `+${callingCode}0`
  if (!value.startsWith(prefixWithTrunkZero)) return value

  const withoutTrunkZero = `+${callingCode}${value.slice(prefixWithTrunkZero.length)}` as Value
  return isValidPhoneNumber(withoutTrunkZero) ? withoutTrunkZero : value
}

export function ActivationForm({ initialCountry, selectedPlan, source }: ActivationFormProps) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState<Value>()
  const [phoneCountry, setPhoneCountry] = useState<Country>(initialCountry)
  const [businessType, setBusinessType] = useState("")
  const [needs, setNeeds] = useState<LeadNeed[]>([])
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const submissionKey = useMemo(newSubmissionKey, [])

  const toggleNeed = (need: LeadNeed) => {
    setErrors((current) => ({ ...current, needs: undefined }))
    setNeeds((current) => {
      if (need === "الاتنين معاً") return current.includes(need) ? [] : [need]

      const withoutCombined = current.filter((item) => item !== "الاتنين معاً")
      return withoutCombined.includes(need)
        ? withoutCombined.filter((item) => item !== need)
        : [...withoutCombined, need]
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setServerError("")
    const payload = {
      name,
      whatsapp: whatsapp ?? "",
      businessType,
      needs,
      selectedPlan,
      source,
      submissionKey,
      companyWebsite,
    }
    const validation = leadFormSchema.safeParse(payload)

    if (!validation.success) {
      const nextErrors: FormErrors = {}
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as keyof FormErrors
        if (field in nextErrors || !["name", "whatsapp", "businessType", "needs"].includes(field)) continue
        nextErrors[field] = issue.message
      }
      setErrors(nextErrors)
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus()
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message ?? "حصلت مشكلة مؤقتة. حاول مرة تانية.")
      }

      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "generate_lead", selected_plan: selectedPlan, source })
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "حصلت مشكلة مؤقتة ومقدرناش نحفظ طلبك. حاول مرة تانية.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section
        className="activation-card mx-auto max-w-[680px] px-6 py-10 text-center sm:px-12 sm:py-14"
        aria-live="polite"
      >
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary-light text-primary shadow-[0_0_0_10px_rgba(99,221,50,0.09)]">
          <CheckCircle2 className="h-10 w-10" strokeWidth={2.3} aria-hidden="true" />
        </div>
        <h1 className="mt-7 text-3xl font-bold leading-snug text-primary-dark sm:text-4xl">
          تم استلام طلبك
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-text-secondary">
          هنراجع بياناتك ونتواصل معاك على واتساب في أقرب وقت علشان نساعدك تبدأ استخدام
          بوتيفاي بالشكل المناسب لنشاطك.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-primary px-7 py-3 text-lg font-bold text-primary-dark shadow-[0_12px_30px_rgba(99,221,50,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#72ea41] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          العودة للصفحة الرئيسية
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </Link>
      </section>
    )
  }

  return (
    <section className="activation-card mx-auto max-w-[760px] overflow-hidden">
      <div className="border-b border-border-custom bg-surface-alt px-5 py-7 text-center sm:px-10 sm:py-9">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary-light px-3.5 py-1.5 text-sm font-bold text-primary-dark">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          طلب تفعيل آمن وسريع
        </div>
        <h1 className="text-3xl font-bold leading-snug text-primary-dark sm:text-4xl">
          ابدأ تفعيل بوتيفاي
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          الإجابة على الأسئلة دي هتاخد أقل من 30 ثانية، وبعدها هنتواصل معاك على واتساب
          ونساعدك تبدأ استخدام بوتيفاي بالشكل المناسب لنشاطك.
        </p>
      </div>

      <form className="space-y-5 px-5 py-7 sm:px-10 sm:py-9" onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="selected_plan" value={selectedPlan} />
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="submission_key" value={submissionKey} />
        <div className="activation-honeypot" aria-hidden="true">
          <label htmlFor="company-website">موقع الشركة</label>
          <input
            id="company-website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(event) => setCompanyWebsite(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lead-name" className="activation-label">
            الاسم <span aria-hidden="true">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            className="activation-input"
            placeholder="اكتب اسمك"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              setErrors((current) => ({ ...current, name: undefined }))
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && <p id="name-error" className="activation-error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lead-whatsapp" className="activation-label">
            رقم واتساب <span aria-hidden="true">*</span>
          </label>
          <PhoneInput
            id="lead-whatsapp"
            name="whatsapp"
            defaultCountry={initialCountry}
            labels={arPhoneLabels}
            limitMaxLength
            value={whatsapp}
            onCountryChange={(country) => country && setPhoneCountry(country)}
            onChange={(value) => {
              setWhatsapp(normalizeLocalTrunkPrefix(value, phoneCountry))
              setErrors((current) => ({ ...current, whatsapp: undefined }))
            }}
            className="activation-phone-input"
            numberInputProps={{
              autoComplete: "tel",
              inputMode: "tel",
              placeholder: "اكتب رقم الموبايل",
              "aria-invalid": Boolean(errors.whatsapp),
              "aria-describedby": errors.whatsapp ? "whatsapp-error" : undefined,
            }}
          />
          <p className="mt-1.5 text-xs leading-5 text-text-secondary/75">
            كود الدولة بيتضاف تلقائيًا، وهنستخدم الرقم للتواصل معاك على واتساب فقط.
          </p>
          {errors.whatsapp && <p id="whatsapp-error" className="activation-error">{errors.whatsapp}</p>}
        </div>

        <div>
          <label htmlFor="business-type" className="activation-label">
            نوع النشاط <span aria-hidden="true">*</span>
          </label>
          <select
            id="business-type"
            name="business_type"
            className="activation-input appearance-none bg-[linear-gradient(45deg,transparent_50%,#325327_50%),linear-gradient(135deg,#325327_50%,transparent_50%)] bg-[position:1.1rem_50%,0.8rem_50%] bg-[size:6px_6px,6px_6px] bg-no-repeat pl-10"
            value={businessType}
            onChange={(event) => {
              setBusinessType(event.target.value)
              setErrors((current) => ({ ...current, businessType: undefined }))
            }}
            aria-invalid={Boolean(errors.businessType)}
            aria-describedby={errors.businessType ? "business-type-error" : undefined}
            required
          >
            <option value="" disabled>اختار نوع نشاطك</option>
            {BUSINESS_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.businessType && <p id="business-type-error" className="activation-error">{errors.businessType}</p>}
        </div>

        <fieldset aria-invalid={Boolean(errors.needs)} aria-describedby={errors.needs ? "needs-error" : undefined}>
          <legend className="activation-label mb-2.5">
            إيه أكتر حاجة محتاج بوتيفاي يساعدك فيها؟ <span aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {LEAD_NEEDS.map((need) => {
              const isSelected = needs.includes(need)
              return (
                <label
                  key={need}
                  className={`activation-choice ${isSelected ? "activation-choice-selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    name="needs"
                    value={need}
                    checked={isSelected}
                    onChange={() => toggleNeed(need)}
                    className="sr-only"
                  />
                  <span className="activation-check" aria-hidden="true">
                    {isSelected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                  <span>{need}</span>
                </label>
              )
            })}
          </div>
          {errors.needs && <p id="needs-error" className="activation-error">{errors.needs}</p>}
        </fieldset>

        {serverError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4" role="alert">
            <p className="text-sm font-bold leading-6 text-red-800">{serverError}</p>
            <a
              href={SUPPORT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#147a2e] underline decoration-primary decoration-2 underline-offset-4"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              راسلنا على واتساب
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-primary px-6 py-3 text-xl font-bold text-primary-dark shadow-[0_14px_34px_rgba(99,221,50,0.26)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#72ea41] hover:shadow-[0_18px_42px_rgba(99,221,50,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              جاري إرسال طلبك...
            </>
          ) : (
            <>
              ابدأ تفعيل بوتيفاي
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-text-secondary/80">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />بياناتك آمنة</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />بدون إنشاء حساب</span>
          <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-4 w-4 text-success" aria-hidden="true" />هنكلمك على واتساب</span>
        </div>
      </form>
    </section>
  )
}
