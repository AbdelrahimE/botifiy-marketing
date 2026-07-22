"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  CheckCircle2,
  Coffee,
  GraduationCap,
  Scissors,
  ShoppingBag,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"
import {
  type WhatsAppConversationScenario,
  WhatsAppPhoneMockup,
} from "@/components/whatsapp-phone-mockup"

const useCases = [
  {
    id: "store",
    tab: "متجر إلكتروني",
    title: "حوّل أسئلة السعر والتوفر إلى طلبات جاهزة",
    description:
      "العميل يسأل عن منتج، وبوتيفاي يرد فورًا بالاختيارات المناسبة: السعر، الشحن، تفاصيل المنتج، أو إتمام الطلب. ولو العميل خرج، يتم متابعته تلقائيًا.",
    bullets: [
      "رد فوري على أسئلة السعر والتوفر.",
      "أزرار للطلب والشحن والتفاصيل.",
      "متابعة تلقائية للعملاء المهتمين.",
    ],
    cta: "اطلب نفس السيناريو لمتجري",
    icon: ShoppingBag,
    scenario: {
      id: "store",
      contactName: "متجر الأقصي",
      avatar: "shopping",
      events: [
        { type: "customer", text: "السلام عليكم.. المكنسة دي متوفرة؟", time: "9:41" },
        { type: "label", tone: "intent", text: "بوتيفاي فهم نية العميل وبعتله الرد الجاهز" },
        { type: "typing" },
        {
          type: "business",
          text: ["أهلاً بك 👋", "اختر ما يناسبك:"],
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
        { type: "customer", text: "أحمد محمد 12 شارع النصر مدينة نصر", time: "1:43" },
        { type: "typing" },
        { type: "business", text: ["ممتاز 🎉", "تم استلام طلبك."], time: "1:43", read: true },
      ],
    },
  },
  {
    id: "restaurant",
    tab: "مطعم / كافيه",
    title: "خلّي العميل يطلب منيو أو يحجز ترابيزة بدون انتظار",
    description:
      "بدل ما يطلب العميل المنيو وينتظر الرد، بوتيفاي يرسل له الخيارات فورًا: المنيو، العروض، الفروع، أو الحجز.",
    bullets: [
      "إرسال المنيو فورًا.",
      "قوائم للأقسام والعروض.",
      "متابعة أو تأكيد الحجز تلقائيًا.",
    ],
    cta: "اطلب نفس السيناريو لمطعمي",
    icon: Coffee,
    scenario: {
      id: "restaurant",
      contactName: "مطعم وكافيه",
      avatar: "restaurant",
      events: [
        { type: "customer", text: "السلام عليكم.. ممكن المنيو؟", time: "6:18" },
        { type: "label", tone: "intent", text: "بوتيفاي فهم إن العميل يريد المنيو أو الحجز" },
        { type: "typing" },
        {
          type: "business",
          text: ["أهلاً بك 👋", "اختر ما يناسبك:"],
          options: ["عرض المنيو", "عروض اليوم", "حجز ترابيزة"],
          time: "6:18",
          read: true,
        },
        { type: "customer", text: "عرض المنيو", time: "6:19" },
        { type: "typing" },
        {
          type: "business",
          text: "أكيد، اختر القسم:",
          options: ["وجبات رئيسية", "مشروبات", "حلويات", "عروض اليوم"],
          time: "6:19",
          read: true,
        },
        { type: "customer", text: "عروض اليوم", time: "6:20" },
        { type: "typing" },
        {
          type: "business",
          text: "عرض اليوم: وجبة برجر + بطاطس + مشروب بسعر خاص 🍔",
          time: "6:20",
          read: true,
        },
        { type: "label", tone: "intent", text: "بوتيفاي أرسل متابعة تلقائية بعد ساعتين" },
        { type: "typing" },
        {
          type: "business",
          text: ["لسه حابب تطلب؟", "أقدر أرسل لك أقرب فرع أو أساعدك في الطلب الآن."],
          time: "8:20",
          read: true,
        },
      ],
    },
  },
  {
    id: "clinic",
    tab: "عيادة",
    title: "نظّم أسئلة الأسعار والمواعيد قبل ما توصل للاستقبال",
    description:
      "المرضى يسألون عن السعر، المواعيد، الموقع، أو تفاصيل الخدمة. بوتيفاي يرد عليهم، يوضح الخيارات، ويحول الحالات الجادة للفريق.",
    bullets: [
      "رد فوري على الأسعار والمواعيد.",
      "خيارات للحجز أو التحدث مع موظف.",
      "تقليل الضغط على الاستقبال.",
    ],
    cta: "اطلب نفس السيناريو لعيادتي",
    icon: Stethoscope,
    scenario: {
      id: "clinic",
      contactName: "عيادة النور",
      avatar: "clinic",
      events: [
        { type: "customer", text: "السلام عليكم.. بكم جلسة تنظيف البشرة؟", time: "11:08" },
        { type: "label", tone: "intent", text: "بوتيفاي صنّف الاستفسار كسعر أو حجز موعد" },
        { type: "typing" },
        {
          type: "business",
          text: ["أهلاً بك 🌸", "اختاري ما يناسبك:"],
          options: ["معرفة الأسعار", "المواعيد المتاحة", "التحدث مع موظفة"],
          time: "11:08",
          read: true,
        },
        { type: "customer", text: "المواعيد المتاحة", time: "11:09" },
        { type: "typing" },
        {
          type: "business",
          text: "متاح اليوم الساعة 6 مساءً أو غداً الساعة 4 مساءً.\nتحبي أحجز لك موعد؟",
          time: "11:09",
          read: true,
        },
        { type: "customer", text: "غداً الساعة 4", time: "11:10" },
        { type: "typing" },
        {
          type: "business",
          text: "تمام 🌸\nاكتبي الاسم ورقم التواصل لتأكيد الحجز.",
          time: "11:10",
          read: true,
        },
        { type: "label", tone: "intent", text: "بوتيفاي أرسل متابعة تلقائية بعد 3 ساعات" },
        { type: "typing" },
        {
          type: "business",
          text: ["لسه حابة نأكد موعدك؟", "اكتبي الاسم ورقم التواصل ونجهز الحجز."],
          time: "2:10",
          read: true,
        },
      ],
    },
  },
  {
    id: "spa",
    tab: "صالون تجميل / Spa",
    title: "حوّل استفسارات الخدمات إلى حجوزات منظمة",
    description:
      "سواء العميلة تسأل عن الشعر، البشرة، المساج، أو الباقات، بوتيفاي يساعدها تختار الخدمة المناسبة ويتابعها لو لم تكمل الحجز.",
    bullets: [
      "عرض الخدمات والباقات بسهولة.",
      "خيارات للحجز أو معرفة الأسعار.",
      "متابعة تلقائية للمهتمات.",
    ],
    cta: "اطلب نفس السيناريو للصالون",
    icon: Scissors,
    scenario: {
      id: "spa",
      contactName: "صالون لوتس",
      avatar: "spa",
      events: [
        { type: "customer", text: "عندكم عروض سبا اليوم؟", time: "4:02" },
        { type: "label", tone: "intent", text: "بوتيفاي فهم إن العميلة تبحث عن عروض أو حجز" },
        { type: "typing" },
        {
          type: "business",
          text: ["أهلاً بك 🌸", "اختاري ما يناسبك:"],
          options: ["عروض وأسعار الجلسات", "حجز موعد", "التحدث مع موظفة"],
          time: "4:02",
          read: true,
        },
        { type: "customer", text: "عروض وأسعار الجلسات", time: "4:03" },
        { type: "typing" },
        {
          type: "business",
          text: "عرض اليوم: جلسة مساج + عناية بالبشرة بسعر خاص ✨\nتحبي أحجز لك موعد؟",
          time: "4:03",
          read: true,
        },
        { type: "customer", text: "أفكر شوية", time: "4:04" },
        { type: "label", tone: "intent", text: "بوتيفاي أرسل متابعة تلقائية بعد 4 ساعات" },
        { type: "typing" },
        {
          type: "business",
          text: ["لسه العرض متاح اليوم 🌸", "تحبي نثبت لك موعد قبل انتهاء اليوم؟"],
          time: "8:04",
          read: true,
        },
      ],
    },
  },
  {
    id: "academy",
    tab: "كورسات / أكاديمية",
    title: "حوّل أسئلة الدفعات والأسعار إلى تسجيلات أوضح",
    description:
      "الطالب يسأل عن السعر أو محتوى الكورس أو موعد الدفعة. بوتيفاي يرسل الخيارات المناسبة، يوضح التفاصيل، ويتابع المهتمين تلقائيًا.",
    bullets: [
      "عرض الأسعار ومواعيد الدفعات.",
      "إرسال محتوى الكورس أو رابط التسجيل.",
      "متابعة تلقائية للطلاب المهتمين.",
    ],
    cta: "اطلب نفس السيناريو لأكاديميتي",
    icon: GraduationCap,
    scenario: {
      id: "academy",
      contactName: "أكاديمية برو",
      avatar: "academy",
      events: [
        { type: "customer", text: "فيه دفعة جديدة؟", time: "7:31" },
        { type: "label", tone: "intent", text: "بوتيفاي فهم إن الطالب يسأل عن دفعة أو تسجيل" },
        { type: "typing" },
        {
          type: "business",
          text: ["أهلاً بك 👋", "اختر ما يناسبك:"],
          options: ["الأسعار", "محتوى الكورس", "التسجيل الآن"],
          time: "7:31",
          read: true,
        },
        { type: "customer", text: "الأسعار", time: "7:32" },
        { type: "typing" },
        {
          type: "business",
          text: "سعر الكورس 12 دولارًا، والدفع متاح على دفعتين.\nتحب أرسل لك تفاصيل التسجيل؟",
          time: "7:32",
          read: true,
        },
        { type: "customer", text: "تمام", time: "7:33" },
        { type: "typing" },
        {
          type: "business",
          text: "ممتاز، أرسل لك خطوات التسجيل الآن.",
          time: "7:33",
          read: true,
        },
        { type: "label", tone: "intent", text: "بوتيفاي أرسل متابعة تلقائية بعد 3 ساعات" },
        { type: "typing" },
        {
          type: "business",
          text: ["لسه حابب تنضم للدفعة الحالية؟", "أقدر أكمل معاك التسجيل الآن."],
          time: "10:33",
          read: true,
        },
      ],
    },
  },
] satisfies Array<{
  id: string
  tab: string
  title: string
  description: string
  bullets: string[]
  cta: string
  icon: LucideIcon
  scenario: WhatsAppConversationScenario
}>

export function UseCasesSection() {
  const [activeUseCaseId, setActiveUseCaseId] = useState(useCases[0].id)
  const sectionRef = useRef<HTMLElement | null>(null)
  const activeUseCase = useCases.find((useCase) => useCase.id === activeUseCaseId) ?? useCases[0]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll<HTMLElement>("[data-use-case-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("use-case-reveal-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -5% 0px" }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      dir="rtl"
      className="relative scroll-mt-20 overflow-x-clip bg-[#fbfdf8] py-18 text-primary-dark sm:scroll-mt-24 sm:py-22 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#dcebd5] to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(11,52,4,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,52,4,.04)_1px,transparent_1px)] [background-size:84px_84px]" />

      <div className="relative z-10 mx-auto max-w-container px-5 sm:px-6">
        <div
          className="use-case-reveal use-case-from-up mx-auto max-w-4xl text-center"
          data-use-case-reveal
        >
          <div className="relative mb-5 inline-flex max-w-[calc(100vw-3rem)] items-center justify-center gap-2 overflow-hidden rounded-full border border-[#E3B23C]/45 bg-[linear-gradient(135deg,#FFF8D8_0%,#F7D56A_36%,#D99B1E_68%,#FFECA3_100%)] px-4 py-2 text-center text-sm font-semibold leading-relaxed text-[#4B3000]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] opacity-80" aria-hidden="true" />
            <span className="relative z-10">سيناريوهات من مجالك انت</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary-dark">
            شوف بوتيفاي شغال في مجالك بالظبط
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
            اختار مجالك، وشوف سيناريو حقيقي لواتساب بيرد ويتابع بشكل يناسب نشاطك.
          </p>
        </div>

        <div className="mt-6 -mx-5 overflow-x-auto px-5 pb-3 no-scrollbar lg:mx-auto lg:max-w-6xl lg:overflow-visible lg:px-0">
          <div className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-5">
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              const isActive = useCase.id === activeUseCase.id

              return (
                <button
                  key={useCase.id}
                  type="button"
                  onClick={() => setActiveUseCaseId(useCase.id)}
                  className={`relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 px-5 py-0 text-center text-base font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-dark/25 lg:min-w-0 ${isActive
                    ? "border-[#59c72d]/50 bg-primary/60 text-primary-dark"
                    : "border-primary-dark/10 bg-white text-primary-dark"
                    }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`relative z-10 grid h-8 w-8 flex-none place-items-center rounded-xl border ${isActive ? "border-primary-dark/15 bg-primary-foreground" : "border-primary/20 bg-primary/10"
                      }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 leading-snug">{useCase.tab}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.52fr)] lg:items-stretch lg:gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.45fr)]">
          <div
            className="use-case-reveal use-case-from-right order-2 min-w-0 lg:order-1 lg:col-start-1 lg:row-start-1 lg:w-full lg:max-w-[760px] lg:justify-self-start lg:self-stretch"
            data-use-case-reveal
            style={{ transitionDelay: "520ms" }}
          >
            <div className="lg:sticky lg:top-28">
              <div
                key={activeUseCase.id}
                className="use-case-copy-switch rounded-[22px] border border-[#DDEED4] bg-white/82 p-4 shadow-[0_16px_38px_rgba(11,52,4,0.075)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_22px_48px_rgba(11,52,4,0.1)] sm:p-5 lg:p-6"
              >
                <p className="text-xs font-bold text-primary-dark/70 sm:text-sm">{activeUseCase.tab}</p>
                <h3 className="mt-2.5 text-[1.35rem] font-bold leading-snug text-primary-dark sm:text-2xl lg:text-[1.7rem]">
                  {activeUseCase.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-text-secondary">
                  {activeUseCase.description}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {activeUseCase.bullets.map((bullet, index) => (
                    <li
                      key={bullet}
                      className="use-case-bullet flex items-start gap-2.5 text-base font-medium leading-6 text-primary-dark/80"
                      style={{ animationDelay: `${120 + index * 90}ms` }}
                    >
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-primary-dark transition-transform duration-300" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`/activate?source=use-case-${activeUseCase.id}`}
                  className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-primary px-4 py-2.5 text-base font-bold text-primary-dark shadow-[0_10px_26px_rgba(99,221,50,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#72ea41] hover:shadow-[0_16px_34px_rgba(99,221,50,0.26)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  {activeUseCase.cta}
                  <ArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-4 rounded-[22px] border border-primary/25 bg-primary-dark p-5 text-right text-white shadow-[0_18px_44px_rgba(11,52,4,0.16)] sm:p-6">
                <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                  مش شايف نشاطك هنا؟
                </h3>
                <p className="mt-3 text-lg font-medium leading-7 text-white/80">
                  طالما عملاؤك بيراسلوك على واتساب قبل ما يشتروا أو يحجزوا... بوتيفاي يقدر يبني لك رحلة مخصصة تناسب طريقة بيعك بالظبط.
                </p>
                <a
                  href="/activate?source=use-cases-bottom"
                  className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-primary px-4 py-2.5 text-base font-bold text-primary-dark shadow-[0_10px_28px_rgba(99,221,50,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#72ea41] hover:shadow-[0_16px_34px_rgba(99,221,50,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
                >
                  اطلب تفعيل بوتيفاي لنشاطك
                  <ArrowLeft className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="use-case-reveal use-case-from-left use-cases-phone relative order-1 mx-auto flex w-full min-w-0 max-w-full justify-center sm:max-w-[430px] lg:order-2 lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:justify-end lg:justify-self-end"
            data-use-case-reveal
            style={{ transitionDelay: "640ms" }}
          >
            <div className="use-case-phone-aura absolute -inset-3 rounded-[36px] bg-[radial-gradient(circle_at_50%_18%,rgba(99,221,50,0.16),transparent_48%),linear-gradient(180deg,rgba(11,52,4,0.07),rgba(11,52,4,0.01))] blur-xl" aria-hidden="true" />
            <div className="use-case-phone-float relative">
              <WhatsAppPhoneMockup scenario={activeUseCase.scenario} />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .use-case-reveal {
          opacity: 0;
          transition: opacity 720ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .use-case-from-up {
          transform: translateY(24px);
        }

        .use-case-from-right {
          transform: translate3d(26px, 20px, 0);
        }

        .use-case-from-left {
          transform: translate3d(-26px, 20px, 0);
        }

        .use-case-reveal-visible {
          opacity: 1;
          transform: none;
        }

        .use-case-copy-switch {
          animation: use-case-copy-in 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .use-case-bullet {
          animation: use-case-bullet-in 430ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .use-case-bullet:hover svg {
          transform: scale(1.12);
        }

        .use-case-phone-float {
          width: fit-content;
          max-width: 100%;
          animation: use-case-phone-float 6s ease-in-out infinite;
        }

        .use-case-phone-aura {
          animation: use-case-aura-breathe 5.6s ease-in-out infinite;
        }

        .use-cases-phone .wa-phone-shadow {
          opacity: 0.7;
          filter: blur(26px);
        }

        .use-cases-phone .wa-phone-stage {
          --wa-phone-scale: 1;
          width: clamp(310px, 30vw, 390px);
          max-width: min(100%, calc((100svh - 220px) * 0.5128));
          margin-left: clamp(16px, 2vw, 26px);
          margin-right: auto;
        }

        @keyframes use-case-spark {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }

          45% {
            transform: rotate(10deg) scale(1.08);
          }
        }

        @keyframes use-case-copy-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.992);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes use-case-bullet-in {
          from {
            opacity: 0;
            transform: translateX(10px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes use-case-phone-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes use-case-aura-breathe {
          0%, 100% {
            opacity: 0.78;
            transform: scale(0.98);
          }

          50% {
            opacity: 1;
            transform: scale(1.04);
          }
        }

        @media (max-width: 1023px) {
          .use-case-from-right,
          .use-case-from-left {
            transform: translateY(22px);
          }

          .use-case-reveal-visible {
            transform: none;
          }

          .use-cases-phone .wa-phone-stage {
            --wa-phone-scale: 1;
            width: min(370px, 84vw, calc((100svh - 96px) * 0.5128));
            max-width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .use-case-reveal,
          .use-case-from-up,
          .use-case-from-right,
          .use-case-from-left,
          .use-case-reveal-visible,
          .use-case-badge svg,
          .use-case-copy-switch,
          .use-case-bullet,
          .use-case-phone-float,
          .use-case-phone-aura {
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
