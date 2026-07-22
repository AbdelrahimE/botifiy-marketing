import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | بوتيفاي',
  description: 'نحن في بوتيفاي نلتزم بحماية خصوصيتك. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية.',
  keywords: ['سياسة الخصوصية', 'حماية البيانات', 'شروط الخدمة', 'بوتيفاي', 'Botifiy'],
  alternates: {
    canonical: 'https://botifiy.com/privacy-policy',
  },
  openGraph: {
    title: 'سياسة الخصوصية | بوتيفاي',
    description: 'تعرف على كيفية حماية بوتيفاي لبياناتك.',
    type: 'website',
    locale: 'ar_EG',
    url: 'https://botifiy.com/privacy-policy',
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
    title: 'سياسة الخصوصية | بوتيفاي',
    description: 'تعرف على كيفية حماية بوتيفاي لبياناتك.',
    images: ['/botifiy-social.webp'],
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
