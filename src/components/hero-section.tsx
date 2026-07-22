"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bot, CheckCircle2, Clock3, MessageCircle, PlayCircle, Rocket } from "lucide-react"

type ChatMessage = {
  sender: "customer" | "bot"
  lines: string[]
  options?: string[]
}

type IndustryDemo = {
  id: string
  title: string
  chatTitle: string
  messages: [ChatMessage, ChatMessage, ChatMessage, ChatMessage]
  followUps: [ChatMessage]
  statusBadges: {
    ai: string
    followUp: string
    footer: string
  }
}

const industryDemos: IndustryDemo[] = [
  {
    id: "ecommerce",
    title: "متاجر إلكترونية",
    chatTitle: "محادثة طلب منتج",
    messages: [
      {
        sender: "customer",
        lines: ["المنتج متوفر؟"],
      },
      {
        sender: "bot",
        lines: [
          "أهلاً 👋",
          "اختر ما يناسبك:",
        ],
        options: ["معرفة السعر", "طريقة الشحن", "الألوان", "اطلب الآن"],
      },
      {
        sender: "customer",
        lines: ["معرفة السعر"],
      },
      {
        sender: "bot",
        lines: ["السعر 15 دولارًا والتوصيل مجاني لأول 100 عميل 🎉"],
      },
    ],
    followUps: [
      {
        sender: "bot",
        lines: [
          "لسه مهتم بالمنتج؟",
          "أقدر أكمل معاك الطلب خلال دقيقة.",
        ],
      },
    ],
    statusBadges: {
      ai: "بوتيفاي بعتله الخيارات المتاحة بسرعة",
      followUp: "ولما مردش بعتله رسالة متابعة بعد شوية",
      footer: "أنت تكتب رسائل البيع، وبوتيفاي يرد ويتابع المهتمين تلقائيًا.",
    },
  },
  {
    id: "clinics",
    title: "عيادات / صالونات",
    chatTitle: "محادثة حجز موعد",
    messages: [
      {
        sender: "customer",
        lines: ["بكم جلسة الليزر؟"],
      },
      {
        sender: "bot",
        lines: [
          "أهلاً بك 🌸",
          "اختاري ما يناسبك:",
        ],
        options: ["الأسعار", "المواعيد", "تفاصيل الجلسة", "التحدث مع موظفة"],
      },
      {
        sender: "customer",
        lines: ["الأسعار"],
      },
      {
        sender: "bot",
        lines: ["تبدأ الجلسات من 10 دولارات حسب المنطقة."],
      },
    ],
    followUps: [
      {
        sender: "bot",
        lines: [
          "ما زالت توجد مواعيد متاحة هذا الأسبوع.",
          "هل ترغبين في حجز موعد؟",
        ],
      },
    ],
    statusBadges: {
      ai: "بوتيفاي أرسل الخيارات عشان يسهّل على العميل",
      followUp: "ولما مردش بعتله متابعة حجز موعد بعد شوية",
      footer: "أنت تكتب رسائل الحجز، وبوتيفاي يرد ويتابع المهتمين تلقائيًا.",
    },
  },
  {
    id: "courses",
    title: "منصة كورسات",
    chatTitle: "محادثة تسجيل كورس",
    messages: [
      {
        sender: "customer",
        lines: ["فيه دفعة جديدة؟"],
      },
      {
        sender: "bot",
        lines: [
          "أهلاً بك 👋",
          "اختر ما يناسبك:",
        ],
        options: ["الأسعار", "مواعيد الدفعة", "محتوى الكورس", "التسجيل الآن"],
      },
      {
        sender: "customer",
        lines: ["الأسعار"],
      },
      {
        sender: "bot",
        lines: ["سعر الكورس 12 دولارًا، والدفع متاح على دفعتين."],
      },
    ],
    followUps: [
      {
        sender: "bot",
        lines: [
          "لسه حابب تنضم للدفعة الحالية؟",
          "أقدر أكمل معاك التسجيل الآن.",
        ],
      },
    ],
    statusBadges: {
      ai: "بوتيفاي بعتله الخيارات المتاحة بسرعة",
      followUp: "كمان بعتله رسالة متابعة تلقائية بعد شوية",
      footer: "أنت تكتب رسائل التسجيل، وبوتيفاي يرد ويتابع المهتمين تلقائيًا.",
    },
  },
]

const conversationFlow = [
  { id: "customer-price", delay: 500 },
  { id: "bot-typing-price", delay: 900 },
  { id: "bot-price", delay: 1150 },
  { id: "ai-status", delay: 520 },
  { id: "customer-think", delay: 1300 },
  { id: "bot-typing-answer", delay: 950 },
  { id: "bot-answer", delay: 1150 },
  { id: "bot-typing-follow-up", delay: 1200 },
  { id: "bot-follow-up", delay: 1150 },
  { id: "follow-up-badge", delay: 520 },
] as const

