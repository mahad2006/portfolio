import './globals.css';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, JetBrains_Mono } from 'next/font/google';
import { BootScreen, SystemProvider, SystemDashboard, SystemLogs, MatrixRain } from './components';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  metadataBase: new URL('https://shaikhmahad.vercel.app'),
  title: {
    default: 'Shaikh Mahad | Backend Systems Engineer',
    template: '%s | Shaikh Mahad'
  },
  description: 'Backend Systems Engineer specializing in high-performance Java/Spring Boot architectures, distributed systems, and low-latency engineering.',
  keywords: [
    'Shaikh Mahad', 'Backend Engineer', 'Systems Engineer', 'Java Developer', 
    'Spring Boot', 'Next.js Portfolio', 'Distributed Systems', 'Performance Engineering',
    'Karachi Software Engineer', 'UBIT'
  ],
  authors: [{ name: 'Shaikh Mahad' }],
  creator: 'Shaikh Mahad',
  
  openGraph: {
    title: 'Shaikh Mahad | Backend Systems Engineer',
    description: 'Specializing in high-performance backend systems and distributed architectures.',
    url: 'https://shaikhmahad.vercel.app',
    siteName: 'Shaikh Mahad Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Shaikh Mahad - Backend Systems Engineer'
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Shaikh Mahad | Backend Systems Engineer',
    description: 'Engineering high-performance backend systems and distributed architectures.',
    images: ['/profile.png'],
    creator: '@mahad2006'
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'google-site-verification-id', // User should replace this
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050505]">
        <SystemProvider>
          <MatrixRain />
          <BootScreen />
          <SystemDashboard />
          <SystemLogs />
          <main className="relative z-10">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </SystemProvider>
      </body>
    </html>
  )
}