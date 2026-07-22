"use client"

import Image from "next/image"
import type { ComponentType, SVGProps } from "react"
import { useEffect, useRef, useState } from "react"
import {
  Camera,
  ChevronLeft,
  CheckCheck,
  Coffee,
  GraduationCap,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Plus,
  ShoppingBag,
  Smile,
  Sparkles,
  Stethoscope,
  Video,
} from "lucide-react"

type IconName = "shopping" | "restaurant" | "clinic" | "spa" | "academy"

export type WhatsAppConversationEvent =
  | {
    type: "customer" | "business"
    text: string | string[]
    time: string
    read?: boolean
    options?: string[]
  }
  | {
    type: "typing"
  }
  | {
    type: "label"
    text: string
    tone?: "intent" | "danger" | "success"
  }

export type WhatsAppConversationScenario = {
  id: string
  contactName: string
  avatar: IconName
  events: WhatsAppConversationEvent[]
}

const defaultScenario: WhatsAppConversationScenario = {
  id: "store",
  contactName: "متجر الأقصي",
  avatar: "shopping",
  events: [
    { type: "customer", text: "السلام عليكم.. المكنسة دي متوفرة؟", time: "9:41" },
    { type: "label", tone: "intent", text: "بوتيفاي فهم نية العميل وبعتله الرد الجاهز" },
    { type: "typing" },
    {
      type: "business",
      text: ["أهلاً بك 👋", "اختر ما يناسبك :"],
      options: ["معرفة سعر المكنسة", "الشحن والتوصيل", "اطلب الآن"],
      time: "9:41",
      read: true,
    },
    { type: "customer", text: "معرفة سعر المكنسة", time: "9:42" },
    { type: "typing" },
    {
      type: "business",
      text: "السعر 15 دولارًا + توصيل مجاني 🎉\nاكتب الاسم والعنوان عشان أجهز لك الطلب.",
      time: "9:42",
      read: true,
    },
    { type: "label", tone: "danger", text: "العميل مردش" },
    { type: "label", tone: "intent", text: "بوتيفاي أرسل متابعة تلقائية بعد 4 ساعات" },
    { type: "typing" },
    {
      type: "business",
      text: ["لسه حابب تطلبها؟", "ابعتلي الاسم والعنوان وأجهز لك الطلب."],
      time: "1:42",
      read: true,
    },
    { type: "customer", text: "أحمد محمد، 12 شارع النصر، مدينة نصر", time: "1:43" },
    { type: "typing" },
    { type: "business", text: ["ممتاز 🎉", "تم استلام طلبك."], time: "1:43", read: true },
  ],
}

const eventDelay = (event?: WhatsAppConversationEvent) => {
  if (!event) return 650
  if (event.type === "typing") return 720
  if (event.type === "label") return 620
  if (event.type === "customer") return 1050
  return event.options ? 1200 : 1100
}

const conversationPauseBeforeRestart = 4600

const avatarIcons: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  shopping: ShoppingBag,
  restaurant: Coffee,
  clinic: Stethoscope,
  spa: Sparkles,
  academy: GraduationCap,
}

function MessageTime({ time, read = false }: { time: string; read?: boolean }) {
  return (
    <span className="wa-message-time" dir="ltr">
      {time}
      {read && <CheckCheck aria-label="تمت القراءة" />}
    </span>
  )
}

