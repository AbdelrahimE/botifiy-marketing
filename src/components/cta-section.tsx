"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { trackClickSignup } from "@/lib/gtm"

export function CtaSection() {
  return (
    <section className="pt-12 pb-24 bg-gradient-to-br from-white via-primary/5 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
            جاهز تبدأ؟
          </h2>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            انضم لآلاف الشركات اللي بتستخدم بوتيفاي لإدارة واتساب البيزنس بشكل احترافي
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-[#60DE2E] hover:bg-[#4BC625] text-white px-6 py-7 text-2xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
            >
              <a 
                href="https://app.botifiy.com/auth"
                onClick={() => trackClickSignup('cta-section')}
              >
                <span>ابدأ تجربتك المجانية الآن</span>
                <ArrowLeft className="w-6 h-6" />
              </a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">تجربة مجانية مدى الحياة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">إعداد في أقل من دقيقة</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm">دعم عربي متكامل</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 