"use client"

import { Bot, Zap, Layers, Clock, Users, TrendingUp, MessageCircle, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { trackClickSignup } from "@/lib/gtm"

export function ChatbotSection() {
  const features = [
    {
      icon: <Zap className="w-4 h-4 text-primary" />,
      title: "ردود تلقائية بالكلمات المفتاحية",
      description: "تجاوب فوري مع أسئلة العملاء الشائعة زي السعر – الدفع – التوصيل"
    },
    {
      icon: <Layers className="w-4 h-4 text-primary" />,
      title: "ردود ذكية ومتنوعة",
      description: "نصوص – صور – ملفات – قوائم تفاعلية – استطلاعات رأي"
    },
    {
      icon: <Clock className="w-4 h-4 text-primary" />,
      title: "يشتغل لحاله 24/7",
      description: "حتى وانت نايم… هو بيرد ويخدّم عملاءك"
    },
    {
      icon: <Users className="w-4 h-4 text-primary" />,
      title: "يقلل الضغط على فريقك",
      description: "وفّر وقت ومجهود الدعم … وركّز على المبيعات"
    }
  ]

  const floatingIcons = [
    { icon: MessageCircle, className: "left-[10%] top-[20%] w-16 h-16 text-primary/20", style: { animationDuration: '10s' } },
    { icon: Smile, className: "left-[30%] top-[50%] w-12 h-12 text-primary/25", style: { animationDuration: '8s', animationDelay: '2s' } },
    { icon: Bot, className: "left-[50%] top-[10%] w-20 h-20 text-primary/15", style: { animationDuration: '13s', animationDelay: '1s' } },
    { icon: Zap, className: "right-[30%] top-[30%] w-14 h-14 text-primary/20", style: { animationDuration: '9s', animationDelay: '3s' } },
    { icon: MessageCircle, className: "right-[10%] top-[60%] w-10 h-10 text-primary/30", style: { animationDuration: '7s', animationDelay: '0.5s' } },
  ];

  return (
    <>
      <style>
        {`
          @keyframes float-subtle {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(8deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float-subtle {
            animation: float-subtle ease-in-out infinite;
          }
        `}
      </style>
      <section className="relative bg-gradient-to-b from-primary/8 via-green-50/50 to-primary/5">
        
        {/* Floating Separator Icons */}
        <div className="absolute -top-10 left-0 right-0 h-24 z-[5] pointer-events-none">
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

        {/* Background Effects - مختلفة عن قسم الحملات */}
        <div className="absolute inset-0">
          <div className="absolute top-16 right-16 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-16 left-16 w-96 h-96 bg-green-200/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
          <div className="absolute top-1/2 right-1/3 transform translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-3xl"></div>
          
          {/* Floating particles - أحجام وأماكن مختلفة */}
          <div className="absolute top-24 right-1/3 w-2 h-2 bg-primary/15 rounded-full animate-bounce delay-200"></div>
          <div className="absolute bottom-24 left-1/3 w-4 h-4 bg-green-300/20 rounded-full animate-bounce delay-800"></div>
          <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-primary/12 rounded-full animate-bounce delay-600"></div>
          <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-green-200/15 rounded-full animate-bounce delay-1200"></div>
          <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-primary/18 rounded-full animate-bounce delay-400"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 py-20">
          <div className="max-w-container mx-auto px-6">
            
            {/* 1. العنوان والنص التمهيدي (Top Section) */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.12) 0%, rgba(96, 222, 46, 0.06) 100%)',
                    border: '1px solid rgba(96, 222, 46, 0.2)',
                    boxShadow: '0 4px 16px rgba(96, 222, 46, 0.08)',
                  }}
                >
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-text-primary" style={{lineHeight:'1.2',letterSpacing:'0.01em'}}>
                  شات بوت ذكي — يرد مكانك 24/7
                </h2>
              </div>
              <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
                بعد ما تبعت آلاف الرسائل… العملاء هيبدأوا يردّوا، وهنا بيجي دور أقوى شات بوت تلقائي على واتساب.<br/>
                خلّيه يرد عنك من أول &quot;كم السعر؟&quot; لحد &quot;تم الدفع&quot;، بدون تدخل منك، وبدون تأخير.
              </p>
            </div>
            
            {/* 2. محتوى المزايا + الصورة (Middle Section) - عكس قسم الحملات */}
            <div 
              className="relative mb-10 p-8 md:p-12 rounded-3xl border shadow-xl backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.04) 0%, rgba(255, 255, 255, 0.3) 30%, rgba(249, 255, 245, 0.15) 70%, rgba(96, 222, 46, 0.06) 100%)',
                border: '1px solid rgba(96, 222, 46, 0.15)',
                backdropFilter: 'blur(25px) saturate(150%)',
                WebkitBackdropFilter: 'blur(25px) saturate(150%)',
                boxShadow: `
                  0 6px 28px rgba(96, 222, 46, 0.08),
                  0 0 0 1px rgba(255, 255, 255, 0.15) inset,
                  0 2px 0 rgba(255, 255, 255, 0.2) inset,
                  0 -1px 0 rgba(96, 222, 46, 0.08) inset
                `,
              }}
            >
              {/* Glass reflection effects - أكثر نعومة */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)',
                    filter: 'blur(1px)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-0 bottom-0 w-2"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 40%, rgba(96, 222, 46, 0.1) 100%)',
                    filter: 'blur(1px)'
                  }}
                ></div>
                <div 
                  className="absolute top-6 left-6 w-40 h-40 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 222, 46, 0.08) 0%, transparent 60%)',
                    filter: 'blur(8px)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-6 right-6 w-28 h-28 rounded-full opacity-15"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, transparent 70%)',
                    filter: 'blur(6px)'
                  }}
                ></div>
              </div>
              
              <div className="relative grid lg:grid-cols-5 gap-8 items-center z-10">
                
                {/* العمود الأيمن - الصورة (تم تحويلها لليمين) - تظهر أولاً في الهواتف */}
                <div className="lg:order-2 lg:col-span-3 relative">
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105"
                    style={{
                      background: 'transparent',
                      border: '2px solid rgba(96, 222, 46, 0.8)',
                      boxShadow: '0 6px 28px rgba(96, 222, 46, 0.15), 0 0 0 1px rgba(96, 222, 46, 0.1)',
                    }}
                  >
                    <Image
                      src="/images/chatbot-section.png"
                      alt="واجهة الشات بوت الذكي على واتساب"
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
                      background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.92) 0%, rgba(11, 52, 4, 0.85) 100%)',
                    }}
                  >
                    شات بوت ذكي
                  </div>
                </div>

                {/* العمود الأيسر - النقاط التوضيحية (تم تحويلها لليسار) - تظهر ثانياً في الهواتف */}
                <div className="lg:order-1 lg:col-span-2 space-y-4">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-primary/8 backdrop-blur-sm text-primary-dark px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                      <MessageCircle className="w-4 h-4 animate-pulse" />
                      <span>أهم الفوائد في لحظة</span>
                    </div>
                  </div>
                  
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.12) 0%, rgba(96, 222, 46, 0.06) 100%)',
                          border: '1px solid rgba(96, 222, 46, 0.25)',
                          boxShadow: '0 3px 12px rgba(96, 222, 46, 0.08)',
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
            
            {/* 3. النتيجة + زر CTA (Bottom Section) */}
            <div className="space-y-6">
              
              {/* مربع النتيجة */}
              <div 
                className="p-4 rounded-xl border transition-all duration-300 hover:shadow-xl w-fit mx-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.06) 0%, rgba(96, 222, 46, 0.02) 100%)',
                  border: '1px solid rgba(96, 222, 46, 0.2)',
                  boxShadow: '0 6px 20px rgba(96, 222, 46, 0.08)',
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.08) 100%)',
                      border: '1px solid rgba(96, 222, 46, 0.3)',
                    }}
                  >
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-center max-w-2xl">
                    <h3 className="text-xl font-bold text-text-primary text-right mb-1">
                      النتيجة؟
                    </h3>
                    <p className="text-text-secondary text-base leading-relaxed">
                      عملاءك مبسوطين … وفريقك مرتاح … وانت تكسب وقتك ومبيعاتك.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* زر CTA */}
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-[#60DE2E] hover:bg-[#4BC625] text-white px-6 py-7 text-2xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #60DE2E 0%, #4CB922 100%)',
                      boxShadow: '0 8px 24px rgba(96, 222, 46, 0.25)',
                    }}
                  >
                    <a 
                      href="https://app.botifiy.com/auth"
                      onClick={() => trackClickSignup('chatbot-section')}
                    >
                      <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                      جرّبه مجانًا الآن
                    </a>
                  </Button>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>
    </>
  )
} 