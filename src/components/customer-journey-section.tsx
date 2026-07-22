"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowLeft, PlayCircle, Sparkles } from "lucide-react"

const journeySteps = [
  {
    number: "01",
    title: "العميل يبدأ بأي رسالة عادية",
    description:
      "كل حاجة بتبدأ من سؤال بسيط على واتساب: السعر، التوفر، الحجز، أو تفاصيل الخدمة. من هنا رحلة العميل جوه بوتيفاي تبدأ فعليًا.",
    image: "/images/step1.webp",
  },
  {
    number: "02",
    title: "بوتيفاي يفهم قصد العميل مش مجرد كلمة",
    description:
      "مش شرط العميل يكتب الكلمة المضبوطة عشان يتفهم. بوتيفاي بيفهم نية العميل حتى لو غيّر صياغة السؤال أو كتبه بطريقته الخاصة.",
    image: "/images/step2.webp",
  },
  {
    number: "03",
    title: "يرسله اختيارات جاهزة بدل الكلام الكتير",
    description:
      "بدل ما يقرأ رسايل طويلة، العميل بيشوف أزرار واضحة أو قائمة تساعده يوصل للي يدور عليه بسرعة وبضغطة واحدة.",
    image: "/images/step3.webp",
  },
  {
    number: "04",
    title: "يرسله كل التفاصيل اللي محتاجها",
    description:
      "صور، أسعار، كتالوجات، ملفات PDF، أو حتى رسايل صوتية… كل التفاصيل اللي العميل محتاجها قبل ما ياخد قراره، بتوصله في نفس المحادثة.",
    image: "/images/step4.webp",
  },
  {
    number: "05",
    title: "لو العميل ساب المحادثة، بوتيفاي يتابعه لوحده",
    description:
      "لو العميل سأل ومكملش، بوتيفاي يقدر يبعتله متابعة تلقائية بعد وقت محدد إنت اللي بتحدده، من غير ما حد من فريقك يتدخل يدوي.",
    image: "/images/step5.webp",
  },
  {
    number: "06",
    title: "يتأكد من البيانات ويجهّز العميل لفريقك",
    description:
      "لما العميل يبعت البيانات اللي محتاجها، بوتيفاي يكتشفها ويرد عليه فورًا برسالة تأكيد، وفي نفس الوقت يوسمه بعلامة (Tag) توضح لفريقك إن العميل ده جاهز يتقفل، فيبقى سهل عليكم تلاقوه وتكملوا معاه بسرعة.",
    image: "/images/step6.webp",
  },
]

