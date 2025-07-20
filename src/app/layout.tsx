import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  // إضافة fallback fonts لضمان عدم فشل النص
  fallback: ['Arial', 'sans-serif'],
  // تحسين loading
  preload: true
})

export const metadata: Metadata = {
  title: 'Botifiy – The Ultimate WhatsApp Automation Tool',
  description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
  keywords: ['WhatsApp', 'automation', 'chatbot', 'customer service', 'AI', 'sentiment analysis'],
  authors: [{ name: 'Botifiy' }],
  openGraph: {
    title: 'Botifiy – The Ultimate WhatsApp Automation Tool',
    description: 'حوّل المحادثات إلى نمو مع أتمتة واتساب ورؤى ذكاء اصطناعي',
    type: 'website',
    locale: 'ar',
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
        {/* إضافة preload للخطوط الأساسية */}
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
              console.log('🚀 [GTM Debug] GTM initialization script starting...');
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              console.log('✅ [GTM Debug] GTM initialization script executed');
              console.log('📊 [GTM Debug] DataLayer initialized:', window.dataLayer);
              })(window,document,'script','dataLayer','GTM-5WFNXVRS');
            `,
          }}
        />
        
        {/* إضافة script لتتبع تحميل الخطوط */}
        <Script
          id="font-debug"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🔤 [Font Debug] Starting font loading debug...');
              
              // تتبع حالة تحميل الخطوط
              if (typeof document !== 'undefined' && 'fonts' in document) {
                document.fonts.ready.then(function() {
                  console.log('✅ [Font Debug] All fonts loaded successfully');
                  console.log('📝 [Font Debug] Available fonts:', Array.from(document.fonts).map(f => f.family));
                }).catch(function(error) {
                  console.error('❌ [Font Debug] Font loading failed:', error);
                });
                
                // تتبع الخط العربي تحديداً
                try {
                  const arabicFontCheck = new FontFace('IBM Plex Sans Arabic', 'url(https://fonts.gstatic.com/s/ibmplexsansarabic/v13/Qw3MZRtaECStMsGpBFE7DUEgp_pxrOBZuHtyLSuGuQ.woff2)');
                  arabicFontCheck.load().then(function() {
                    console.log('✅ [Font Debug] IBM Plex Sans Arabic loaded successfully');
                  }).catch(function(error) {
                    console.error('❌ [Font Debug] IBM Plex Sans Arabic failed to load:', error);
                  });
                } catch (fontError) {
                  console.warn('⚠️ [Font Debug] FontFace constructor not supported:', fontError);
                }
              } else {
                console.warn('⚠️ [Font Debug] Browser does not support Font Loading API');
              }
              
              // تحقق من CSS font-family
              setTimeout(function() {
                if (typeof document !== 'undefined') {
                  const testElement = document.createElement('div');
                  testElement.style.fontFamily = 'IBM Plex Sans Arabic, Arial, sans-serif';
                  document.body.appendChild(testElement);
                  const computedStyle = window.getComputedStyle(testElement);
                  console.log('🎨 [Font Debug] Computed font-family:', computedStyle.fontFamily);
                  document.body.removeChild(testElement);
                }
              }, 1000);
            `,
          }}
        />
        
        {/* إضافة script لتتبع أخطاء JavaScript العامة */}
        <Script
          id="error-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🛡️ [Error Tracking] Initializing global error handlers...');
              
              // تتبع الأخطاء العامة
              window.addEventListener('error', function(event) {
                console.error('❌ [Global Error]', {
                  message: event.message,
                  filename: event.filename,
                  lineno: event.lineno,
                  colno: event.colno,
                  error: event.error
                });
              });
              
              // تتبع Promise rejections
              window.addEventListener('unhandledrejection', function(event) {
                console.error('❌ [Unhandled Promise Rejection]', event.reason);
              });
              
              console.log('✅ [Error Tracking] Global error handlers initialized');
            `,
          }}
        />
        
        {/* إضافة script لتتبع حالة الصفحات */}
        <Script
          id="page-debug"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('📄 [Page Debug] Page loading debug initialized');
              console.log('🌐 [Page Debug] User Agent:', navigator.userAgent);
              console.log('📍 [Page Debug] Current URL:', window.location.href);
              console.log('🔧 [Page Debug] JavaScript enabled: true');
              
              // تتبع DOMContentLoaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  console.log('✅ [Page Debug] DOM Content Loaded');
                });
              } else {
                console.log('✅ [Page Debug] DOM already loaded');
              }
              
              // تتبع Window load
              window.addEventListener('load', function() {
                console.log('✅ [Page Debug] Window fully loaded');
              });
            `,
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