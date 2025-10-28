import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'خطط الأسعار | بوتيفاي',
  description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك. جرب أي خطة مجانًا مدي الحياة بدون حاجة لبطاقة ائتمان.',
  keywords: ['أسعار بوتيفاي', 'خطط التسعير', 'واتساب للأعمال', 'أتمتة واتساب', 'تسويق واتساب'],
  alternates: {
    canonical: 'https://botifiy.com/pricing',
  },
  openGraph: {
    title: 'خطط الأسعار | بوتيفاي',
    description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك',
    type: 'website',
    locale: 'ar',
    url: 'https://botifiy.com/pricing',
    siteName: 'بوتيفاي',
    images: [
      {
        url: '/botifiy-social.png',
        width: 600,
        height: 315,
        alt: 'بوتيفاي - خطط الأسعار',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خطط الأسعار | بوتيفاي',
    description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك',
    images: ['/botifiy-social.png'],
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 