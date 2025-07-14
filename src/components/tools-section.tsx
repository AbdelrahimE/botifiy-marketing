"use client"

import { Users, CheckSquare, Tag, Activity, Smile, Bot, MessageCircle } from "lucide-react"
import Image from "next/image"
import { trackClickSignup } from "@/lib/gtm"

export function ToolsSection() {
  const features = [
    { icon: <Users className="w-5 h-5 text-primary" />, text: "إدارة عدة أرقام من مكان واحد" },
    { icon: <CheckSquare className="w-5 h-5 text-primary" />, text: "تعيين وكيل لكل محادثة بسهولة" },
    { icon: <Tag className="w-5 h-5 text-primary" />, text: "فرز حسب الأولوية: عاجلة، مهمة، عادية" },
    { icon: <Activity className="w-5 h-5 text-primary" />, text: "تتبع الحالة: نشطة، معلّقة، مغلقة" },
    { icon: <Smile className="w-5 h-5 text-primary" />, text: "واجهة سهلة تقلل وقت تدريب الموظفين" },
  ]

  return (
    <section 
      dir="rtl"
      className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0B3404] via-[#0f2d0a] to-[#0B3404] text-white"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl opacity-50"
        ></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 border border-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 border border-green-300/15 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6">
        
        {/* Centered Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-x-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight bg-clip-text bg-gradient-to-r from-white to-gray-300">
              كل محادثاتك … <span className="text-primary">مرتّبة وتحت السيطرة</span>
            </h2>
          </div>
          <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            هل فريقك تائه بين المحادثات؟
            مع لايف شات بوتيفاي، تتابع وتدير كل شيء لحظيًا من لوحة تحكم واحدة.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
          
          {/* Left Column: Image */}
          <div className="relative group order-last lg:order-first">
            <div 
              className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700"
            ></div>
            <div 
              className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                border: '1px solid rgba(96, 222, 46, 0.2)',
              }}
            >
              <Image
                src="/images/tools-section.png"
                alt="واجهة لايف شات بوتيفاي لإدارة المحادثات"
                width={1200}
                height={800}
                className="w-full h-auto z-100"
                style={{
                  borderRadius: '15px',
                }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              ></div>
            </div>
            <div 
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(96, 222, 46, 0.5) 0%, transparent 70%)'
              }}
            ></div>
             <div 
              className="absolute -top-6 -right-6 w-20 h-20 text-primary opacity-10"
            >
              <Bot className="w-full h-full" />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {feature.icon}
                </div>
                <span className="text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Centered CTA Block */}
        <div className="text-center space-y-8">
          <div 
            className="inline-block rounded-full px-8 py-4 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(96, 222, 46, 0.2)',
            }}
          >
            <p className="text-lg font-semibold text-white">
            ترتيب + أتمتة = سيطرة كاملة، بدون فوضى ولا رسائل ضايعة
            </p>
          </div>

            <div className="text-center mt-12">
            <a 
              href="https://app.botifiy.com/auth" 
              className="w-fit mx-auto bg-[#60DE2E] hover:bg-[#4BC625] text-[#0B3404] px-8 py-3 text-2xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
              onClick={() => trackClickSignup('live-chat-section')}
            >
                <span>ابدأ تنظيم محادثاتك الآن</span>
              </a>
            </div>
        </div>
      </div>
    </section>
  )
}