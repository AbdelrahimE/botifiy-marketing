"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "هل لازم يكون عندي خبرة تقنية؟",
    answer:
      "لا. بوتيفاي معمول لأصحاب المشاريع، مش للمبرمجين. تقدر تبني الردود التلقائية والمتابعات من لوحة تحكم بسيطة، من غير ما تكتب أي كود.",
  },
  {
    question: "هل ينفع مع البيزنس بتاعي؟",
    answer:
      "أيوه. سواء عندك متجر، عيادة، مطعم، منصة كورسات، شركة خدمات أو أي نشاط بيعتمد على واتساب، تقدر تبني رحلة مناسبة لعملائك بسهولة.",
  },
  {
    question: "هل أقدر أستخدم رقم واتساب الحالي؟",
    answer:
      "أيوه. بتمسح الكيو آر كود وبتربط رقمك وبس كده، يشتغل بوتيفاي على نفس الرقم اللي عملاؤك متعودين يتواصلوا معاه، من غير ما تحتاج تغيّر الرقم.",
  },
  {
    question: "هل يقدر يرسل صور وملفات ورسائل صوتية؟",
    answer:
      "أكيد. بوتيفاي يرسل نصوص وصور وفيديو وملفات PDF ورسائل صوتية، وكمان أزرار وقوائم تفاعلية توصل العميل للي محتاجه أسرع.",
  },
  {
    question: "لو العميل خرج من المحادثة ومردش؟",
    answer:
      "تقدر تبني متابعات تلقائية تفكره بيك في الوقت المناسب، بدل ما تضيع فرصة بيع بسبب النسيان أو تأخر الرد.",
  },
  {
    question: "لو عندي موظفين بيردوا بالفعل؟",
    answer:
      "بوتيفاي مش بديل للموظفين. هو بيتولى الردود المتكررة والمتابعات التلقائية، علشان فريقك يركز على الحالات اللي محتاجة تدخل بشري وإغلاق المبيعات.",
  },
  {
    question: "لو شغلي كبر بعد فترة؟",
    answer:
      "مفيش مشكلة. تقدر ترقي خطتك في أي وقت من غير ما تخسر إعدادات الرد التلقائي أو المتابعات اللي بنيتها.",
  },
  {
    question: "هل فيه دعم لو احتجت مساعدة؟",
    answer:
      "أكيد. لو احتجت مساعدة أثناء الإعداد أو التشغيل، فريقنا هيساعدك لحد ما تبدأ تستخدم بوتيفاي بالشكل المناسب لنشاطك.",
  },
  {
    question: "أبدأ بأي خطة؟",
    answer:
      "خطة الإطلاق مناسبة لو لسه بتبدأ. خطة النمو هي الأفضل لمعظم الأنشطة اللي عندها رسائل يومية، وخطة الهيمنة مناسبة لحجم رسائل كبير أو أكتر من رقم واتساب.",
  },
]

type FaqItemProps = {
  faq: (typeof faqs)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FaqItem({ faq, index, isOpen, onToggle }: FaqItemProps) {
  const answerId = `faq-answer-${index}`
  const triggerId = `faq-trigger-${index}`

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[24px] border bg-white transition-all duration-300",
        isOpen
          ? "border-primary/45 shadow-[0_14px_40px_rgba(11,52,4,0.08)]"
          : "border-border-custom hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_10px_30px_rgba(11,52,4,0.06)]",
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-6 sm:py-[18px]"
        >
          <span className="text-base font-bold leading-7 text-text-primary sm:text-lg">
            {faq.question}
          </span>

          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
              isOpen
                ? "rotate-45 border-primary bg-primary text-primary-dark"
                : "border-border-custom bg-surface-alt text-primary-dark group-hover:border-primary/50 group-hover:bg-primary-light",
            )}
            aria-hidden="true"
          >
            <Plus className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </span>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl px-5 pb-5 text-[15px] leading-7 text-text-secondary sm:px-6 sm:text-base">
            {faq.answer}
          </p>
        </div>
      </div>
    </article>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#fbfdf8] pt-10 pb-20 sm:scroll-mt-24 sm:pt-12 sm:pb-28 lg:pt-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(11,52,4,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,52,4,.04)_1px,transparent_1px)] [background-size:84px_84px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-container px-6">
        <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-light/70 px-4 py-2 text-sm font-bold text-primary-dark">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            كل اللي محتاج تعرفه قبل ما تبدأ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold leading-[1.4] text-primary-dark"
          >
            لسه عندك سؤال؟
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base leading-8 text-primary-dark/80 sm:text-lg">
            دي أكتر أسئلة أصحاب المشاريع بيسألونا عنها قبل تشغيل بوتيفاي.
          </p>
        </header>

        <div className="mx-auto grid max-w-3xl gap-2.5 sm:gap-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((currentIndex) =>
                  currentIndex === index ? null : index,
                )
              }
            />
          ))}
        </div>

        <aside className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-[32px] bg-primary-dark px-6 py-9 text-center shadow-[0_24px_60px_rgba(11,52,4,0.18)] sm:px-12 sm:py-11">
          <div
            className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-12 h-52 w-52 rounded-full bg-primary/15 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative">
            <h3 className="text-4xl font-bold text-white sm:text-5xl">لسه محتـــار؟</h3>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-8 text-white/80">
              قولنا طبيعة شغلك، وإحنا هنساعدك تختار الخطة والإعدادات المناسبة لنشاطك.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-7 h-auto rounded-2xl border border-primary bg-primary px-7 py-4 text-lg font-bold text-primary-dark shadow-[0_10px_26px_rgba(99,221,50,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#73e247] hover:shadow-[0_16px_34px_rgba(99,221,50,0.28)]"
            >
              <a
                href="/activate?source=faq"
              >
                <span>تواصـل معانـا دلوقتـي</span>
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}
