import { ArrowLeft, CalendarClock, CheckCircle2, Clock3, MessageCircle, MousePointerClick, Reply, Lightbulb } from "lucide-react"

const journeySteps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "عميل جاهز",
    scene: ["يسأل: بكم؟", "أحجز متى؟"],
    note: "لحظة قرار.",
    className: "lg:mt-0",
  },
  {
    icon: Clock3,
    step: "02",
    title: "الرد يتأخر",
    scene: ["ينتظر.", "والاهتمام يبرد."],
    note: "الدقيقة تفرق.",
    className: "lg:mt-6",
  },
  {
    icon: MousePointerClick,
    step: "03",
    title: "راح لمنافس تاني",
    scene: ["قفل المحادثة معاك.", "وراسل غيرك."],
    note: "لأن الأسرع يقود.",
    className: "lg:mt-2",
  },
  {
    icon: Reply,
    step: "04",
    title: "الموظف يرجع",
    scene: ["يرد بأدب.", "لكن القرار انتهى."],
    note: "الفرصة لا تنتظر.",
    className: "lg:mt-8",
  },
  {
    icon: CheckCircle2,
    step: "05",
    title: "فرصة بيع ضاعت",
    scene: ["لا يوجد تنبيه.", "بس الفرصة ضاعت."],
    note: "وتتكرر يوميًا.",
    className: "lg:mt-4 lg:scale-[1.04]",
    featured: true,
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="relative overflow-hidden bg-white py-10 sm:py-12">
      <div className="max-w-container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
            <span className="block">مشكلتك مش الرسائل الكتير…</span>
            <span className="block">مشكلتك إن في عملاء جاهزين بيضيعوا وسطها.</span>
          </h2>
        </div>

        <div className="problem-reveal problem-reveal-wait mx-auto mb-6 max-w-3xl">
          <div className="rounded-2xl border border-primary/25 bg-primary-light/60 p-4 text-right shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-primary/15 pb-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_5px_rgba(99,221,50,0.14)]" aria-hidden="true" />
                مشهد يتكرر كل يوم
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-3 py-1 text-xs font-bold text-text-secondary">
                <CalendarClock className="h-3.5 w-3.5 text-primary-dark" aria-hidden="true" />
                9:47 مساءً
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-2xl rounded-tl-md border border-primary/25 bg-white px-4 py-2.5 text-base font-medium leading-relaxed text-primary-dark shadow-elevation1">
                عميل بيسألك عن السعر… وهو بالفعل ناوي يشتري.
              </div>
              <div className="hidden h-px w-10 bg-primary/30 md:block" aria-hidden="true" />
              <div className="rounded-2xl rounded-tr-md border border-border-custom bg-white/70 px-4 py-2.5 text-base font-medium leading-relaxed text-text-secondary">
                وأنت لسه بترد… كان بعت لمنافسك بالفعل.
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {journeySteps.map((step, index) => {
              const Icon = step.icon

              const getBoxStyles = (i: number) => {
                switch (i) {
                  case 0:
                    return {
                      box: "border-primary/50 bg-primary/30 hover:border-primary/55 hover:bg-primary/50",
                      iconWrapper: "border-primary/25 text-primary-dark group-hover:bg-primary",
                      stepText: "text-primary-dark/30",
                      title: "text-text-primary",
                      scene: "text-primary-dark",
                      note: "text-text-secondary",
                      bottomLine: "bg-transparent",
                      arrow: "border-primary/25 text-primary-dark"
                    }
                  case 1:
                    return {
                      box: "border-amber-200 bg-amber-100 hover:border-amber-300 hover:bg-amber-200",
                      iconWrapper: "border-amber-300 text-amber-600 group-hover:bg-amber-400 group-hover:text-amber-900",
                      stepText: "text-amber-500/40",
                      title: "text-amber-950",
                      scene: "text-amber-900",
                      note: "text-amber-600/80",
                      bottomLine: "bg-transparent",
                      arrow: "border-amber-200 text-amber-400"
                    }
                  case 2:
                    return {
                      box: "border-amber-300 bg-amber-200 hover:border-amber-400 hover:bg-amber-200",
                      iconWrapper: "border-amber-300 text-amber-600 group-hover:bg-amber-400 group-hover:text-amber-900",
                      stepText: "text-amber-600/50",
                      title: "text-amber-950",
                      scene: "text-amber-900",
                      note: "text-amber-700/90",
                      bottomLine: "bg-transparent",
                      arrow: "border-amber-300 text-amber-500"
                    }
                  case 3:
                    return {
                      box: "border-red-200 bg-red-100 hover:border-red-300 hover:bg-red-200",
                      iconWrapper: "border-red-200 text-red-500 group-hover:bg-red-300 group-hover:text-red-900",
                      stepText: "text-red-600/50",
                      title: "text-red-950",
                      scene: "text-red-900",
                      note: "text-red-700/90",
                      bottomLine: "bg-transparent",
                      arrow: "border-red-400 text-red-600"
                    }
                  case 4:
                    return {
                      box: "border-red-300 bg-red-200 hover:border-red-400 hover:bg-red-200",
                      iconWrapper: "border-red-200 text-red-500 group-hover:bg-red-300 group-hover:text-red-900",
                      stepText: "text-red-600/50",
                      title: "text-red-950",
                      scene: "text-red-900",
                      note: "text-red-700/90",
                      bottomLine: "bg-transparent",
                      arrow: "hidden"
                    }
                  default:
                    return {
                      box: "border-primary/25 bg-primary-light/55 hover:border-primary/50 hover:bg-primary-light shadow-sm hover:shadow-xl hover:shadow-primary/15",
                      iconWrapper: "border-primary/25 text-primary-dark group-hover:bg-primary",
                      stepText: "text-primary-dark/30",
                      title: "text-text-primary",
                      scene: "text-primary-dark",
                      note: "text-text-secondary",
                      bottomLine: "bg-transparent",
                      arrow: "border-primary/25 text-primary-dark"
                    }
                }
              }

              const styles = getBoxStyles(index)

              return (
                <div
                  key={step.step}
                  className={`problem-reveal problem-reveal-wait relative ${step.featured ? "col-span-2 lg:col-span-1" : ""}`}
                  style={{ transitionDelay: `${140 + index * 110}ms`, zIndex: 10 - index }}
                >
                  {index < journeySteps.length - 1 && (
                    <div className={`absolute -left-[29px] top-1/2 z-20 hidden h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 lg:flex ${styles.arrow}`} aria-hidden="true">
                      <ArrowLeft className="h-[21px] w-[21px]" />
                    </div>
                  )}

                  <div
                    className={`group relative h-full flex flex-col items-center justify-center min-h-[176px] rounded-xl border p-3 text-center transition-all duration-500 hover:-translate-y-2 sm:min-h-[184px] sm:p-4 lg:min-h-[172px] lg:p-3 ${styles.box}`}
                  >
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-3 lg:left-3">
                      <span className={`text-sm font-black ${styles.stepText}`}>{step.step}</span>
                    </div>

                    <div className="mb-3 flex justify-center">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-white shadow-elevation1 transition-all duration-300 group-hover:scale-110 ${styles.iconWrapper}`}>
                        <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className={`mb-2 text-sm font-bold leading-tight sm:text-base ${styles.title}`}>
                      {step.title}
                    </h3>

                    <div className={`mb-2 space-y-1 text-sm font-semibold leading-tight sm:text-base ${styles.scene}`}>
                      {step.scene.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <p className={`text-xs font-semibold leading-relaxed ${styles.note}`}>
                      {step.note}
                    </p>

                    <div className={`absolute inset-x-4 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${styles.bottomLine}`} aria-hidden="true" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="problem-reveal problem-reveal-wait relative mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200 bg-gray-50/80 px-6 py-5 text-center shadow-sm"
          style={{ transitionDelay: "760ms" }}
        >
          <div className="absolute -top-6 left-0 right-0 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-amber-500 shadow-sm">
            <Lightbulb className="h-[22px] w-[22px]" />
          </div>
          <p className="mt-2 text-lg md:text-xl font-bold leading-relaxed text-gray-800">
            العميل مش بيختفي لأنه مش مهتم… بيختفي لأنه لقى حد رد عليه قبلك.
          </p>
        </div>
      </div>

      <style>{`
        .problem-reveal {
          transition-property: opacity, transform;
          transition-duration: 640ms;
          transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .problem-reveal-wait {
          opacity: 0;
          transform: translateY(18px);
        }

        .problem-reveal-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .problem-reveal,
          .problem-reveal-wait,
          .problem-reveal-in {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
