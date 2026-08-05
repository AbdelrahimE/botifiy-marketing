"use client"

import { useState } from "react"
import Link from "next/link"
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react"
import { CONSENT_UI_ENABLED, writeBrowserConsent } from "@/lib/consent"
import { useConsent } from "@/lib/use-consent"

export function PrivacyControls() {
  if (!CONSENT_UI_ENABLED) return null

  return <PrivacyControlsPanel />
}

function PrivacyControlsPanel() {
  const { consent, isReady } = useConsent()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const isOpen = !consent || settingsOpen

  const save = (nextAnalytics: boolean, nextMarketing: boolean) => {
    writeBrowserConsent({ analytics: nextAnalytics, marketing: nextMarketing })
    setSettingsOpen(false)
    setShowDetails(false)
  }

  if (!isReady) return null

  return (
    <>
      {consent && !isOpen && (
        <button
          type="button"
          onClick={() => {
            setAnalytics(consent.analytics)
            setMarketing(consent.marketing)
            setSettingsOpen(true)
          }}
          className="fixed bottom-4 left-4 z-[90] inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cfe4c9] bg-white px-4 py-2 text-sm font-bold text-[#153d0d] shadow-[0_10px_30px_rgba(20,61,13,0.16)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#63dd32]/35"
          aria-label="فتح إعدادات الخصوصية"
        >
          <Settings2 className="h-4 w-4" aria-hidden="true" />
          إعدادات الخصوصية
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#092104]/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-consent-title"
            className="w-full max-w-2xl rounded-[28px] border border-[#d9ead5] bg-white p-5 text-right shadow-[0_24px_80px_rgba(8,38,4,0.28)] sm:p-7"
          >
            {consent && (
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="float-left rounded-full p-2 text-[#42623b] hover:bg-[#eef8eb] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#63dd32]/30"
                aria-label="إغلاق إعدادات الخصوصية"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}

            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eafbe4] text-[#287114]">
                <Cookie className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 id="privacy-consent-title" className="text-xl font-bold text-[#123c09] sm:text-2xl">
                  اختيارات الخصوصية
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#50654b]">
                  نستخدم ملفات ضرورية لتشغيل الموقع، ولن نشغّل التحليلات أو إعلانات Meta إلا بموافقتك.
                </p>
              </div>
            </div>

            {showDetails && (
              <div className="my-5 space-y-3">
                <ConsentRow
                  title="ملفات ضرورية"
                  description="مطلوبة لحفظ اختياراتك، حماية النموذج وتشغيل الموقع. لا يمكن إيقافها."
                  checked
                  disabled
                  onChange={() => undefined}
                />
                <ConsentRow
                  title="التحليلات"
                  description="تسمح لنا باستخدام Google Analytics لفهم استخدام الموقع وتحسينه."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="الإعلانات وMeta"
                  description="تسمح بتشغيل Meta Pixel وإرسال أحداث القياس المتوافقة إلى Meta."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            <p className="text-xs leading-5 text-[#62725e]">
              يمكنك تغيير اختيارك في أي وقت. اقرأ التفاصيل في{" "}
              <Link href="/privacy-policy" className="font-bold text-[#246f13] underline underline-offset-2">
                سياسة الخصوصية
              </Link>.
            </p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => save(true, true)}
                className="min-h-12 rounded-2xl border-2 border-[#4BC625] bg-[#63dd32] px-4 py-2 font-bold text-[#103806] transition hover:bg-[#72ea41] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#63dd32]/30"
              >
                قبول الكل
              </button>
              <button
                type="button"
                onClick={() => save(false, false)}
                className="min-h-12 rounded-2xl border-2 border-[#b9cfb4] bg-white px-4 py-2 font-bold text-[#1f4b16] transition hover:bg-[#f3f9f1] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#63dd32]/25"
              >
                رفض غير الضروري
              </button>
              <button
                type="button"
                onClick={() => (showDetails ? save(analytics, marketing) : setShowDetails(true))}
                className="min-h-12 rounded-2xl border-2 border-[#d4e5d0] bg-[#f5faf3] px-4 py-2 font-bold text-[#2d5524] transition hover:bg-[#edf7ea] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#63dd32]/25"
              >
                {showDetails ? "حفظ اختياراتي" : "تخصيص"}
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#657760]">
              <ShieldCheck className="h-4 w-4 text-[#32831d]" aria-hidden="true" />
              رفض التتبع لا يمنعك من إرسال طلب التفعيل.
            </div>
          </section>
        </div>
      )}
    </>
  )
}

type ConsentRowProps = {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

function ConsentRow({ title, description, checked, disabled = false, onChange }: ConsentRowProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-[#dcebd8] bg-[#fbfdfb] p-4">
      <span>
        <span className="block font-bold text-[#163d0e]">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-[#60705c]">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-[#4BC625]"
      />
    </label>
  )
}
