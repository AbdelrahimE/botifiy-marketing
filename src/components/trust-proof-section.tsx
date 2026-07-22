"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import {
  BrainCircuit,
  Check,
  Database,
  Headphones,
  Info,
  Megaphone,
  MessagesSquare,
  Mic,
  MousePointerClick,
  Paperclip,
  Phone,
  Route,
  Star,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type CustomerReview = {
  name: string
  business: string
  quote: string
  image: string
}

type PricingPlan = {
  id: string
  name: string
  description: string
  hint: string
  price: number
  period: string
  monthlyLink: string
  features: {
    icon: LucideIcon
    text: string
    description: string
  }[]
  ctaText: string
  featured?: boolean
}

const customerReviews: CustomerReview[] = [
  {
    name: "الاستاذ إسلام حافظ",
    business: "Triple a Entertainment",
    quote:
      "منصة متميزة وحلول ذكية، سهلت كتير لعملائي و وفرت لي وقت كتير، وساهمت في زيادة المبيعات بشكل ملحوظ. شكراً جزيلاً.",
    image: "/images/trusted1.webp",
  },
  {
    name: "دكتور سارة خالد",
    business: "عيادة أسنان",
    quote:
      "اسئلة الحجز والاسعار والمواعيد بقت تخلص لوحدها، وده وفر وقت واضح على فريق الاستقبال من أول أسبوع تشغيل.",
    image: "/images/trusted2.webp",
  },
  {
    name: "المهندس محمد داوود",
    business: "منصة كورسات",
    quote:
      "البوت ماشاء الله ممتاز جدا واكتر حاجه عجباني خدمة العملاء وفكره تنفيذ الحلول السريعه للمشاكل عن طريق عمل اضافات جديده على المنصه بشكل سريع ده شيء ابهرني جدا صراحه ... بالتوفيق ان شاء الله",
    image: "/images/trusted3.webp",
  },
  {
    name: "الاستاذ محمد خيري",
    business: "براند ملابس",
    quote:
      "المنصة مفيدة جداً في الاستفسارات المتكررة عن المقاسات والدفع والشحن صارت تنرد تلقائي وفريقنا صار يركز على تجهيز الطلبات بدل تكرار نفس الردود.",
    image: "/images/trusted4.webp",
  },
  {
    name: "الاستاذ خالد ناصر",
    business: "خدمات صيانة",
    quote:
      "بوتيفاي ساعدنا نلم بيانات العميل ونوع المشكلة قبل ما الفريق يتواصل معاه. ده خلى المتابعة أرتب وأسرع.",
    image: "/images/trusted5.webp",
  },
  {
    name: "دكتور ريم يوسف",
    business: "مركز تجميل",
    quote:
      "البوت صراحة مفيد جدا بالأخص في نقطة الحجوزات والاستفسارات المتكررة بقت أهدى كتير. العميل بياخد إجابة سريعة وواضحة والفريق بيتدخل بس لما يحتاج ... شكرا لكم",
    image: "/images/trusted6.webp",
  },
  {
    name: "الاستاذ مصطفى علي",
    business: "مطعم ومطبخ سحابي",
    quote:
      "المنصة وفرت علينا وقت وجهد كبير جدا .. القائمة ومناطق التوصيل وساعات العمل بقت بتتبعت تلقائياً. عدد الرسائل اللي محتاجة رد يدوي قل بشكل ملحوظ.",
    image: "/images/trusted7.webp",
  },
  {
    name: "الاستاذة هبة محمود",
    business: "استشارات تعليمية",
    quote:
      "بعد استخدامنا لبوتيفاي الشغل اصبح اسهل واسرع بقينا نفلتر الطلبات من اول رسالة. اللي محتاج تفاصيل بياخدها فوراً واللي جاهز يحجز بيوصل للفريق اسرع.",
    image: "/images/trusted8.webp",
  },
  {
    name: "عبدالله فهد",
    business: "متجر عطور",
    quote:
      "بعد ما اشتركنا معاكم الواتساب اصبح منظم اكتر العميل يوصله الاختيارات والاسعار والعروض بسرعة وبشكل سهل وإحنا نتابع الطلبات المهمة بسلاسة وهدوء ... واحلي حاجة عجباني الدعم عندكم متعاون ومتجاوب .. وشكرا",
    image: "/images/trusted9.webp",
  },
  {
    name: "نوران حسن",
    business: "خدمات عقارية",
    quote:
      "اكيد طبعا المنصة مفيدة جدا بالذات في الاستفسارات الاولية عن الاسعار والمناطق بقت بتترد تلقائيا. ده وفر وقت كبير وخلى التواصل مع العملاء الجادين اسهل.",
    image: "/images/trusted10.webp",
  },
]

