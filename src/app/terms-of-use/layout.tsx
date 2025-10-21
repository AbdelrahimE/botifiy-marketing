import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'شروط الاستخدام | بوتيفاي',
  description: 'اقرأ شروط وأحكام استخدام منصة بوتيفاي. يوضح هذا المستند حقوقك ومسؤولياتك كمستخدم لخدماتنا.',
  keywords: ['شروط الاستخدام', 'أحكام الخدمة', 'قواعد الاستخدام', 'بوتيفاي', 'Botifiy'],
  openGraph: {
    title: 'شروط الاستخدام | بوتيفاي',
    description: 'اطلع على شروط استخدام منصة بوتيفاي.',
    type: 'website',
    locale: 'ar',
    url: 'https://botifiy.com/terms-of-use',
    siteName: 'بوتيفاي',
    images: [
      {
        url: '/botifiy-social.png',
        width: 600,
        height: 315,
        alt: 'بوتيفاي - شروط الاستخدام',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'شروط الاستخدام | بوتيفاي',
    description: 'اطلع على شروط استخدام منصة بوتيفاي.',
    images: ['/botifiy-social.png'],
  }
}

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 