import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { SystemProvider } from '@/components';
import ClientLayout from '@/components/layout/ClientLayout';
import { Analytics } from '@vercel/analytics/react';
import { DEFAULT_SEO } from '@/config/seo';

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

// Use centralized SEO config for default metadata
export const metadata = {
  ...DEFAULT_SEO,
  metadataBase: new URL(DEFAULT_SEO.metadataBase),
  verification: {
    google: '4T7twjut8E6DcM83Kfu7zgssCH1-Nxz-ktwLEB_nHBo',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-page">
        <SystemProvider>
          <ClientLayout>{children}</ClientLayout>
        </SystemProvider>
        <Analytics />
      </body>
    </html>
  );
}