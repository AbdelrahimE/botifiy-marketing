import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'شروط الاستخدام | بوتيفاي',
  description: 'اقرأ شروط وأحكام استخدام منصة بوتيفاي. يوضح هذا المستند حقوقك ومسؤولياتك كمستخدم لخدماتنا.',
  keywords: ['شروط الاستخدام', 'أحكام الخدمة', 'قواعد الاستخدام', 'بوتيفاي', 'Botifiy'],
  alternates: {
    canonical: 'https://botifiy.com/terms-of-use',
  },
  openGraph: {
    title: 'شروط الاستخدام | بوتيفاي',
    description: 'اطلع على شروط استخدام منصة بوتيفاي.',
    type: 'website',
    locale: 'ar_EG',
    url: 'https://botifiy.com/terms-of-use',
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
    title: 'شروط الاستخدام | بوتيفاي',
    description: 'اطلع على شروط استخدام منصة بوتيفاي.',
    images: ['/botifiy-social.webp'],
  }
}

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
