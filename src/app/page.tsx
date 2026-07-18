'use client';

import { useEffect } from "react";
import Script from "next/script";
import { trackViewHome } from "@/lib/gtm";
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoVideoSection } from "@/components/demo-video-section"
import { ProblemSection } from "@/components/problem-section"
import { CustomerJourneySection } from "@/components/customer-journey-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { BusinessBenefitsSection } from "@/components/business-benefits-section"
import { TrustProofSection } from "@/components/trust-proof-section"
import { FaqSection } from "@/components/faq-section"
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
            screenshot: 'https://botifiy.com/images/hero-section.webp',
            featureList: [
              'أتمتة واتساب الذكية',
              'إدارة جهات الاتصال',
              'ردود تلقائية ذكية',
              'استطلاعات آراء العملاء'
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
        <DemoVideoSection />
        <ProblemSection />
        <CustomerJourneySection />
        <UseCasesSection />
        <BusinessBenefitsSection />
        <TrustProofSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  )
} 