const pricingPlans: PricingPlan[] = [
  {
    id: "launch",
    name: "الإطــلاق",
    description: "ابدأ أول رحلة بيع احترافية على واتساب.",
    hint: "مناسبة لو بتبدأ أول مرة.",
    price: 10,
    period: "شهرياً",
    monthlyLink: "/activate?plan=launch&source=pricing",
    features: [
      { icon: BrainCircuit, text: "رد تلقائي ذكي يفهم نية العميل", description: "تقدر تشغّل لحد 30 قاعدة رد تلقائي نشطة حسب كلمات العميل أو نيته. كل قاعدة ممكن ترسل نص أو صورة أو ملف أو قالب تفاعلي، والقواعد غير النشطة مش بتتحسب ضمن الحد." },
      { icon: Route, text: "1 مسار متابعة تلقائية للعملاء", description: "تقدر تنشئ مسار متابعة واحد يضم لحد 3 نوايا. الذكاء الاصطناعي يقدر يتخذ 1,500 قرار شهرياً لفهم نوايا العملاء وتوجيههم للمسار المناسب، ومعاك 30 استخدام شهرياً لمساعدتك في إنشاء وصف النوايا وكلماتها." },
      { icon: MousePointerClick, text: "أزرار وقوائم تفاعلية جاهزة", description: "تقدر تنشئ لحد 10 قوالب أزرار تفاعلية و10 قوالب قوائم و10 قوالب استطلاعات، علشان تسهّل على العميل الاختيار وتوصّله للخطوة المناسبة بسرعة." },
      { icon: MessagesSquare, text: "5,000 رسالة شهرياً", description: "معاك لحد 5,000 رسالة صادرة ناجحة خلال دورة الاشتراك، وتشمل رسائل الحملات والردود التلقائية ومسارات المتابعة. الرسائل اللي بيبعتها لك العملاء مش بتتحسب ضمن الحد." },
      { icon: Users, text: "5,000 جهة اتصال للحملات", description: "تقدر تحفظ وتنظّم لحد 5,000 جهة اتصال في حسابك، وتستورد جهات الاتصال من ملف CSV بحجم أقصى 1 ميجا للملف الواحد." },
      { icon: UserCheck, text: "500 عميل داخل المتابعات", description: "تقدر تتابع لحد 500 عميل نشط إجمالاً داخل كل مسارات المتابعة في نفس الوقت. العميل اللي خلص المتابعة أو تم إيقافه مش بيتحسب ضمن الحد." },
      { icon: Megaphone, text: "حملة جماعية واحدة في نفس الوقت", description: "تقدر تشغّل حملة جماعية واحدة في نفس الوقت، وبعد ما تنتهي أو توقفها تقدر تبدأ حملة جديدة." },
      { icon: Phone, text: "رقم واتساب واحد", description: "تقدر تربط وتدير رقم واتساب واحد من حسابك، وتستخدمه في الرسائل والحملات والردود التلقائية ومسارات المتابعة." },
      { icon: Mic, text: "5,000 ثانية من الرسائل الصوتية إلى نص", description: "تقدر تحوّل إجمالي 5,000 ثانية من الرسائل الصوتية إلى نص خلال كل دورة شهرية، علشان الأتمتة تفهم محتوى الرسالة وتتعامل معاه بشكل صحيح." },
      { icon: Paperclip, text: "يرسل صور وملفات وPDF وفويس", description: "تقدر ترسل صور وملفات وPDF ورسائل صوتية بشكل تلقائي. الحد الأقصى لحجم ملف الوسائط الواحد 5 ميجا، ومعاك مساحة تخزين إجمالية 200 ميجا." },
    ],
    ctaText: "ابدأ تفعيل بوتيفاي",
  },
  {
    id: "growth",
    name: "النـمـــو",
    description: "الخطة اللي أغلب عملائنا بيبدأوا بيها.",
    hint: "مناسبة لأي بيزنس مهما كان مجاله.",
    price: 20,
    period: "شهرياً",
    monthlyLink: "/activate?plan=growth&source=pricing",
    features: [
      { icon: BrainCircuit, text: "ذكاء اصطناعي أقوى لفهم نية العملاء", description: "تقدر تشغّل لحد 100 قاعدة رد تلقائي نشطة حسب كلمات العميل أو نيته. كل قاعدة ممكن ترسل نص أو صورة أو ملف أو قالب تفاعلي، والقواعد غير النشطة مش بتتحسب ضمن الحد." },
      { icon: Route, text: "4 مسارات متابعات تلقائية مختلفة", description: "تقدر تنشئ لحد 4 مسارات متابعة، وفي كل مسار لحد 5 نوايا. الذكاء الاصطناعي يقدر يتخذ 5,000 قرار شهرياً لفهم نوايا العملاء وتوجيههم للمسار المناسب، ومعاك 100 استخدام شهرياً لمساعدتك في إنشاء وصف النوايا وكلماتها." },
      { icon: MousePointerClick, text: "عدد أكبر من الأزرار والقوائم التفاعلية", description: "تقدر تنشئ لحد 20 قالب أزرار تفاعلية و20 قالب قوائم و20 قالب استطلاعات، وتبني محادثات تناسب منتجاتك وخدماتك المختلفة." },
      { icon: MessagesSquare, text: "30,000 رسالة شهرياً", description: "معاك لحد 30,000 رسالة صادرة ناجحة خلال دورة الاشتراك، وتشمل رسائل الحملات والردود التلقائية ومسارات المتابعة. الرسائل اللي بيبعتها لك العملاء مش بتتحسب ضمن الحد." },
      { icon: Users, text: "30,000 جهة اتصال للحملات", description: "تقدر تحفظ وتنظّم لحد 30,000 جهة اتصال في حسابك، وتستورد جهات الاتصال من ملف CSV بحجم أقصى 1 ميجا للملف الواحد." },
      { icon: UserCheck, text: "2,000 عميل نشط داخل المتابعات", description: "تقدر تتابع لحد 2,000 عميل نشط إجمالاً داخل كل مسارات المتابعة في نفس الوقت. العميل اللي خلص المتابعة أو تم إيقافه مش بيتحسب ضمن الحد." },
      { icon: Megaphone, text: "حملتين جماعيتين في نفس الوقت", description: "تقدر تشغّل حملتين جماعيتين في نفس الوقت وتستهدف مجموعات مختلفة، من غير ما تستنى الحملة الأولى تخلص." },
      { icon: Phone, text: "حتى رقمين واتساب", description: "تقدر تربط وتدير لحد رقمين واتساب من حساب واحد، وتوزّع الحملات والردود التلقائية ومسارات المتابعة بينهم." },
      { icon: Mic, text: "12,000 ثانية من الرسائل الصوتية إلى نص", description: "تقدر تحوّل إجمالي 12,000 ثانية من الرسائل الصوتية إلى نص خلال كل دورة شهرية، علشان الأتمتة تفهم محتوى الرسالة وتتعامل معاه بشكل صحيح." },
      { icon: Paperclip, text: "يرسل صور وملفات وPDF وفويس", description: "تقدر ترسل صور وملفات وPDF ورسائل صوتية بشكل تلقائي، بحجم أقصى 10 ميجا لملف الوسائط الواحد." },
      { icon: Database, text: "مساحة أكبر للملفات والوسائط", description: "معاك مساحة تخزين إجمالية 300 ميجا لحفظ ملفات الحملات والردود التلقائية في مكتبة الوسائط." },
    ],
    ctaText: "ابدأ تفعيل بوتيفاي",
    featured: true,
  },
  {
    id: "dominate",
    name: "الهيــمنــة",
    description: "للشركات والفرق اللي حجم الرسائل عندها كبير.",
    hint: "مناسبة للشركات والفرق الكبيرة.",
    price: 30,
    period: "شهرياً",
    monthlyLink: "/activate?plan=dominate&source=pricing",
    features: [
      { icon: BrainCircuit, text: "قدرات وحدود أعلى للذكاء الاصطناعي", description: "تقدر تشغّل لحد 300 قاعدة رد تلقائي نشطة لعدد أكبر من سيناريوهات العملاء حسب كلماتهم أو نواياهم، والقواعد غير النشطة مش بتتحسب ضمن الحد." },
      { icon: Route, text: "12 مسار متابعات تلقائية ذكية مختلفة", description: "تقدر تنشئ لحد 12 مسار متابعة، وفي كل مسار لحد 8 نوايا. الذكاء الاصطناعي يقدر يتخذ 12,000 قرار شهرياً لفهم نوايا العملاء وتوجيههم للمسار المناسب، ومعاك 200 استخدام شهرياً لمساعدتك في إنشاء وصف النوايا وكلماتها." },
      { icon: MousePointerClick, text: "أكبر عدد من الأزرار والقوائم التفاعلية", description: "تقدر تنشئ لحد 50 قالب أزرار تفاعلية و50 قالب قوائم و50 قالب استطلاعات، علشان تبني تجارب تفاعلية متنوعة تناسب كل منتجاتك وفرقك." },
      { icon: MessagesSquare, text: "100,000 رسالة / شهر", description: "معاك لحد 100,000 رسالة صادرة ناجحة خلال دورة الاشتراك، وتشمل رسائل الحملات والردود التلقائية ومسارات المتابعة. الرسائل اللي بيبعتها لك العملاء مش بتتحسب ضمن الحد." },
      { icon: Users, text: "100,000 جهة اتصال للحملات", description: "تقدر تحفظ وتنظّم لحد 100,000 جهة اتصال في حسابك، وتستورد جهات الاتصال من ملف CSV بحجم أقصى 2 ميجا للملف الواحد." },
      { icon: UserCheck, text: "10,000 عميل نشط داخل المتابعات", description: "تقدر تتابع لحد 10,000 عميل نشط إجمالاً داخل كل مسارات المتابعة في نفس الوقت. العميل اللي خلص المتابعة أو تم إيقافه مش بيتحسب ضمن الحد." },
      { icon: Megaphone, text: "4 حملات جماعية في نفس الوقت", description: "تقدر تشغّل لحد 4 حملات جماعية في نفس الوقت، وتخدم فرق أو شرائح مختلفة من غير ما تستنى حملة تخلص." },
      { icon: Phone, text: "حتى 4 أرقام واتساب", description: "تقدر تربط وتدير لحد 4 أرقام واتساب من لوحة تحكم واحدة، وتوزّع الحملات والردود التلقائية ومسارات المتابعة بينهم حسب احتياج فريقك." },
      { icon: Mic, text: "تحويل حتى 30,000 ثانية من صوت إلى نص", description: "تقدر تحوّل إجمالي 30,000 ثانية من الرسائل الصوتية إلى نص خلال كل دورة شهرية، علشان الأتمتة تفهم محتوى الرسالة وتتعامل معاه بشكل صحيح." },
      { icon: Paperclip, text: "يرسل صور وملفات وPDF وفويس", description: "تقدر ترسل صور وملفات وPDF ورسائل صوتية بشكل تلقائي، بحجم أقصى 10 ميجا لملف الوسائط الواحد." },
      { icon: Database, text: "أعلى حدود للاستخدام والتخزين", description: "معاك أكبر مساحة تخزين ضمن الخطط الجاهزة بإجمالي 500 ميجا، لحفظ ملفات الحملات والردود التلقائية في مكتبة الوسائط." },
      { icon: Headphones, text: "دعم مجاني 24 ساعة", description: "تقدر تتواصل مع فريق الدعم مجاناً على مدار 24 ساعة، وتحصل على المساعدة وقت ما تحتاجها." },
    ],
    ctaText: "ابدأ تفعيل بوتيفاي",
  },
]

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <article className="relative z-0 h-full rounded-[28px] border border-[#dfe8da] bg-white p-6 shadow-none transition duration-300 will-change-transform hover:z-10 hover:-translate-y-2 hover:border-[#cadfc2] hover:shadow-[0_18px_42px_rgba(11,52,4,0.08)] sm:p-7">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-4">
          <Image
            src={review.image}
            alt={`صورة ${review.name}`}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-full border border-[#d9e8d3] bg-[#f6fbf3] object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg font-bold leading-tight text-primary-dark">
              {review.name}
            </h3>
            <p className="mt-1 text-sm font-semibold text-text-secondary/80">
              {review.business}
            </p>
          </div>
        </div>

        <p className="mt-6 flex-1 text-base leading-8 text-[#284722]">
          &quot;{review.quote}&quot;
        </p>

        <div className="mt-6 flex items-center gap-1 text-[#f5b301]" role="img" aria-label="تقييم 5 من 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
          ))}
        </div>
      </div>
    </article>
  )
}

