import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'مكاني - منصة البحث العقاري بالذكاء الاصطناعي',
  description:
    'ابحث عن عقارك المثالي باللغة العربية الطبيعية. منصة ذكية تفهم متطلباتك وتجد لك أفضل الخيارات.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${ibmPlexArabic.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}