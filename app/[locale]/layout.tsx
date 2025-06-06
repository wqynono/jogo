import '../../css/tailwind.css'
import 'pliny/search/algolia.css'
import '../globals.css'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from '../theme-providers'
import Footer from "../../components/footer"
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import React from 'react';
import Header from '../../components/Header'
import { Kanit } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
const kanit = Kanit({
  weight: ['400', '500', '600', '700'], // 选择你需要的字重
  subsets: ['latin', 'thai'], // 选择需要的字符子集
  display: 'swap', // 确保文本在字体加载时可见
  variable: '--font-kanit', // 可选：创建CSS变量
})
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  keywords: siteMetadata.keyWords,
  description: siteMetadata.description,
  authors: [{ name: 'Jbuid' }],
  applicationName: 'Jbuid',
  manifest: '/manifest.json',

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.locale,
    type: 'website',
    // images: [
    //   {
    //     url: 'https://a.jbuid-cdn.com/cdn-cgi/image/quality=78,width=1200,height=630,f=png/opengraph/3/home/home-1200x630.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Free Online Games - Jbuid',
    //     type: 'image/png',
    //   },
    // ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: '@Jbuid',
    // images: [
    //   {
    //     url: 'https://a.jbuid-cdn.com/cdn-cgi/image/quality=78,width=1200,height=600,f=png/opengraph/3/home/home-1200x600.png',
    //     alt: 'Free Online Games - Jbuid',
    //   },
    // ],
  },

  icons: {
    icon: [
      { url: '/logo.svg', sizes: '16x16' },
      { url: '/logo.svg', sizes: '32x32' },
      { url: '/logo.svg', sizes: '194x194' },
      { url: '/logo.svg', sizes: '192x192' },
    ],
    apple: [
      { url: '/logo.svg', sizes: '180x180' },
    ],
    shortcut: '/logo.svg',
  },

  alternates: {
    canonical: 'https://jbuid.top/',
    languages: {
      'en': 'https://jbuid.top/en',
      'ja': 'https://jbuid.top/ja',
      'ko': 'https://jbuid.top/ko',
      'zh': 'https://jbuid.top/zh',
      'ru': 'https://jbuid.top/ru',
      'x-default': 'https://jbuid.top/en',
    },
  },

  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
// 新增 viewport 配置
export const viewport = {
  themeColor: '#1E3A8A',
};
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const basePath = process.env.BASE_PATH || '';
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${kanit.variable} scroll-smooth`}
      suppressHydrationWarning
    >

      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <NextIntlClientProvider>
          <ThemeProviders>
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer locale={locale} />
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={siteMetadata.analytics.googleAnalytics.googleAnalyticsId} />
    </html>
  );
}