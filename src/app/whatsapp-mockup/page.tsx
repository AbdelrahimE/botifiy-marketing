import type { Metadata } from "next"
import { WhatsAppPhoneMockup } from "@/components/whatsapp-phone-mockup"

export const metadata: Metadata = {
  title: "محادثة واتساب تجريبية | بوتيفاي",
  description: "تجربة محادثة متجر إلكتروني مؤتمتة عبر بوتيفاي.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function WhatsAppMockupPage() {
  return (
    <main className="whatsapp-mockup-page" dir="rtl">
      <WhatsAppPhoneMockup />
    </main>
  )
}
