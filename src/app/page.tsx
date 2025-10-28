'use client';

import { useEffect } from "react";
import Script from "next/script";
import { trackViewHome } from "@/lib/gtm";
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ToolsSection } from "@/components/tools-section"
import { CampaignsSection } from "@/components/campaigns-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { SentimentSection } from "@/components/sentiment-section"

import { DashboardSection } from "@/components/dashboard-section"
import { FreeTrialSection } from "@/components/free-trial-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  useEffect(() => {
    trackViewHome();
  }, []);

  return (
    <>
      {/* SoftwareApplication Schema - Structured Data */}
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'بوتيفاي',
            alternateName: 'Botifiy',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'ابدأ مجاناً بـ 50 رسالة شهرياً'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '600',
              bestRating: '5',
              worstRating: '1'
            },
            description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي. كل أدوات واتساب اللي تحتاجها لإدارة شغلك بذكاء في مكان واحد.',
            url: 'https://botifiy.com',
            screenshot: 'https://botifiy.com/images/hero-section.png',
            featureList: [
              'أتمتة واتساب الذكية',
              'شات بوت متقدم بالذكاء الاصطناعي',
              'إدارة حملات واتساب',
              'تحليل المشاعر بالذكاء الاصطناعي',
              'دردشة لحظية (Live Chat)',
              'إدارة جهات الاتصال',
              'ردود تلقائية ذكية',
              'استطلاعات آراء العملاء',
              'تحليلات وإحصائيات متقدمة'
            ],
            author: {
              '@type': 'Organization',
              name: 'بوتيفاي',
              url: 'https://botifiy.com'
            },
            publisher: {
              '@type': 'Organization',
              name: 'بوتيفاي',
              url: 'https://botifiy.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://botifiy.com/botifiy-social.png'
              }
            }
          })
        }}
      />

      <Header />
      <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CampaignsSection />
      <ChatbotSection />
      <ToolsSection />
      <SentimentSection />
      <DashboardSection />
      <FreeTrialSection />
      <CtaSection />
      <Footer />
      </main>
    </>
  )
} 