import type { Metadata } from "next"
import {
  WhatsAppPhoneMockup,
  type WhatsAppConversationScenario,
} from "@/components/whatsapp-phone-mockup"

export const metadata: Metadata = {
  title: "محادثة واتساب تجريبية | بوتيفاي",
  description: "رسائل عميل متتابعة في محادثة واتساب تجريبية.",
  robots: {
    index: false,
    follow: false,
  },
}

const followUpScenario: WhatsAppConversationScenario = {
  id: "customer-follow-up",
  contactName: "البرنس ستور",
  avatar: "shopping",
  eventIntervalMs: 1000,
  events: [
    { type: "customer", text: "السلام عليكم", time: "9:41" },
    { type: "typing", actor: "customer" },
    { type: "customer", text: "بكام المنتج ده لو سمحت والتوصيل بكام", time: "9:41" },
    {
      type: "business",
      text: ["اهلا بحضرتك", "السعر 499 جنيه شامل التوصيل لحد باب بيتك"],
      options: ["اطلب الان", "مزيد من التفاصيل", "تواصل مع الدعم"],
      time: "9:41",
      read: true,
      delayMs: 2000,
    },
    { type: "customer", text: "اطلب الان", time: "9:41", delayMs: 2000 },
  ],
}

export default function WhatsAppFollowUpMockupPage() {
  return (
    <main className="whatsapp-mockup-page whatsapp-mockup-page-transparent" dir="rtl">
      <WhatsAppPhoneMockup scenario={followUpScenario} />
    </main>
  )
}