const conversationRestartDelay = 5700

function TypingIndicator() {
  return (
    <div className="absolute inset-x-0 top-0 flex justify-end hero-chat-enter" aria-label="بوتيفاي يكتب الرد">
      <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-md border border-primary/20 bg-primary-light px-4 py-3 shadow-elevation1">
        <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="hero-chat-dot"></span>
          <span className="hero-chat-dot"></span>
          <span className="hero-chat-dot"></span>
        </span>
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === "bot"
  const hasOptions = isBot && message.options

  return (
    <div className={isBot ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isBot
            ? `${hasOptions ? "max-w-[92%] sm:max-w-[66%] px-3 py-2.5" : "max-w-[88%] sm:max-w-[66%] px-4 py-3"} rounded-2xl rounded-tl-md border border-primary/20 bg-primary-light text-sm sm:text-base font-medium text-primary-dark shadow-elevation1`
            : "max-w-[82%] sm:max-w-[62%] rounded-2xl rounded-tr-md border border-border-custom bg-white px-4 py-3 text-sm sm:text-base font-medium text-text-primary shadow-elevation1"
        }
      >
        {message.lines.map((line, index) => (
          <p key={line} className={index > 0 ? "mt-1" : undefined}>
            {line}
          </p>
        ))}
        {isBot && message.options && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {message.options.map((option) => (
              <div
                key={option}
                className="flex min-h-8 items-center justify-center rounded-lg border border-primary/30 bg-white px-2 py-1.5 text-center text-xs sm:text-sm font-bold leading-tight text-primary-dark shadow-sm"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusPill({ icon, text }: { icon: "bot" | "clock"; text: string }) {
  const Icon = icon === "bot" ? Bot : Clock3
  const borderClass = icon === "bot" ? "border-primary/20" : "border-border-custom"

  return (
    <div className={`inline-flex max-w-full items-center gap-2 rounded-full border ${borderClass} bg-white px-3 py-1.5 text-xs sm:text-sm font-medium leading-relaxed text-text-secondary`}>
      <Icon className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
      <span className="min-w-0">{text}</span>
    </div>
  )
}

export function HeroSection() {
  const [activeIndustryId, setActiveIndustryId] = useState(industryDemos[0].id)
  const [conversationStep, setConversationStep] = useState(-1)
  const activeIndustry = industryDemos.find((industry) => industry.id === activeIndustryId) ?? industryDemos[0]

  useEffect(() => {
    const isConversationComplete = conversationStep >= conversationFlow.length - 1
    const nextDelay = conversationStep < 0
      ? conversationFlow[0].delay
      : isConversationComplete
        ? conversationRestartDelay
        : conversationFlow[conversationStep + 1].delay

    const timeoutId = window.setTimeout(() => {
      setConversationStep(isConversationComplete ? -1 : conversationStep + 1)
    }, nextDelay)

    return () => window.clearTimeout(timeoutId)
  }, [conversationStep])

  const handleIndustryChange = (industryId: string) => {
    if (industryId === activeIndustryId) {
      return
    }

    setActiveIndustryId(industryId)
    setConversationStep(-1)
  }

  const showConversationStep = (stepIndex: number) => conversationStep >= stepIndex

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0FFF4] via-white to-[#F8FFF9]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 py-30">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero badge */}
          <div className="relative inline-flex max-w-[calc(100vw-3rem)] items-center justify-center gap-2 overflow-hidden rounded-full border border-[#E3B23C]/45 bg-[linear-gradient(135deg,#FFF8D8_0%,#F7D56A_36%,#D99B1E_68%,#FFECA3_100%)] px-4 py-2 mb-6 text-center text-sm font-semibold leading-relaxed text-[#4B3000]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] opacity-80" aria-hidden="true"></span>
            <span className="relative z-10">
              رد تلقائي على واتساب مصمم للسوق العربي
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-snug max-w-4xl mx-auto"
            style={{ lineHeight: '1.5' }}
          >
            <span className="block">مش قادر ترد على عميلك بسرعة ؟</span>
            <span className="block text-primary">بوتيفاي يرد تلقائيــاً ويتابع عميلك حتى وإنت نايــــم</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-6 leading-relaxed">
            بوتيفاي يوفر ردًا تلقائيًا على واتساب يفهم سؤال عميلك ويرد فورًا، ويبعتله رسائل متابعة تلقائية لحد ما يشتري — بدون كود أو خبرة، وكل ده بداية من 10 دولارات في الشهر.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center mb-10">
            <a
              href="/activate?source=hero"
              className="bg-[#63dd32] hover:bg-[#4BC625] text-primary-dark px-4 sm:px-6 py-3 text-base sm:text-xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group whitespace-nowrap"
            >
              <Rocket className="relative z-10 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="relative z-10">اطلب تفعيل بوتيفاي</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#63dd32] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-white text-[#4BC625] h-[52px] sm:h-10 px-4 sm:px-6 py-3 sm:py-6 text-base sm:text-xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group [&_svg]:size-4 sm:[&_svg]:size-5"
            >
              <a href="#demo-video">
                <PlayCircle aria-hidden="true" />
                شاهد بوتيفاي وهو يعمل
              </a>
            </Button>
          </div>

          {/* Live Automation Demo */}
          <div className="mt-0">
            <div className="flex justify-center">
              <div className="max-w-4xl w-full mx-auto overflow-hidden rounded-xl border-2 border-[#44C411]/50 bg-[#44C411]/10 text-right">
                <div className="border-b border-border-custom bg-white px-2 sm:px-4 py-3">
                  <div className="grid grid-cols-3 gap-2 rounded-md border border-primary/20 bg-primary/5 p-1">
                    {industryDemos.map((industry) => {
                      const isActive = industry.id === activeIndustry.id

                      return (
                        <button
                          key={industry.id}
                          type="button"
                          onClick={() => handleIndustryChange(industry.id)}
                          className={`rounded-md px-2 py-1.5 text-xs sm:text-sm font-bold transition-all duration-300 ${isActive
                            ? "bg-primary/20 text-primary-dark"
                            : "hover:bg-primary/10 hover:text-primary-dark"
                            } leading-tight`}
                          aria-pressed={isActive}
                        >
                          {industry.title}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-primary-dark/10 bg-white px-2 sm:px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <MessageCircle className="w-4 h-4 text-primary-dark" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-text-primary">{activeIndustry.chatTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-border-custom bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true"></span>
                    مباشر الآن
                  </div>
                </div>

                <div className="relative min-h-[470px] overflow-hidden bg-[#44C411] px-4 py-3 sm:min-h-[430px]">
                  <Image
                    src="/images/whatsapp-real-bg.webp"
                    alt=""
                    fill
                    preload
                    fetchPriority="high"
                    sizes="(max-width: 896px) calc(100vw - 52px), 896px"
                    className="object-cover object-center"
                    aria-hidden="true"
                  />
                  <div
                    key={activeIndustry.id}
                    className="hero-chat-content-swap relative z-10 space-y-1.5"
                    aria-live="polite"
                  >
                    {showConversationStep(0) && (
                      <div className="hero-chat-enter">
                        <ChatBubble message={activeIndustry.messages[0]} />
                      </div>
                    )}

                    <div className="relative">
                      {conversationStep === 1 && <TypingIndicator />}
                      {showConversationStep(2) && (
                        <div className="hero-chat-enter">
                          <ChatBubble message={activeIndustry.messages[1]} />
                        </div>
                      )}
                    </div>

                    {showConversationStep(3) && (
                      <div className="hero-chat-enter">
                        <div className="flex justify-end">
                          <StatusPill icon="bot" text={activeIndustry.statusBadges.ai} />
                        </div>
                      </div>
                    )}

                    {showConversationStep(4) && (
                      <div className="hero-chat-enter">
                        <ChatBubble message={activeIndustry.messages[2]} />
                      </div>
                    )}

                    <div className="relative">
                      {conversationStep === 5 && <TypingIndicator />}
                      {showConversationStep(6) && (
                        <div className="hero-chat-enter">
                          <ChatBubble message={activeIndustry.messages[3]} />
                        </div>
                      )}
                    </div>

                    {conversationStep === 7 && (
                      <div className="relative">
                        <TypingIndicator />
                      </div>
                    )}

                    {showConversationStep(8) && (
                      <div className="hero-chat-enter">
                        <ChatBubble message={activeIndustry.followUps[0]} />
                      </div>
                    )}

                    {showConversationStep(9) && (
                      <div className="hero-chat-enter">
                        <div className="flex justify-end">
                          <StatusPill icon="clock" text={activeIndustry.statusBadges.followUp} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border-custom bg-white px-2 py-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                    {activeIndustry.statusBadges.footer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-chat-message-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-chat-dot {
          0%, 80%, 100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          40% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }

        .hero-chat-enter {
          animation: hero-chat-message-in 460ms ease-out both;
        }

        .hero-chat-content-swap {
          animation: hero-chat-message-in 320ms ease-out both;
        }

        .hero-chat-dot {
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 9999px;
          background: #0B3404;
          animation: hero-chat-dot 1.25s ease-in-out infinite;
        }

        .hero-chat-dot:nth-child(2) {
          animation-delay: 140ms;
        }

        .hero-chat-dot:nth-child(3) {
          animation-delay: 280ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-chat-enter,
          .hero-chat-content-swap,
          .hero-chat-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
