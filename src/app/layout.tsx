import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://botifiy.com'),
  title: 'بوتيفاي | أتمتة وتسويق واتساب بالذكاء الاصطناعي',
  description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
  keywords: ['WhatsApp', 'automation', 'chatbot', 'customer service', 'AI', 'sentiment analysis'],
  authors: [{ name: 'Botifiy' }],
  alternates: {
    canonical: 'https://botifiy.com',
    languages: {
      'ar': 'https://botifiy.com',
      'x-default': 'https://botifiy.com',
    },
  },
  openGraph: {
    title: 'بوتيفاي | أتمتة وتسويق واتساب بالذكاء الاصطناعي',
    description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
    type: 'website',
    locale: 'ar',
    url: 'https://botifiy.com',
    siteName: 'بوتيفاي',
    images: [
      {
        url: '/botifiy-social.png',
        width: 600,
        height: 315,
        alt: 'بوتيفاي - أتمتة وتسويق واتساب بالذكاء الاصطناعي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بوتيفاي | أتمتة وتسويق واتساب بالذكاء الاصطناعي',
    description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
    images: ['/botifiy-social.png'],
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
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5WFNXVRS');
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
              logo: 'https://botifiy.com/botifiy-social.png',
              description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
              foundingDate: '2023',
              slogan: 'سيطر على كل تواصلات واتساب من مكان واحد وبذكاء غير مسبوق',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+201098169094',
                contactType: 'customer support',
                availableLanguage: ['ar', 'Arabic'],
                areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'JO', 'LB', 'IQ', 'MA', 'DZ', 'TN', 'LY', 'SD', 'YE', 'SY', 'PS']
              },
              sameAs: [],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG'
              }
            })
          }}
        />
      </head>
      <body className={ibmPlexSansArabic.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WFNXVRS"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
} 