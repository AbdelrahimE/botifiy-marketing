"use client"

import { Gift, CreditCard, Clock, Shield, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackClickSignup } from "@/lib/gtm"

export function FreeTrialSection() {
  const benefits = [
    {
      icon: <Gift className="w-6 h-6 text-white" />,
      title: "50 رسالة/شهر",
      description: "مجاناً مدى الحياة"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      title: "بدون فيزا",
      description: "لا نحتاج بيانات دفع"
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "بدون دفع مقدم",
      description: "ابدأ فوراً"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "بدون التزام",
      description: "يمكنك الإلغاء أي وقت"
    }
  ]

  return (
    <section id="signup" className="py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            عرض محدود
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            جرّبها ببلاش
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            سجّل اليوم وخد تجربة مجانية مدى الحياة بـ 50 رسالة/شهر.
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-3">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">
                  {benefit.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="relative flex justify-center mb-6">
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-110 animate-pulse"></div>
            
            <Button 
              asChild
              size="lg" 
              className="relative bg-white text-primary-dark hover:bg-white/95 px-6 py-7 text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-2 rounded-2xl border-4 border-white/20 group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 60px rgba(255, 255, 255, 0.4)',
              }}
            >
              <a 
                href="https://app.botifiy.com/auth"
                onClick={() => trackClickSignup('free-trial-section')}
              >
                {/* Sparkle effect */}
                <div className="absolute top-2 right-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                
                <span className="relative z-10 mr-3">سجّل وجرب الآن مجاناً</span>
                <ArrowLeft className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </div>
          
          <p className="text-white/80 text-sm mt-6">
            👈 بدون فيزا – بدون دفع مقدم – بدون التزام
          </p>
        </div>
      </div>
    </section>
  )
} 