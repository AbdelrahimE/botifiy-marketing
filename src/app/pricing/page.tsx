'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Check, ArrowLeft, Building2,
  Sparkle, Rocket, TrendingUp, Gem, Users, MessagesSquare, Phone, Send, Database, FileUp, Bot, ClipboardCheck, MessageCircle, BrainCircuit, ShieldCheck
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { FaqSection } from "@/components/faq-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { trackViewPricing, trackClickSignup, trackClickPlan } from "@/lib/gtm"

// Badge component inline
const Badge = ({ children, className = "", variant = "default" }: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "secondary"
}) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
  const variantClasses = variant === "secondary"
    ? "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200"
    : "border-transparent bg-primary text-white hover:bg-primary/80"

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  )
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  
  // تتبع تحميل صفحة الأسعار
  useEffect(() => {
    try {
      const timeoutId = setTimeout(() => {
        trackViewPricing();
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
      };
      
    } catch {
      // Silent error handling
    }
  }, [])

  const plans = [
    {
      id: "free",
      name: "بداية ذكية",
      description: "جرب أدوات بوتيفاي من غير التزام. 50 رسالة شهريًا تكفيك تتأكد إن كل شيء شغال تمام.",
      price: 0,
      currency: "usd",
      period: "شهرياً",
      badge: null,
      link: "https://app.botifiy.com/auth",
      features: [
        "عدد الرسائل الشهري: 50 رسالة",
        "ربط رقم واتساب واحد",
        "إستكشاف كل المميزات المتاحة"
      ],
      ctaText: "جربها الان ببلاش",
      highlight: false,
      buttonVariant: "default" as const,
      buttonClassName: "text-white bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 rounded-xl",
      secondaryHighlight: false
    },
    {
      id: "launch",
      name: "مسار الإطلاق",
      description: "مثالية للبدايات الجادة: حملات، ردود تلقائية، تنظيم عملائك — بسهولة ومن غير تعقيد.",
      price: 10,
      currency: "usd",
      period: "شهرياً",
      badge: "الأكثر شهرة",
      monthlyLink: "https://wa.me/201098169094?text=مسار%20الاطلاق%20شهري",
      yearlyLink: "https://wa.me/201098169094?text=مسار%20الاطلاق%20سنوي",
      features: [
        "5٬000 رسالة / شهر",
        "ربط رقم واتساب واحد",
        "30 رد آلي - شات بوت",
        "حملات متزامنة: 1",
        "إدارة حتى 5٬000 جهة اتصال",
        //"قوالب الرسائل بالقوائم: 3",
        "قوالب الاستطلاعات: 3",
        "تخزين 200 ميغابايت",
        "رفع حتى 5 ميغابايت للملف"
      ],
      ctaText: "اشترك الآن",
      highlight: false,
      buttonVariant: "default" as const,
      buttonClassName: "text-white bg-purple-600 hover:bg-purple-700 border-2 border-purple-700 rounded-xl",
      secondaryHighlight: true
    },
    {
      id: "growth",
      name: "النمو المتسارع",
      description: "الأفضل لو جمهورك بدأ يكبر. دردشات لحظية، حملات متعددة، وتحليلات ذكية تساعدك تفهم جمهورك أكثر.",
      price: 20,
      currency: "usd",
      period: "شهرياً",
      badge: null,
      monthlyLink: "https://wa.me/201098169094?text=النمو%20المتسارع%20شهري",
      yearlyLink: "https://wa.me/201098169094?text=النمو%20المتسارع%20سنوي",
      features: [
        "30٬000 رسالة / شهر",
        "ربط حتى 2 رقم واتساب",
        "100 رد آلي - شات بوت",
        "حملات متزامنة: 2",
        "إدارة حتى 30٬000 جهة اتصال",
        //"قوالب الرسائل بالقوائم: 10",
        "قوالب الاستطلاعات: 10",
        "تخزين 300 ميغابايت",
        "رفع حتى 10 ميغابايت للملف",
        "تحليل المشاعر بالذكاء الاصطناعي"
      ],
      ctaText: "اشترك الآن",
      highlight: false,
      buttonVariant: "default" as const,
      buttonClassName: "text-white bg-orange-600 hover:bg-orange-700 border-2 border-orange-700 rounded-xl",
      secondaryHighlight: false
    },
    {
      id: "dominate",
      name: "الهيمنة الرقمية",
      description: "كل أدوات واتساب بحدود أكبر: أرقام متعددة، حملات اكثر٫ شات متطور، ذكاء صناعي، وتحكم كامل من لوحة واحدة.",
      price: 30,
      currency: "usd",
      period: "شهرياً",
      badge: "قيمة مقابل سعر",
      monthlyLink: "https://wa.me/201098169094?text=الهيمنة%20الرقمية%20شهري",
      yearlyLink: "https://wa.me/201098169094?text=الهيمنة%20الرقمية%20سنوي",
      features: [
        "100٬000 رسالة / شهر",
        "ربط حتى 4 أرقام واتساب",
        "300 رد آلي - شات بوت",
        "حملات متزامنة: 4",
        "إدارة حتى 100٬000 جهة اتصال",
        //"قوالب الرسائل بالقوائم: 25",
        "قوالب الاستطلاعات: 25",
        "تخزين 500 ميغابايت",
        "رفع حتى 10 ميغابايت للملف",
        "تحليل المشاعر بالذكاء الاصطناعي",
        "اللايف شات ( دردشة لحظية )"
      ],
      ctaText: "اشترك الآن",
      highlight: true,
      buttonVariant: "default" as const,
      buttonClassName: "text-white bg-[#60DE2E] hover:bg-[#50C625] border-2 border-[#50C625] rounded-xl",
      secondaryHighlight: false
    }
  ]

  const comparisonData = {
    headers: ["الميزة", "بداية ذكية", "مسار الاطلاق", "النمو المتسارع", "الهيمنة الرقمية"],
    rows: [
      ["مناسب لــ", "تجربة فقط", "البدايات", "التوسع", "المؤسسات"],
      ["الرسائل / شهر", "50", "5٬000", "30٬000", "100٬000"],
      ["ارقام الواتساب", "1", "1", "2", "4"],
      ["تشغيل أكثر من حملة معًا", "—", "1", "2", "4"],
      ["تخزين الملفات", "—", "200 ميغابايت", "300 ميغابايت", "500 ميغابايت"],
      ["حجم الملف المرفوع", "—", "5 ميغابايت", "10 ميغابايت", "10 ميغابايت"],
      ["الردود التلقائية الذكية", "—", "30", "100", "300"],
      //["قوائم تفاعلية للعملاء", "—", "3", "10", "25"],
      ["استطلاعات آراء العملاء", "—", "3", "10", "25"],
      ["تحليل ذكي لمشاعر العملاء", "—", "—", "✅", "✅"],
      ["اللايف شات ( دردشة لحظية )", "—", "—", "—", "✅"]
    ]
  }

  const planIcons: { [key: string]: React.ElementType } = {
    "بداية ذكية": Sparkle,
    "مسار الاطلاق": Rocket,
    "النمو المتسارع": TrendingUp,
    "الهيمنة الرقمية": Gem
  }

  const featureIcons: { [key: string]: React.ElementType } = {
    "مناسب لــ": Users,
    "الرسائل / شهر": MessagesSquare,
    "ارقام الواتساب": Phone,
    "تشغيل أكثر من حملة معًا": Send,
    "تخزين الملفات": Database,
    "حجم الملف المرفوع": FileUp,
    "الردود التلقائية الذكية": Bot,
    //"قوائم تفاعلية للعملاء": ClipboardList,
    "استطلاعات آراء العملاء": ClipboardCheck,
    "تحليل ذكي لمشاعر العملاء": BrainCircuit,
    "اللايف شات ( دردشة لحظية )": MessageCircle,
    "الميزة": ShieldCheck
  }

  const handleBillingPeriodChange = (newPeriod: 'monthly' | 'yearly') => {
    try {
      setBillingPeriod(newPeriod);
    } catch {
      // Silent error handling
    }
  };

  try {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-primary-light/20 via-white to-primary-light/80" dir="rtl">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary-light/20 via-white to-primary-light/80 py-24 pt-32">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6 leading-tight">
              <span className="text-primary">ابدأ مجاناً</span> وجرب أدوات واتساب المتقدمة بنفسك
              </h1>
              <p className="text-xl text-primary-dark/80 mb-6 max-w-3xl mx-auto">
                  سجل الآن وخد 50 رسالة كل شهر — جرب الشات بوت، أرسل حملات، اختبر الردود التلقائية … كل دا من غير بطاقة بنكية ولا التزام. لما تكون جاهز للتوسّع، اختار الخطة اللي تناسبك وانطلق!
              </p>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#4BC625] to-[#60DE2E] px-6 py-1.5 rounded-full shadow-sm mb-6 w-fit mx-auto">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 relative">
                    <Image src="/images/trusted1.png" alt="Trust logo 1" fill sizes="24px" className="rounded-full object-contain" />
                  </div>
                  <div className="w-6 h-6 relative">
                    <Image src="/images/trusted2.png" alt="Trust logo 2" fill sizes="24px" className="rounded-full object-contain" />
                  </div>
                  <div className="w-6 h-6 relative">
                    <Image src="/images/trusted3.png" alt="Trust logo 3" fill sizes="24px" className="rounded-full object-contain" />
                  </div>
                </div>
                <span className="text-sm text-white font-semibold">يثق بنا أكثر من 600 نشاط تجاري عربي</span>
              </div>

              {/* Apple-style Liquid Glass Billing Toggle */}
              <div className="relative flex items-center justify-center p-1 border-2 border-primary/20 rounded-xl mb-6 backdrop-blur-xl bg-gradient-to-r from-white/20 via-white/30 to-white/20 w-fit mx-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(96, 222, 46, 0.1) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
                <button
                  onClick={() => handleBillingPeriodChange('monthly')}
                  className={`relative z-10 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${billingPeriod === 'monthly'
                      ? 'bg-gradient-to-r from-primary via-primary to-primary/80 text-white'
                      : 'text-primary-dark/70 hover:text-primary hover:bg-white/20'
                    }`}
                  style={{
                    backdropFilter: billingPeriod === 'monthly' ? 'blur(10px)' : 'none',
                    WebkitBackdropFilter: billingPeriod === 'monthly' ? 'blur(10px)' : 'none'
                  }}
                >
                  شهري
                </button>
                <button
                  onClick={() => handleBillingPeriodChange('yearly')}
                  className={`relative z-10 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${billingPeriod === 'yearly'
                      ? 'bg-gradient-to-r from-primary via-primary to-primary/80 text-white'
                      : 'text-primary-dark/70 hover:text-primary hover:bg-white/20'
                    }`}
                  style={{
                    backdropFilter: billingPeriod === 'yearly' ? 'blur(10px)' : 'none',
                    WebkitBackdropFilter: billingPeriod === 'yearly' ? 'blur(10px)' : 'none'
                  }}
                >
                  سنوي <span className="text-xs opacity-90 font-bold">( خصم شهرين )</span>
                </button>
                {/* Liquid Glass Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-primary/5 opacity-60"></div>
                  <div className="absolute top-1 left-1 right-1 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl"></div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`flex flex-col relative ${
                      plan.highlight || plan.secondaryHighlight
                        ? `ring-2 ${plan.highlight ? 'ring-primary' : 'ring-purple-600'} bg-gradient-to-br from-white to-primary-light/10`
                        : 'bg-white'
                    }`}
                  >
                    {/* Badge في أعلى البطاقة */}
                    {(plan.highlight || plan.secondaryHighlight) && plan.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className={`${
                          plan.highlight ? 'bg-primary' : 'bg-purple-600'
                        } text-white hover:bg-[#56c829] px-4 py-1 text-sm font-medium`}>
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="p-8 text-right flex flex-col">
                      {/* Top section */}
                      <div>
                        <h3 className="text-2xl font-bold text-primary-dark mb-2">{plan.name}</h3>

                        {plan.price === 0 && plan.badge && (
                          <p className="text-primary-dark/80 text-sm mb-4">{plan.badge}</p>
                        )}

                        <p className="text-primary-dark/80 text-sm mb-6 min-h-[60px]">{plan.description}</p>

                        <div className="mb-6">
                          {plan.price === 0 ? (
                            <div className="text-4xl font-bold text-primary-dark">مجاناً</div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              {/* السعر الحالي */}
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary-dark">${billingPeriod === 'monthly' ? plan.price : Math.round(plan.price * 10 - 1)}</span>
                                <span className="text-primary-dark/80 text-lg">{billingPeriod === 'yearly' ? 'سنوياً' : 'شهرياً'}</span>
                              </div>

                              {/* السعر الأصلي وbadge التوفير في نفس الصف */}
                              {billingPeriod === 'yearly' && (
                                <>
                                  <span className="text-base text-gray-400 line-through font-medium">${plan.price * 12}</span>
                                  <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-bold whitespace-nowrap">وفّر ${plan.price * 2}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        <Button asChild className={`w-full py-5 text-lg font-medium ${plan.buttonClassName}`} variant={plan.buttonVariant}>
                          <Link 
                            href={plan.link || (billingPeriod === 'monthly' ? plan.monthlyLink : plan.yearlyLink) || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => {
                              try {
                                if (plan.id === 'free') {
                                  trackClickSignup(`plan-${plan.name}`)
                                } else {
                                  trackClickPlan(plan.name, billingPeriod, 'pricing_section')
                                }
                              } catch {
                                // Silent error handling
                              }
                            }}
                          >
                            {plan.ctaText}
                          </Link>
                        </Button>
                      </div>

                      {/* Features */}
                      <div className="border-t pt-6 mt-8">
                        <ul className="space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3 text-right">
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-primary-dark/80 text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Enterprise CTA */}
              <div className="mt-24 max-w-5xl mx-auto">
                  <Card
                      className="relative bg-gradient-to-br from-[#0B3404] via-[#0B3404]/95 to-black text-white rounded-3xl shadow-xl overflow-hidden"
                  >
                    <CardContent className="relative z-10 p-12">
                      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                          {/* Right side: Icon (for RTL) */}
                          <div className="flex-shrink-0">
                              <Building2 className="w-24 h-24 text-primary-light/40" />
                          </div>

                          {/* Left side: Text and Button (for RTL) */}
                          <div className="flex-grow text-center md:text-right">
                              <h2 className="text-4xl md:text-4xl font-bold mb-4 leading-relaxed">
                              ما لقيت الخطة المناسبة؟ <span className="text-primary">خلّينا نفصّلها على مقاسك</span>
                              </h2>
                              <p className="text-xl text-white/80 mb-4 max-w-3xl mx-auto md:mx-0">
                              لو عندك فريق كبير، احتياج خاص، أو حجم رسائل مختلف — نقدر نخصّص لك خطة تناسب طبيعة شغلك تمامًا ... خطط مرنة، أسعار مخصصة، ودعم مباشر من فريقنا.
                              </p>
                              <p className="text-base text-white/60 mb-8 max-w-3xl mx-auto md:mx-0">
                                  مثالية للمؤسسات، الوكالات، الفرق التسويقية، والمشاريع الضخمة اللي تحتاج أكثر من المعتاد.
                              </p>
                              <Button
                              size="lg"
                              className="bg-[#60DE2E] hover:bg-[#4BC625] text-[#0B3404] px-10 py-7 text-xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group"
                              asChild
                              >
                              <Link 
                                href="https://wa.me/201098169094" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-3"
                                onClick={() => {
                                  try {
                                    trackClickSignup('contact-sales');
                                  } catch {
                                    // Silent error handling
                                  }
                                }}
                              >
                                  تواصل مع المبيعات
                                  <ArrowLeft className="h-6 w-6" />
                              </Link>
                              </Button>
                          </div>
                      </div>
                    </CardContent>
                  </Card>
              </div>
          </div>
        </section>

        {/* Comparison Table */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
                    خططنا تكبر معك خطوة بخطوة
                  </h2>
                  <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
                     قارن المميزات، واختار الخطة اللي تناسب شغلك اليوم … وتقدر تطوّرها بكرا وانت مرتاح
                   </p>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border-2 border-primary-light/10 overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-primary-dark text-white">
                      <tr>
                        {comparisonData.headers.map((header, index) => {
                          const Icon = planIcons[header] || ShieldCheck;
                          const isLaunch = header === "مسار الاطلاق";
                          const isDominate = header === "الهيمنة الرقمية";
                          
                          return (
                            <th 
                              key={index} 
                              style={{ verticalAlign: 'top' }}
                              className={`px-6 py-4 text-lg font-bold relative
                                ${index === 0 
                                  ? 'bg-gray-50 text-primary-dark text-right border-r border-gray-200' 
                                  : 'text-center'
                                }
                                ${isLaunch ? 'border-t-4 border-purple-500' : ''}
                                ${isDominate ? 'border-t-4 border-primary' : ''}
                              `}
                            >
                              <div className="flex flex-col items-center justify-between h-full">
                                  <div className="h-[32px]">
                                      {isLaunch && (
                                          <div className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                                          مناسبة للبدايات الاحترافية
                                          </div>
                                      )}
                                  </div>
                                  <div className={`flex items-center gap-3 ${index === 0 ? 'justify-start w-full' : 'justify-center'}`}>
                                    <Icon className={`h-6 w-6 ${index > 0 ? 'text-gray-300' : 'text-primary'}`} />
                                    <span>{header}</span>
                                  </div>
                              </div>
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.rows.map((row, rowIndex) => (
                        <tr 
                          key={rowIndex} 
                          className={`transition-colors border-t border-gray-100
                            ${rowIndex % 2 === 1 ? 'bg-white' : 'bg-gray-50/80'}
                            hover:bg-primary-light/10
                          `}
                        >
                          {row.map((cell, cellIndex) => {
                            const FeatureIcon = featureIcons[row[0]];
                            const isCheckmark = cell === '✅';
                            return (
                              <td 
                                key={cellIndex} 
                                className={`px-6 py-5
                                  ${cellIndex === 0 
                                    ? 'font-bold text-primary-dark bg-gray-50 border-r border-gray-200' 
                                    : 'text-center text-gray-800'
                                  }
                                  ${rowIndex === 0 ? 'text-lg font-semibold bg-primary-light/20' : ''}
                                `}
                              >
                                {cellIndex === 0 ? (
                                  <div className="flex items-center gap-3">
                                    {FeatureIcon && <FeatureIcon className="h-5 w-5 text-primary" />}
                                    <span>{cell}</span>
                                  </div>
                                ) : isCheckmark ? (
                                  <div className="flex justify-center">
                                    <div className="w-7 h-7 flex items-center justify-center bg-[#60DE2E] rounded-full border-2 border-[#4BC625]">
                                      <Check className="h-5 w-5 text-primary-dark" />
                                    </div>
                                  </div>
                                ) : (
                                  cell || '—'
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50/80">
                      <tr className="border-t-2 border-gray-200">
                        <td className="px-6 py-5 bg-gray-50 border-r border-gray-200"></td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="px-6 py-5 text-center">
                            <Button asChild className={`w-full py-4 text-lg font-medium ${plan.buttonClassName}`} variant={plan.buttonVariant || 'default'}>
                              <Link 
                                href={plan.link || (billingPeriod === 'monthly' ? plan.monthlyLink : plan.yearlyLink) || '#'}
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={() => {
                                  try {
                                    if (plan.id === 'free') {
                                      trackClickSignup(`comparison-table-desktop-${plan.name}`)
                                    } else {
                                      trackClickPlan(plan.name, billingPeriod, 'comparison-table-desktop')
                                    }
                                  } catch {
                                    // Silent error handling
                                  }
                                }}
                              >
                                {plan.ctaText}
                              </Link>
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                {/* Mobile Cards */}
                <div className="grid grid-cols-1 gap-8 lg:hidden">
                  {plans.map((plan, planIndex) => {
                    const isLaunch = plan.name === "مسار الاطلاق";
                    const isDominate = plan.name === "الهيمنة الرقمية";
                    const Icon = planIcons[plan.name] || ShieldCheck;
                    
                    return (
                      <div 
                        key={plan.id} 
                        className={`bg-white rounded-2xl shadow-xl border-2 border-transparent
                          ${isLaunch ? '!border-purple-500' : ''}
                          ${isDominate ? '!border-primary' : ''}
                        `}
                      >
                        {/* Card Header */}
                        <div className={`p-6 rounded-t-xl
                          ${isLaunch ? 'bg-purple-500 text-white' : ''}
                          ${isDominate ? 'bg-primary text-white' : ''}
                          ${!isLaunch && !isDominate ? 'bg-primary-dark text-white' : ''}
                        `}>
                          {isLaunch && (
                            <div className="text-center mb-2">
                              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                                مناسبة للبدايات الاحترافية
                              </span>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="flex justify-center items-center gap-3 mb-2">
                              <Icon className="h-7 w-7" />
                              <h3 className="text-2xl font-bold">{plan.name}</h3>
                            </div>
                            <p className="text-lg font-semibold">{comparisonData.rows[0][planIndex + 1]}</p>
                          </div>
                        </div>
                        
                        {/* Card Body (Features) */}
                        <div className="p-6 space-y-4">
                          {comparisonData.rows.slice(1).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-between items-center text-sm pb-3 border-b border-gray-100">
                              <span className="font-bold text-primary-dark">{row[0]}</span>
                              {row[planIndex + 1] === '✅' ? (
                                  <div className="w-6 h-6 flex items-center justify-center bg-[#60DE2E] rounded-full border-2 border-[#4BC625]">
                                      <Check className="h-4 w-4 text-primary-dark" />
                                  </div>
                              ) : (
                                  <span className="text-gray-700 font-medium">{row[planIndex + 1] || '—'}</span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Card Footer (CTA) */}
                        <div className="p-6 bg-gray-50/80 rounded-b-xl">
                          <Button asChild className={`w-full text-xl font-medium py-4 ${plan.buttonClassName}`} variant={plan.buttonVariant || 'default'}>
                              <Link 
                                href={plan.link || (billingPeriod === 'monthly' ? plan.monthlyLink : plan.yearlyLink) || '#'}
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={() => {
                                  try {
                                    if (plan.id === 'free') {
                                      trackClickSignup(`comparison-table-mobile-${plan.name}`)
                                    } else {
                                      trackClickPlan(plan.name, billingPeriod, 'comparison-table-mobile')
                                    }
                                  } catch {
                                    // Silent error handling
                                  }
                                }}
                              >
                                {plan.ctaText}
                              </Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FaqSection />

          {/* Testimonials */}
          <TestimonialsSection />

          <CtaSection />
        </main>
        <Footer />
      </>
    )
  } catch {
    // عرض رسالة خطأ للمستخدم بدلاً من صفحة بيضاء
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ في تحميل صفحة الأسعار</h1>
          <p className="text-gray-600 mb-4">نعتذر عن هذا الخطأ. يرجى إعادة تحديث الصفحة أو المحاولة مرة أخرى لاحقاً.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            إعادة تحديث الصفحة
          </button>
        </div>
      </div>
    );
  }
} 