export function CustomerJourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>("[data-journey-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("journey-reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: "0px 0px -7% 0px" }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="customer-journey"
      dir="rtl"
      className="relative scroll-mt-20 overflow-hidden bg-[#041108] py-20 text-white sm:scroll-mt-24 sm:py-24 lg:py-28"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="journey-liquid-distortion" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="12" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(99,221,50,0.10),transparent_30%),radial-gradient(circle_at_12%_52%,rgba(99,221,50,0.07),transparent_28%),linear-gradient(180deg,#06160a_0%,#020a04_52%,#06140a_100%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-container px-5 sm:px-6">
        <div className="journey-reveal mx-auto max-w-4xl text-center" data-journey-reveal>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            رحلة واحدة… تتكرر بذكاء مع كل عميل
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white">
            من أول رسالة، لحد ما العميل{" "}
            <span className="text-primary">
              يشتري أو يحجز
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">
            تبني رحلة العميل مرة واحدة بس، وبوتيفاي يمشيها تلقائيًا مع كل عميل جديد: يفهم قصده، يرد عليه، يديله اختيارات، يبعتله كل التفاصيل، ويتابعه في التوقيت الصح.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl lg:mt-24">
          <div className="absolute bottom-20 left-1/2 top-20 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/35 to-transparent lg:block" aria-hidden="true" />

          <div className="space-y-14 sm:space-y-18 lg:space-y-24">
            {journeySteps.map((step, index) => {
              const imageOnRight = index % 2 === 0

              return (
                <article
                  key={step.number}
                  data-journey-reveal
                  className={`journey-reveal journey-step relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:gap-8 ${imageOnRight ? "journey-from-right" : "journey-from-left"
                    }`}
                >
                  <div
                    className={`group relative mx-auto w-full max-w-[500px] lg:row-start-1 ${imageOnRight ? "lg:col-start-1 lg:mr-0 lg:ml-auto" : "lg:col-start-3 lg:ml-0 lg:mr-auto"
                      }`}
                  >
                    <div className="relative">
                      <Image
                        src={step.image}
                        alt={`الخطوة ${index + 1}: ${step.title}`}
                        width={1080}
                        height={1350}
                        sizes="(max-width: 1023px) 90vw, 500px"
                        className="h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      />
                    </div>
                  </div>

                  <div className="journey-step-number absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-[#6EF638] sm:right-6 sm:top-6 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:h-16 lg:w-16 lg:text-lg">
                    {step.number}
                  </div>

                  <div
                    className={`relative text-right lg:row-start-1 ${imageOnRight ? "lg:col-start-3" : "lg:col-start-1"
                      }`}
                  >
                    <span className="mb-3 block text-sm font-bold tracking-[0.12em] text-[#6EF638]/90">
                      الخطوة {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-8 text-white/70 sm:text-lg lg:max-w-md">
                      {step.description}
                    </p>
                    <div className="mt-6 h-px w-24 bg-gradient-to-l from-primary/70 to-transparent" aria-hidden="true" />
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div
          data-journey-reveal
          className="journey-reveal journey-liquid-card relative isolate mx-auto mt-20 max-w-5xl overflow-hidden rounded-[28px] px-6 py-9 text-center sm:px-10 sm:py-11 lg:mt-28"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              ابني الرحلة مرة واحدة… وسيب بوتيفاي يكررها مع كل عميل جديد
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              بدل الرد اليدوي والمتابعة العشوائية، خلّي كل محادثة واتساب تمشي في مسار واضح يناسب طبيعة نشاطك وما يضيعش أي فرصة بيع محتملة.
            </p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href="/activate?source=customer-journey"
                className="journey-liquid-cta inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg font-bold text-[#6EF638] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                اطلب تفعيل بوتيفاي
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#demo-video"
                className="journey-liquid-cta inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg font-bold text-[#6EF638] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <PlayCircle className="h-5 w-5" aria-hidden="true" />
                شاهد الديمو مرة أخرى
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .journey-reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 720ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .journey-step.journey-from-right {
          transform: translate3d(24px, 26px, 0);
        }

        .journey-step.journey-from-left {
          transform: translate3d(-24px, 26px, 0);
        }

        .journey-reveal-visible,
        .journey-step.journey-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .journey-liquid-card {
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

        .journey-liquid-card::before,
        .journey-liquid-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }

        .journey-liquid-card::before {
          background:
            radial-gradient(120% 95% at 18% -18%, rgba(255, 255, 255, 0.36), transparent 42%),
            radial-gradient(62% 80% at 92% 14%, rgba(255, 255, 255, 0.13), transparent 58%),
            linear-gradient(112deg, transparent 6%, rgba(255, 255, 255, 0.14) 19%, transparent 34%),
            linear-gradient(252deg, transparent 54%, rgba(255, 255, 255, 0.07) 72%, transparent 88%);
          filter: url("#journey-liquid-distortion") blur(0.35px);
          mix-blend-mode: screen;
          opacity: 0.62;
          transform: scale(1.045);
          animation: journey-liquid-shift 8s ease-in-out infinite alternate;
        }

        .journey-liquid-card::after {
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

        .journey-liquid-card h3,
        .journey-liquid-card p,
        .journey-liquid-cta {
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
        }

        .journey-step-number,
        .journey-liquid-cta {
          border: 2px solid rgba(110, 246, 56, 0.5);
          background:
            linear-gradient(180deg, rgba(110, 246, 56, 0.22), rgba(110, 246, 56, 0.08)),
            rgba(13, 48, 8, 0.38);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            inset 0 -10px 16px rgba(0, 0, 0, 0.12),
            0 8px 22px rgba(0, 0, 0, 0.14),
            0 0 18px rgba(110, 246, 56, 0.12);
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
          backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
          -webkit-backdrop-filter: blur(12px) saturate(170%) brightness(1.08);
        }

        .journey-liquid-cta:hover {
          border-color: rgba(110, 246, 56, 0.64);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.38),
            inset 0 -10px 16px rgba(0, 0, 0, 0.12),
            0 10px 26px rgba(0, 0, 0, 0.18),
            0 0 24px rgba(110, 246, 56, 0.18);
        }

        @keyframes journey-liquid-shift {
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
          .journey-liquid-card {
            background: rgba(34, 43, 38, 0.82);
          }

          .journey-liquid-card::before {
            opacity: 0.28;
            filter: none;
          }
        }

        @media (max-width: 1023px) {
          .journey-step.journey-from-right,
          .journey-step.journey-from-left {
            transform: translateY(22px);
          }

          .journey-step.journey-reveal-visible {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-reveal,
          .journey-step.journey-from-right,
          .journey-step.journey-from-left,
          .journey-liquid-card::before {
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
