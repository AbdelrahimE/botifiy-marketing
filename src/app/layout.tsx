import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { PrivacyControls } from '@/components/privacy-controls'
import { TrackingManager } from '@/components/tracking-manager'
import './globals.css'

const theYearOfHandicrafts = localFont({
  src: [
    {
      path: '../../TheYearofHandicrafts/TheYearofHandicrafts-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../TheYearofHandicrafts/TheYearofHandicrafts-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../TheYearofHandicrafts/TheYearofHandicrafts-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-the-year-of-handicrafts',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://botifiy.com'),
  title: 'رد تلقائي على واتساب ومتابعة العملاء | بوتيفاي',
  description: 'بوتيفاي يوفر ردًا تلقائيًا على واتساب، مع تصنيف العملاء ومتابعتهم تلقائيًا لتحويل المحادثات إلى مبيعات.',
  authors: [{ name: 'Botifiy' }],
  alternates: {
    canonical: 'https://botifiy.com',
    languages: {
      'ar': 'https://botifiy.com',
      'x-default': 'https://botifiy.com',
    },
  },
  openGraph: {
    title: 'بوتيفاي — حوّل واتساب إلى موظف مبيعات ذكي',
    description: 'ردود تلقائية فورية، تصنيف للعملاء ومتابعات تلقائية تساعدك على تحويل محادثات واتساب إلى مبيعات.',
    type: 'website',
    locale: 'ar_EG',
    url: 'https://botifiy.com',
    siteName: 'بوتيفاي',
    images: [
      {
        url: '/botifiy-social.webp',
        width: 1920,
        height: 1080,
        alt: 'بوتيفاي — حوّل واتساب إلى موظف مبيعات ذكي',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بوتيفاي — حوّل واتساب إلى موظف مبيعات ذكي',
    description: 'ردود تلقائية فورية، تصنيف للعملاء ومتابعات تلقائية تساعدك على تحويل محادثات واتساب إلى مبيعات.',
    images: ['/botifiy-social.webp'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Local denied defaults are updated by TrackingManager according to the active consent policy. */}
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer=window.dataLayer||[];
              window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
              window.gtag('consent','default',{
                analytics_storage:'denied',
                ad_storage:'denied',
                ad_user_data:'denied',
                ad_personalization:'denied',
                functionality_storage:'granted',
                security_storage:'granted',
                wait_for_update:500
              });
            `,
          }}
        />

        {/* Organization Schema - Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'بوتيفاي',
              alternateName: 'Botifiy',
              url: 'https://botifiy.com',
              logo: 'https://botifiy.com/images/botifiy-logo-ar.png',
              description: 'ردود تلقائية فورية، تصنيف للعملاء ومتابعات تلقائية تساعدك على تحويل محادثات واتساب إلى مبيعات.',
              foundingDate: '2023',
              slogan: 'سيطر على كل تواصلات واتساب من مكان واحد وبذكاء غير مسبوق',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+201098169094',
                contactType: 'customer support',
                availableLanguage: ['ar', 'Arabic'],
                areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'JO', 'LB', 'IQ', 'MA', 'DZ', 'TN', 'LY', 'SD', 'YE', 'SY', 'PS']
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG'
              }
            })
          }}
        />
      </head>
      <body
        className={`${theYearOfHandicrafts.className} ${theYearOfHandicrafts.variable}`}
        suppressHydrationWarning
      >
        <TrackingManager />
        {children}
        <PrivacyControls />
      </body>
    </html>
  )
} 
