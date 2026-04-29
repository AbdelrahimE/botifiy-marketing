"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { VideoModal } from "@/components/video-modal"
import { Zap, Brain, TrendingUp } from "lucide-react"
import { trackClickSignup } from "@/lib/gtm"
import Image from "next/image"

export function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true)
  }

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0FFF4] via-white to-[#F8FFF9]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-snug" style={{ lineHeight: '1.2' }}>
            واتسابك هيبيع لوحده حتي وأنت نايم
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-6 leading-relaxed">
            منصة بوتيفاي تحول واتسابك لآلة بيع ذكية تشتغل 24 ساعة
            <br />
            ترد على العملاء ، تتابعهم ، وتقفل الصفقات ... من غير ما تتدخل!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a
              href="https://app.botifiy.com/auth"
              className="bg-[#60DE2E] hover:bg-[#4BC625] text-primary-dark px-6 py-3 text-xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
              onClick={() => trackClickSignup('hero-section')}
            >
              <span className="relative z-10">سجل وجرب الآن ببلاش</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#60DE2E] to-[#4BC625] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <Button
              onClick={handleOpenVideoModal}
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-white text-[#4BC625] px-6 py-6 text-xl font-bold border-2 border-[#4BC625] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-102 hover:-translate-y-1 relative overflow-hidden group"
            >
              شاهد كيف تشتغل المنصة
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-text-secondary font-medium">اتمتة كاملة للردود و المتابعة</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <span className="text-text-secondary font-medium">ذكاء اصطناعي يفهم نية عميلك</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-text-secondary font-medium">مبيعاتك تزيد أكتر وانت مرتاح</span>
            </div>
          </div>

          {/* Dashboard Screenshot Section */}
          <div className="mt-0">
            {/* Dashboard Image with Caption */}
            <div className="flex justify-center">
              <div className="max-w-4xl w-full">
                <Image
                  src="/images/hero-section.png"
                  alt="لقطة شاشة من داخل منصة بوتيفاي - واجهة المستخدم الرئيسية"
                  width={960}
                  height={540}
                  className="w-full h-auto max-w-[960px] mx-auto shadow-lg shadow-[#60DE2E]/30 rounded-xl border-2 border-[#60DE2E] drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        videoId="x5c_wt4Mln0"
      />
    </section>
  )
}