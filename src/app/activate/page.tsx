import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { getCountries } from "libphonenumber-js"
import type { Country } from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { ActivationForm } from "@/components/activation-form"
import { planFromQuery } from "@/lib/lead-schema"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "ابدأ تفعيل بوتيفاي | طلب تفعيل سريع",
  description: "أرسل طلب تفعيل بوتيفاي وسنتواصل معك على واتساب لمساعدتك على البدء.",
  alternates: { canonical: "/activate" },
  robots: { index: false, follow: false },
}

type ActivationPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const countries = new Set(getCountries())

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function cleanSource(value?: string) {
  const cleaned = value
    ?.replace(/[^\p{L}\p{N}_.:/ -]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120)
  return cleaned || "direct"
}

export default async function ActivationPage({ searchParams }: ActivationPageProps) {
  const [params, requestHeaders] = await Promise.all([searchParams, headers()])
  const cloudflareCountry = requestHeaders.get("cf-ipcountry")?.toUpperCase() as Country | undefined
  const initialCountry = cloudflareCountry && countries.has(cloudflareCountry) ? cloudflareCountry : "EG"
  const selectedPlan = planFromQuery(firstValue(params.plan))
  const source = cleanSource(
    firstValue(params.utm_source) ??
      (firstValue(params.gclid) ? "google_ads" : undefined) ??
      firstValue(params.source),
  )

  return (
    <main className="activation-page min-h-screen px-4 pb-8 pt-4 sm:px-6 sm:pb-12 sm:pt-6">
      <div className="mx-auto mb-4 flex max-w-[760px] items-center justify-between sm:mb-5">
        <Link href="/" className="rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30" aria-label="العودة إلى بوتيفاي">
          <Image
            src="/images/botifiy-logo-ar.png"
            alt="بوتيفاي"
            width={150}
            height={50}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </Link>
        <span className="text-xs font-semibold text-text-secondary/75 sm:text-sm">الطلب يستغرق أقل من 30 ثانية</span>
      </div>

      <ActivationForm
        initialCountry={initialCountry}
        selectedPlan={selectedPlan}
        source={source}
      />

      <p className="mx-auto mt-5 max-w-[760px] text-center text-xs leading-5 text-text-secondary/70">
        بإرسال الطلب أنت توافق على استخدام بياناتك للتواصل بخصوص تفعيل بوتيفاي وقياس أداء طلبات التفعيل وفق <Link href="/privacy-policy" className="font-bold underline decoration-primary underline-offset-2">سياسة الخصوصية</Link>.
      </p>
    </main>
  )
}