function TypingBubble() {
  return (
    <div className="wa-message-row wa-message-row-business wa-message-enter" aria-label="بوتيفاي يكتب الآن">
      <div className="wa-bubble wa-bubble-business wa-typing-bubble" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function MessageText({ text }: { text: string | string[] }) {
  const lines = Array.isArray(text) ? text : text.split("\n")

  return (
    <>
      {lines.map((line, index) => (
        index === 0 ? <p key={`${line}-${index}`}>{line}</p> : <span key={`${line}-${index}`}>{line}</span>
      ))}
    </>
  )
}

export function WhatsAppPhoneMockup({ scenario = defaultScenario }: { scenario?: WhatsAppConversationScenario }) {
  const [conversation, setConversation] = useState({ scenarioId: scenario.id, step: -1 })
  const chatContentRef = useRef<HTMLDivElement>(null)
  const AvatarIcon = avatarIcons[scenario.avatar]
  const conversationStep = conversation.scenarioId === scenario.id ? conversation.step : -1

  useEffect(() => {
    const isComplete = conversationStep >= scenario.events.length - 1
    const nextDelay = isComplete
      ? conversationPauseBeforeRestart
      : eventDelay(scenario.events[conversationStep + 1])

    const timeoutId = window.setTimeout(() => {
      setConversation({
        scenarioId: scenario.id,
        step: isComplete ? -1 : conversationStep + 1,
      })
    }, nextDelay)

    return () => window.clearTimeout(timeoutId)
  }, [conversationStep, scenario])

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      const chatContent = chatContentRef.current

      if (chatContent) {
        chatContent.scrollTo({
          top: chatContent.scrollHeight,
          behavior: conversationStep > 0 ? "smooth" : "auto",
        })
      }
    })

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [conversationStep])

  const botIsTyping = scenario.events[conversationStep]?.type === "typing"

  return (
    <div className="wa-phone-stage">
      <div className="wa-phone-shadow" aria-hidden="true" />

      <div className="wa-phone" aria-label="محادثة واتساب تجريبية داخل هاتف آيفون">
        <Image
          src="/images/whatsapp-mockup/iphone-xs-max-space-grey.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 88vw, 410px"
          className="wa-phone-frame"
          aria-hidden="true"
        />

        <div className="wa-screen">
          <div className="wa-status-bar" dir="ltr">
            <span className="wa-status-time">9:41</span>
            <div className="wa-notch" aria-hidden="true">
              <span className="wa-speaker" />
              <span className="wa-camera" />
            </div>
            <div className="wa-status-icons" aria-hidden="true">
              <span className="wa-signal"><i /><i /><i /><i /></span>
              <span className="wa-wifi">⌁</span>
              <span className="wa-battery"><i /></span>
            </div>
          </div>

          <header className="wa-chat-header">
            <div className="wa-contact-main">
              <button className="wa-icon-button wa-back" aria-label="الرجوع" type="button">
                <ChevronLeft />
              </button>
              <div className="wa-avatar" aria-hidden="true">
                <AvatarIcon />
              </div>
              <div className="wa-contact-copy">
                <strong>{scenario.contactName}</strong>
                <span>{botIsTyping ? "يكتب الآن..." : "متصل الآن"}</span>
              </div>
            </div>

            <div className="wa-header-actions">
              <button className="wa-icon-button" aria-label="مكالمة فيديو" type="button"><Video /></button>
              <button className="wa-icon-button" aria-label="مكالمة صوتية" type="button"><Phone /></button>
              <button className="wa-icon-button" aria-label="المزيد" type="button"><MoreVertical /></button>
            </div>
          </header>

          <div className="wa-chat-wallpaper">
            <Image
              src="/images/whatsapp-mockup/whatsapp-chat-bg.webp"
              alt=""
              fill
              sizes="(max-width: 640px) 80vw, 360px"
              className="wa-wallpaper-image"
              aria-hidden="true"
            />

            <div ref={chatContentRef} className="wa-chat-content" aria-live="polite" data-chat-step={conversationStep}>
              <div className="wa-encryption-note">
                <span>🔒</span>
                الرسائل والمكالمات مشفّرة تمامًا بين الطرفين
              </div>
              <div className="wa-date-pill">اليوم</div>

              {scenario.events.map((event, index) => {
                const isVisible = conversationStep >= index

                if (event.type === "typing") {
                  return conversationStep === index ? <TypingBubble key={`${scenario.id}-${index}`} /> : null
                }

                if (!isVisible) return null

                if (event.type === "label") {
                  const isDanger = event.tone === "danger"

                  return (
                    <div
                      key={`${scenario.id}-${index}`}
                      className={`wa-follow-up-label wa-message-enter ${isDanger ? "wa-no-response-label" : ""}`}
                    >
                      <span className={isDanger ? "wa-no-response-pulse" : "wa-follow-up-pulse"} aria-hidden="true" />
                      {event.text}
                    </div>
                  )
                }

                return (
                  <div
                    key={`${scenario.id}-${index}`}
                    className={`wa-message-row wa-message-enter ${event.type === "customer" ? "wa-message-row-customer" : "wa-message-row-business"}`}
                  >
                    <div
                      className={`wa-bubble ${event.type === "customer" ? "wa-bubble-customer" : "wa-bubble-business"} ${event.options ? "wa-options-bubble" : ""}`}
                    >
                      <MessageText text={event.text} />
                      {event.options && (
                        <div className="wa-quick-replies">
                          {event.options.map((reply) => (
                            <button type="button" key={reply}>{reply}</button>
                          ))}
                        </div>
                      )}
                      <MessageTime time={event.time} read={event.read} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="wa-composer" dir="rtl">
              <button type="button" className="wa-mic-button" aria-label="تسجيل رسالة صوتية"><Mic /></button>
              <div className="wa-input-shell">
                <Smile aria-hidden="true" />
                <span>رسالة</span>
                <Paperclip className="wa-paperclip" aria-hidden="true" />
                <Camera aria-hidden="true" />
              </div>
              <button type="button" className="wa-plus-button" aria-label="إرفاق"><Plus /></button>
            </div>
          </div>

          <div className="wa-home-area" aria-hidden="true"><span /></div>
        </div>
      </div>
    </div>
  )
}
