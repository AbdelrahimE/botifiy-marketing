import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'خطط الأسعار | بوتيفاي',
  description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك. جرب أي خطة مجانًا مدي الحياة بدون حاجة لبطاقة ائتمان.',
  keywords: ['أسعار بوتيفاي', 'خطط التسعير', 'واتساب للأعمال', 'أتمتة واتساب', 'تسويق واتساب'],
  openGraph: {
    title: 'خطط الأسعار | بوتيفاي',
    description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خطط الأسعار | بوتيفاي',
    description: 'اختر الخطة المناسبة لأتمتة وتسويق واتساب لشركتك',
  }
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 