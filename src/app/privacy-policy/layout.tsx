import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | بوتيفاي',
  description: 'نحن في بوتيفاي نلتزم بحماية خصوصيتك. تعرف على كيفية جمعنا واستخدامنا وحمايتنا لبياناتك الشخصية.',
  keywords: ['سياسة الخصوصية', 'حماية البيانات', 'شروط الخدمة', 'بوتيفاي', 'Botifiy'],
  openGraph: {
    title: 'سياسة الخصوصية | بوتيفاي',
    description: 'تعرف على كيفية حماية بوتيفاي لبياناتك.',
    type: 'website',
    locale: 'ar',
    url: 'https://botifiy.com/privacy-policy',
    siteName: 'بوتيفاي',
    images: [
      {
        url: '/botifiy-social.png',
        width: 600,
        height: 315,
        alt: 'بوتيفاي - سياسة الخصوصية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سياسة الخصوصية | بوتيفاي',
    description: 'تعرف على كيفية حماية بوتيفاي لبياناتك.',
    images: ['/botifiy-social.png'],
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 