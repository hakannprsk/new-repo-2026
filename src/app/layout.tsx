import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'KralTools — 50+ Ücretsiz Online Araç',
  description:
    'KralTools, dosya dönüştürme, görsel düzenleme, metin manipülasyonu, web geliştirme ve ağ araçlarını tek platformda sunar. Ücretsiz, hızlı ve güvenli.',
  keywords: 'online araçlar, dosya dönüştürücü, PDF araçları, resim araçları, web araçları, metin araçları',
  openGraph: {
    title: 'KralTools — 50+ Ücretsiz Online Araç',
    description: 'Tüm dijital ihtiyaçlarınız için güçlü araçlar. Ücretsiz, hızlı, tarayıcı tabanlı.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-mesh min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
