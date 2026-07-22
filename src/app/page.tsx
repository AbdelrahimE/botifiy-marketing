import { Header } from "@/components/header"
import { HomeViewTracker } from "@/components/home-view-tracker"
import { RevealObserver } from "@/components/reveal-observer"
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
  return (
    <>
      {/* SoftwareApplication Schema - Structured Data */}
      <script
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
              price: '10',
              priceCurrency: 'USD',
              url: 'https://botifiy.com/#pricing',
              description: 'تبدأ خطط بوتيفاي من 10 دولارات شهريًا'
            },
            description: 'رد تلقائي على واتساب مع تصنيف العملاء ومتابعتهم تلقائيًا لتحويل المحادثات إلى مبيعات.',
            url: 'https://botifiy.com',
            screenshot: 'https://botifiy.com/images/hero-section.webp',
            featureList: [
              'رد تلقائي على واتساب',
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
                url: 'https://botifiy.com/images/botifiy-logo-ar.png'
              }
            }
          })
        }}
      />

      <HomeViewTracker />
      <RevealObserver />

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