function FeatureInfo({ description, id }: { description: string; id: string }) {
  return (
    <span className="relative inline-flex shrink-0">
      <button
        type="button"
        aria-label="مزيد من المعلومات عن هذه الميزة"
        aria-describedby={id}
        className="peer grid h-4 w-4 place-items-center text-primary-dark/60 transition-colors hover:text-primary focus:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Info className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      </button>

      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-right text-xs font-normal leading-6 text-primary-dark opacity-0 shadow-[0_12px_30px_rgba(11,52,4,0.16)] transition-all duration-200 peer-hover:translate-y-0 peer-hover:opacity-100 peer-focus:translate-y-0 peer-focus:opacity-100"
      >
        {description}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-gray-200 bg-gray-100" aria-hidden="true" />
      </span>
    </span>
  )
}

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
  const isFeatured = plan.featured === true

  return (
    <Card
      className={`group relative isolate flex h-full flex-col overflow-visible rounded-4xl border bg-white transition-all duration-300 hover:z-40 hover:-translate-y-1 focus-within:z-50 ${isFeatured
        ? "border-primary/80"
        : "border-primary-dark/20"
        }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${isFeatured
          ? "bg-primary/20"
          : "bg-white"
          }`}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-l from-transparent via-white to-transparent" aria-hidden="true" />
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <div className="rounded-full border border-[#E3B23C]/45 bg-[linear-gradient(135deg,#FFF8D8_0%,#F7D56A_36%,#D99B1E_68%,#FFECA3_100%)] px-6 py-1.5 text-sm font-bold">
            الأكثر اختياراً
          </div>
        </div>
      )}

      <div className={`relative z-10 flex h-full flex-col p-8 text-right ${isFeatured ? "pt-8" : ""}`}>
        <div>
          <h3 className="mb-2 text-3xl font-bold text-primary-dark">{plan.name}</h3>
          <p className="mb-3 text-base text-primary-dark/80">{plan.description}</p>

          <div className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-[#d8e1d4] bg-[#f3f6f1] px-3 py-1 text-xs font-bold text-primary-dark/75">
            <Check className="h-3.5 w-3.5 text-primary-dark/70" aria-hidden="true" />
            <span>{plan.hint}</span>
          </div>

          <div className="mb-6 flex items-center justify-end gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary-dark">${plan.price}</span>
              <span className="text-lg text-primary-dark/80">{plan.period}</span>
            </div>
          </div>

          <Button
            asChild
            className={`w-full rounded-xl border-2 font-bold transition-all duration-300 hover:-translate-y-0.5 ${isFeatured
              ? "border-[#59c72d] bg-primary py-6 text-xl text-primary-dark"
              : "border-primary-dark bg-white py-5 text-lg text-primary-dark hover:border-[#59c72d] hover:bg-primary"
              }`}
          >
            <Link
              href={plan.monthlyLink}
            >
              {plan.ctaText}
            </Link>
          </Button>
        </div>

        <div className="mt-6 border-t border-primary-dark/10 pt-4">
          <ul className="space-y-4">
            {plan.features.map((feature, featureIndex) => {
              const Icon = feature.icon

              return (
                <li key={feature.text} className="flex min-h-7 items-center gap-3 text-right">
                  <span
                    className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${isFeatured
                      ? "bg-primary-dark text-primary"
                      : "bg-primary-light text-primary-dark"
                      }`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex min-w-0 items-center gap-1.5">
                    <span className="text-sm leading-6 text-primary-dark/80">{feature.text}</span>
                    <FeatureInfo
                      id={`home-pricing-${plan.id}-feature-${featureIndex}`}
                      description={feature.description}
                    />
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export function TrustProofSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: false,
      direction: "rtl",
      duration: 34,
      loop: true,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  )
  const [selectedReview, setSelectedReview] = useState(0)

  const updateSelectedReview = useCallback(() => {
    if (!emblaApi) return
    setSelectedReview(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    updateSelectedReview()
    emblaApi.on("select", updateSelectedReview)
    emblaApi.on("reInit", updateSelectedReview)

    return () => {
      emblaApi.off("select", updateSelectedReview)
      emblaApi.off("reInit", updateSelectedReview)
    }
  }, [emblaApi, updateSelectedReview])

  return (
    <section
      id="real-customer-proof"
      dir="rtl"
      className="relative overflow-hidden bg-[#fbfdf8] pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14"
      aria-labelledby="real-customer-proof-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#dcebd5] to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(11,52,4,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,52,4,.04)_1px,transparent_1px)] [background-size:84px_84px]" />

      <div className="relative z-10 mx-auto max-w-container px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative inline-flex max-w-[calc(100vw-3rem)] items-center justify-center gap-2 overflow-hidden rounded-full border border-[#E3B23C]/45 bg-[linear-gradient(135deg,#FFF8D8_0%,#F7D56A_36%,#D99B1E_68%,#FFECA3_100%)] px-4 py-2 text-center text-sm font-semibold leading-relaxed text-[#4B3000]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.85),transparent_28%),linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)] opacity-80" aria-hidden="true" />
            <span className="relative z-10">تجارب حقيقية نفتخر بيها</span>
          </div>

          <h2
            id="real-customer-proof-title"
            className="mt-5 text-3xl md:text-4xl font-bold leading-[1.4] text-primary-dark"
          >
            النتايج مش بنقولها... العملاء بيقولوها
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-base leading-8 text-primary-dark/80 sm:text-lg">
            شوف رأي أصحاب المشاريع اللي بيستخدموا بوتيفاي عشان ميضيعوش أي فرصة بيع.
          </p>
        </div>

        <div
          className="-mx-5 -my-8 mt-2 overflow-hidden bg-transparent px-5 py-8 shadow-none ring-0 sm:-mx-6 sm:px-6"
          ref={emblaRef}
        >
          <div className="-mr-4 flex touch-pan-y sm:-mr-5">
            {customerReviews.map((review) => (
              <div
                key={`${review.name}-${review.business}`}
                className="min-w-0 shrink-0 grow-0 basis-full pr-4 sm:basis-1/2 sm:pr-5 lg:basis-1/3"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-center gap-2"
          role="group"
          aria-label="التنقل بين مراجعات العملاء"
        >
          {customerReviews.map((review, index) => {
            const isSelected = index === selectedReview

            return (
              <button
                key={`${review.name}-indicator`}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className="group grid h-7 w-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                aria-label={`عرض مراجعة ${review.name}`}
                aria-current={isSelected ? "true" : undefined}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${isSelected
                    ? "bg-primary-dark"
                    : "bg-primary-dark/20 group-hover:bg-primary-dark/50"
                    }`}
                  aria-hidden="true"
                />
              </button>
            )
          })}
        </div>

        <div id="pricing" className="mx-auto mt-24 max-w-3xl scroll-mt-20 text-center sm:scroll-mt-24">
          <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-[1.4] text-primary-dark">
            أسعار بوتيفاي للرد التلقائي على واتساب
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base leading-8 text-primary-dark/80 sm:text-lg">
            اختار الخطة المناسبة لحجم رسائلك وابدأ رحلة بيع تلقائية مع عملائك.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section >
  )
}
