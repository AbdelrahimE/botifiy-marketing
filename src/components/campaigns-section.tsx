"use client"

import { Send, Shield, BarChart3, Brain, Clock, Layers, CheckCircle, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { trackClickSignup } from "@/lib/gtm"

export function CampaignsSection() {
  const features = [
    {
      icon: <Send className="w-4 h-4 text-primary" />,
      title: "إرسال سريع وموثوق",
      description: "يتم كل شيء تلقائيًا بدون تدخل يدوي أو أخطاء"
    },
    {
      icon: <BarChart3 className="w-4 h-4 text-primary" />,
      title: "متابعة لحظية",
      description: "راقب أداء الحملة لحظة بلحظة (إرسال، تسليم، قراءة، فشل)"
    },
    {
      icon: <Brain className="w-4 h-4 text-primary" />,
      title: "رسائل مخصصة تلقائيًا",
      description: "أدرج اسم العميل، العرض، أو المدينة في كل رسالة"
    },
    {
      icon: <Clock className="w-4 h-4 text-primary" />,
      title: "تحكم كامل بالوقت",
      description: "حدّد أوقات الإرسال حسب ساعات عملك أو تفضيلك"
    },
    {
      icon: <Layers className="w-4 h-4 text-primary" />,
      title: "أنواع متعددة من الرسائل",
      description: "نصوص، وسائط، قوائم تفاعلية، واستطلاعات رأي"
    },
    {
      icon: <Shield className="w-4 h-4 text-primary" />,
      title: "حماية ذكية من الحظر",
      description: "توزيع تلقائي على عدة أرقام، فترات إرسال مرنة، وجدولة متقدمة"
    }
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark/5 via-[#F9FFF5] to-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-300/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-green-300/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-primary/15 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-green-300/25 rounded-full animate-bounce delay-1000"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 py-20">
        <div className="max-w-container mx-auto px-6">
          
          {/* 1. العنوان والنص التمهيدي (Top Section) */}
          <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6" style={{lineHeight:'1.2',letterSpacing:'0.01em'}}>أرسل آلاف الرسائل عبر واتساب باحتراف — خلال دقائق وبأقصى درجات الحماية من الحظر</h2>
            <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              نظام ذكي ومتطور لإدارة حملات واتساب الجماعية بدقة وسرعة وجدولة مرنة — مثالي للشركات والأنشطة التجارية اللي تحتاج توصل لأكثر من 10,000 عميل بسهولة وبدون تعقيد.
            </p>
          </div>
          
          {/* 2. محتوى المزايا + الصورة (Middle Section) */}
          <div 
            className="relative mb-10 p-8 md:p-12 rounded-3xl border shadow-2xl backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 255, 245, 0.25) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(249, 255, 245, 0.20) 100%)',
              border: '1px solid rgba(96, 222, 46, 0.15)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: `
                0 8px 32px rgba(96, 222, 46, 0.1),
                0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                0 1px 0 rgba(255, 255, 255, 0.3) inset,
                0 -1px 0 rgba(96, 222, 46, 0.1) inset
              `,
            }}
          >
            {/* Glass reflection effects */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              {/* Top highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)'
                }}
              ></div>
              {/* Left highlight */}
              <div 
                className="absolute top-0 left-0 bottom-0 w-px"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(96, 222, 46, 0.2) 100%)'
                }}
              ></div>
              {/* Subtle inner glow */}
              <div 
                className="absolute top-4 left-4 w-32 h-32 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(96, 222, 46, 0.15) 0%, transparent 70%)'
                }}
              ></div>
              {/* Bottom right accent */}
              <div 
                className="absolute bottom-4 right-4 w-24 h-24 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)'
                }}
              ></div>
            </div>
            
            <div className="relative grid lg:grid-cols-5 gap-8 items-center z-10">
              
              {/* العمود الأيسر - الصورة (تم تكبيرها) */}
              <div className="lg:order-1 lg:col-span-3 relative">
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    background: 'transparent',
                    border: '2px solid #60DE2E',
                    boxShadow: '0 8px 32px rgba(96, 222, 46, 0.2), 0 0 0 1px rgba(96, 222, 46, 0.1)',
                  }}
                >
                  <Image
                    src="/images/campaigns-section.png"
                    alt="واجهة إدارة الحملات الجماعية عبر واتساب"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                    style={{
                      borderRadius: '8px',
                    }}
                  />
                </div>
                
                {/* Floating badge */}
                <div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg z-20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.95) 0%, rgba(96, 222, 46, 0.8) 100%)',
                  }}
                >
                  واجهة إدارة الحملات
                </div>
              </div>
              
              {/* العمود الأيمن - النقاط التوضيحية (تم تقليل المساحة) */}
              <div className="lg:order-2 lg:col-span-2 space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div 
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.08) 100%)',
                        border: '1px solid rgba(96, 222, 46, 0.25)',
                        boxShadow: '0 4px 12px rgba(96, 222, 46, 0.1)',
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base text-text-primary mb-1 group-hover:text-primary transition-colors duration-300">
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
          
          {/* 3. مربع الحماية + جملة التحفيز + زر CTA (Bottom Section) */}
          <div className="space-y-6">
            
            {/* مربع نظام الحماية */}
            <div 
              className="p-4 rounded-xl border transition-all duration-300 hover:shadow-xl w-fit mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.08) 0%, rgba(96, 222, 46, 0.03) 100%)',
                border: '1px solid rgba(96, 222, 46, 0.2)',
                boxShadow: '0 8px 24px rgba(96, 222, 46, 0.1)',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.2) 0%, rgba(96, 222, 46, 0.1) 100%)',
                    border: '1px solid rgba(96, 222, 46, 0.3)',
                  }}
                >
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center max-w-2xl">
                  <h3 className="text-lg font-bold text-text-primary text-right mb-1">
                    تم تطوير نظام حماية متقدم لتقليل احتمالية الحظر قدر الإمكان
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed text-right">
                    من خلال توزيع الارسال الذكي بين الارقام، الجدولة الذكية، والمرونة الكاملة.
                  </p>
                </div>
              </div>
            </div>
            
            {/* جملة التحفيز + زر CTA */}
            <div className="text-center space-y-6">
              <p className="text-xl font-bold text-text-primary max-w-3xl mx-auto leading-relaxed">
              جرّبها ببلاش، وابدأ أول حملة خلال أقل من 5 دقائق!
              </p>
              
              <div className="flex justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#60DE2E] hover:bg-[#4BC625] text-white px-6 py-7 text-2xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #60DE2E 0%, #4CB922 100%)',
                  boxShadow: '0 8px 24px rgba(96, 222, 46, 0.3)',
                }}
              >
                  <a 
                    href="https://app.botifiy.com/auth"
                    onClick={() => trackClickSignup('campaigns-section')}
                  >
                    <Unlock className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    سجّل وجرب الآن
                  </a>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}