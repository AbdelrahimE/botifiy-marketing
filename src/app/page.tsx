'use client';

import { useEffect } from "react";
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
      <Header />
      <main className="min-h-screen" dir="rtl">
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