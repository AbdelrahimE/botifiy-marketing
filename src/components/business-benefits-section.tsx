"use client"

import { useEffect, useRef } from "react"
import {
  ArrowLeft,
  Bot,
  ListChecks,
  MessageCircleReply,
  MousePointerClick,
  Paperclip,
  Repeat2,
  TrendingUp,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react"

type BusinessBenefit = {
  icon: LucideIcon
  badgeIcon: LucideIcon
  title: string
  description: string
  badge: string
}

const businessBenefits: BusinessBenefit[] = [
  {
    icon: Zap,
    badgeIcon: MessageCircleReply,
    title: "العميل بقى يحس إنك جاهز ليه دايماً",
    description:
      "أول دقيقة بعد سؤال العميل بقت أهم دقيقة عندك، مش أضعف حلقة. مفيش عميل يستنى، أو يمل، أو يروح لحد تاني لمجرد إن حد مردش عليه بسرعة.",
    badge: "الردود السريعة الذكية",
  },
  {
    icon: Repeat2,
    badgeIcon: Repeat2,
    title: "مش محتاج تقلق على العميل اللي اختفى",
    description:
      "كل عميل سأل ومكملش ، بوتيفاي يرسله متابعة له في الوقت الصح من غير ما تفتكر أو تكتب بنفسك. الصفقات اللي كانت هتضيع... بقت ترجع لوحدها.",
    badge: "سيكونسات متابعة تلقائية",
  },
  {
    icon: UserCheck,
    badgeIcon: Bot,
    title: "مش محتاج تكرر نفس الردود... ركز علي البيع",
    description:
      "بوتيفاي يرد علي الأسئلة المكررة تلقائيًا ، عشان الموظفين يتفرغوا للعملاء الجادين وإغلاق صفقات أكتر",
    badge: "شات بوت ذكي",
  },
  {
    icon: MousePointerClick,
    badgeIcon: ListChecks,
    title: "العميل بياخد قراره بسرعة ، مش بيتوه في الكلام",
    description:
      "بدل ما يقرا ويسأل ويستنى، بوتيفاي يبعتله ازرار واختيارات واضحة يوصل بيها للي عايزه في ثواني.",
    badge: "أزرار وقوائم تفاعلية",
  },
  {
    icon: Paperclip,
    badgeIcon: Paperclip,
    title: "كل التفاصيل بتوصله في وقتها من غير لخبطة",
    description:
      "صورة ، فيديو ، ملف ، أو صوت… كل حاجة العميل محتاجها بتوصله في نفس المحادثة ، من غير ما حد ينسى يبعتها أو يبعتها في وقت غلط.",
    badge: "رسائل وسائط متعددة",
  },
  {
    icon: TrendingUp,
    badgeIcon: TrendingUp,
    title: "كل محادثة بقت خطوة جوه رحلة بيع ، مش مجرد رد",
    description:
      "مفيش محادثة بتقف عند ( تمام - شكراً ). كل عميل بياخد خطوة أقرب للقرار من أول رسالة لحد ما يشتري... كل ده بيحصل بشكل تلقائي مع بوتيفاي",
    badge: "رحلة بيع كاملة",
  },
]

export function BusinessBenefitsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>("[data-benefit-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("benefit-reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="business-benefits"
      dir="rtl"
      className="relative overflow-hidden bg-[#041108] py-20 text-white sm:py-24 lg:py-28"
      aria-labelledby="business-benefits-title"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="benefit-liquid-distortion" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="8" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#06160a_0%,#020a04_52%,#06140a_100%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-container px-5 sm:px-6">
        <div
          className="benefit-reveal mx-auto max-w-4xl text-center"
          data-benefit-reveal
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <MessageCircleReply className="h-4 w-4 text-primary" aria-hidden="true" />
            النتيجة بعد تشغيل بوتيفاي
          </div>
          <h2
            id="business-benefits-title"
            className="text-3xl font-bold leading-tight text-white md:text-4xl"
          >
            مش هترد ، مش هتتابع ، <span className="text-primary">بس هتبيع أكتر</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            كل حاجة في مشروعك هتكون شغالة على واتساب لوحدها من غير ما تكون واقف قدامه طول الوقت.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
          {businessBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            const BadgeIcon = benefit.badgeIcon

            return (
              <article
                key={benefit.title}
                className="benefit-reveal liquid-card group relative isolate flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[30px] px-6 py-7 text-white transition-all duration-300 hover:-translate-y-1 sm:p-8 lg:p-9"
                data-benefit-reveal
                style={{
                  transitionDelay: `${140 + index * 90}ms`,
                }}
              >
                <div className="relative z-10">
                  <div className="liquid-icon mb-6 grid h-16 w-16 place-items-center rounded-2xl text-[#63dd32]">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold leading-snug text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-base leading-8 text-white/78">
                    {benefit.description}
                  </p>
                </div>

                <div className="relative z-10 mt-4">
                  <span className="liquid-badge inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold text-[#6EF638]">
                    <BadgeIcon className="h-4 w-4" aria-hidden="true" />
                    {benefit.badge}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className="benefit-reveal mx-auto mt-16 text-center text-white"
          data-benefit-reveal
          style={{ transitionDelay: "720ms" }}
        >
          <p className="mx-auto max-w-3xl text-3xl md:text-4xl font-medium leading-snug text-white">
            واتسابك اللي بتستخدمه كل يوم… هيتحول لقناة بيع حقيقية مع بوتيفاي ، مش مجرد شات بوت عادي
          </p>
          <a
            href="/activate?source=business-benefits"
            className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-primary px-7 py-3 text-lg font-bold text-primary-dark shadow-[0_12px_30px_rgba(99,221,50,0.3),0_0_0_7px_rgba(99,221,50,0.07)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#72ea41] hover:shadow-[0_18px_42px_rgba(99,221,50,0.38),0_0_0_9px_rgba(99,221,50,0.09)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            اطلب تفعيل بوتيفاي
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <style>{`
        .benefit-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 720ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .benefit-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .liquid-card {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.045)),
            rgba(255, 255, 255, 0.07);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.58),
            inset 0 18px 34px rgba(255, 255, 255, 0.07),
            inset 0 -28px 42px rgba(0, 0, 0, 0.22),
            inset 18px 0 34px rgba(255, 255, 255, 0.035),
            0 16px 42px rgba(0, 0, 0, 0.28),
            0 0 0 1px rgba(255, 255, 255, 0.045);
          backdrop-filter: blur(18px) saturate(155%) brightness(1.06) contrast(1.04);
          -webkit-backdrop-filter: blur(18px) saturate(155%) brightness(1.06) contrast(1.04);
        }

        .liquid-card::before,
        .liquid-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }

        .liquid-card::before {
          background:
            radial-gradient(120% 95% at 18% -18%, rgba(255, 255, 255, 0.36), transparent 42%),
            radial-gradient(62% 80% at 92% 14%, rgba(255, 255, 255, 0.13), transparent 58%),
            linear-gradient(112deg, transparent 6%, rgba(255, 255, 255, 0.14) 19%, transparent 34%),
            linear-gradient(252deg, transparent 54%, rgba(255, 255, 255, 0.07) 72%, transparent 88%);
          filter: url("#benefit-liquid-distortion") blur(0.35px);
          mix-blend-mode: screen;
          opacity: 0.62;
          transform: scale(1.045);
          animation: benefit-liquid-shift 8s ease-in-out infinite alternate;
        }

        .liquid-card::after {
          inset: 1px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent 34%),
            linear-gradient(90deg, rgba(255, 255, 255, 0.09), transparent 18%, transparent 82%, rgba(255, 255, 255, 0.06)),
            linear-gradient(0deg, rgba(0, 0, 0, 0.12), transparent 42%);
          box-shadow:
            inset 1px 1px 0 rgba(255, 255, 255, 0.42),
            inset -1px -1px 0 rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
          opacity: 0.9;
        }

        .liquid-card:hover {
          border-color: rgba(255, 255, 255, 0.36);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 20px 38px rgba(255, 255, 255, 0.075),
            inset 0 -30px 44px rgba(0, 0, 0, 0.22),
            inset 18px 0 34px rgba(255, 255, 255, 0.035),
            0 22px 56px rgba(0, 0, 0, 0.32);
        }

        .liquid-card h3,
        .liquid-card p,
        .liquid-badge {
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
        }

        .liquid-icon {
          border: 1px solid rgba(110, 246, 56, 0.5);
          background:
            linear-gradient(180deg, rgba(110, 246, 56, 0.22), rgba(110, 246, 56, 0.08)),
            rgba(13, 48, 8, 0.38);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            inset 0 -10px 16px rgba(0, 0, 0, 0.12),
            0 8px 22px rgba(0, 0, 0, 0.14),
            0 0 18px rgba(110, 246, 56, 0.12);
          backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
          -webkit-backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
        }

        .liquid-badge {
          border: 1px solid rgba(110, 246, 56, 0.5);
          background:
            linear-gradient(180deg, rgba(110, 246, 56, 0.22), rgba(110, 246, 56, 0.08)),
            rgba(13, 48, 8, 0.38);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            inset 0 -10px 16px rgba(0, 0, 0, 0.12),
            0 8px 22px rgba(0, 0, 0, 0.14),
            0 0 18px rgba(110, 246, 56, 0.12);
          backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
          -webkit-backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
        }

        @keyframes benefit-liquid-shift {
          from {
            opacity: 0.72;
            transform: translate3d(-1.5%, -1%, 0) scale(1.045);
          }

          to {
            opacity: 0.9;
            transform: translate3d(1.5%, 1%, 0) scale(1.055);
          }
        }

        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .liquid-card {
            background: rgba(34, 43, 38, 0.82);
          }

          .liquid-card::before {
            opacity: 0.28;
            filter: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .benefit-reveal,
          .benefit-reveal-visible,
          .liquid-card::before {
            opacity: 1;
            transform: none;
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
