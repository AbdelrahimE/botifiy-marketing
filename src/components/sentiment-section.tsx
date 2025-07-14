"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChartBig, CalendarClock, UsersRound, BrainCircuit, Brain, Smile, Frown, Meh, Search } from "lucide-react";
import { trackClickSignup } from "@/lib/gtm"

const features = [
  {
    icon: <UsersRound className="w-4 h-4 text-primary" />,
    title: "تعرف على العملاء اللي مو راضين بسرعة",
    description: "يرتب لك العملاء تلقائياً حسب مشاعرهم السلبية، عشان تقدر تتصرف قبل ما يصير عندك خسائر.",
  },
  {
    icon: <BarChartBig className="w-4 h-4 text-primary" />,
    title: "تقيس رضا العملاء بالأرقام",
    description: "يحلل كل رسالة ويصنفها: إيجابي، سلبي، محايد – ويعطيك معها درجة الثقة.",
  },
  {
    icon: <CalendarClock className="w-4 h-4 text-primary" />,
    title: "تتابع التغيرات بشكل أسبوعي",
    description: "تشوف إذا تحسّن رضا العملاء مع الوقت أو لا، عن طريق مخططات سهلة وواضحة.",
  },
  {
    icon: <BrainCircuit className="w-4 h-4 text-primary" />,
    title: "تاخذ قرارات ذكية وسريعة",
    description: "بدل ما تعتمد على الإحساس أو الحدس … اعتمد على بيانات حقيقية تخليك تطوّر خدماتك وفريقك بثقة.",
  }
];

const floatingIcons = [
    { icon: Smile, className: "left-[10%] top-[20%] w-14 h-14 text-primary/20", style: { animationDuration: '5s' } },
    { icon: Frown, className: "right-[10%] top-[30%] w-14 h-14 text-primary/20", style: { animationDuration: '5s', animationDelay: '1s' } },
    { icon: Meh, className: "left-[45%] top-[50%] w-14 h-14 text-primary/20", style: { animationDuration: '5s', animationDelay: '2s' } },
    { icon: BarChartBig, className: "right-[15%] bottom-[20%] w-14 h-14 text-primary/20", style: { animationDuration: '8s', animationDelay: '3s' } },
    { icon: BrainCircuit, className: "left-[10%] bottom-[15%] w-14 h-14 text-primary/20", style: { animationDuration: '8s', animationDelay: '3s' } },
    { icon: Search, className: "left-[50%] top-[10%] w-14 h-14 text-primary/20", style: { animationDuration: '8s' } },
];

export function SentimentSection() {
  return (
    <>
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-25deg); }
            100% { transform: translateX(250%) skewX(-25deg); }
          }
          @keyframes float-subtle {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float-subtle {
            animation: float-subtle ease-in-out infinite;
          }
        `}
      </style>
      <section dir="rtl" className="relative bg-gradient-to-b from-primary/5 via-white to-primary/5 py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          {/* Floating Icons */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            {floatingIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <Icon
                  key={index}
                  className={`absolute animate-float-subtle ${item.className}`}
                  style={item.style}
                />
              )
            })}
          </div>

          <div className="relative z-10 max-w-container mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.1) 0%, rgba(96, 222, 46, 0.05) 100%)',
                    border: '1px solid rgba(96, 222, 46, 0.15)',
                  }}
                >
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
                  افهم عملاءك بذكاء - وخذ قراراتك بثقة
                </h2>
              </div>
              <p className="text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                بعد ما رتبت محادثاتك، صار وقت تعرف بالضبط وش يحس فيه عملاؤك. قسم تحليل المشاعر في بوتيفاي يستخدم نموذج ذكاء اصطناعي متقدم لتحليل كل رسالة واتساب بدقة عالية، ويعطيك نظرة واضحة عن رضا العملاء ومشاعرهم، وكل هذا… من غير أي شغل يدوي.
              </p>
            </div>

            {/* Main Content Box */}
            <div 
              className="relative mb-12 p-8 md:p-12 rounded-3xl border shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(249, 255, 245, 0.2) 70%, rgba(96, 222, 46, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(25px) saturate(180%)',
                WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                boxShadow: '0 8px 32px 0 rgba(96, 222, 46, 0.1)'
              }}
            >
              {/* Glass reflection effects */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute top-0 left-0 right-0 h-2 opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                    filter: 'blur(2px)'
                  }}
                ></div>
                <div 
                  className="absolute top-8 right-8 w-40 h-40 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 222, 46, 0.2) 0%, transparent 70%)',
                    filter: 'blur(10px)'
                  }}
                ></div>
              </div>

              <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
                
                {/* Static Image - Appears first on mobile */}
                <div className="lg:col-span-3 relative lg:order-2">
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105"
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(96, 222, 46, 0.8)',
                      boxShadow: '0 6px 28px rgba(96, 222, 46, 0.15), 0 0 0 1px rgba(96, 222, 46, 0.1)',
                    }}
                  >
                    <Image
                      src="/images/sentiment-section-1.png"
                      alt="تحليل شامل للمشاعر"
                      width={800}
                      height={500}
                      className="w-full h-full object-contain"
                      style={{
                        borderRadius: '14px',
                      }}
                    />
                  </div>
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg z-20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.92) 0%, #0B3404 100%)',
                    }}
                  >
                    تحليل المشاعر الذكي
                  </div>
                </div>

                {/* Features List - Appears second on mobile */}
                <div className="lg:col-span-2 space-y-4 lg:order-1">
                   <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary/8 text-primary-dark px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                        <Smile className="w-4 h-4 animate-pulse" />
                        <span>وش تستفيد؟</span>
                      </div>
                    </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-text-primary mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            
            {/* CTA Section */}
            <div className="text-center space-y-8">
              <Button
                  className="text-white border-2 border-[#4BC625] text-2xl font-bold px-6 py-7 rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden mx-auto"
                  style={{
                    background: 'linear-gradient(135deg, #60DE2E 0%, #4CB922 100%)',
                    boxShadow: '0 8px 24px rgba(96, 222, 46, 0.3)',
                  }}
                >
                  <a 
                    href="https://app.botifiy.com/auth"
                    onClick={() => trackClickSignup('sentiment-section')}
                  >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                    <span className="relative">سجّل الآن وجرّب المنصة بنفسك</span>
                  </a>
              </Button>
            </div>
          </div>
      </section>
    </>
  )
} 