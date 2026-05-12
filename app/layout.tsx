/**
 * layout.tsx
 * Layout raiz da aplicação Next.js (App Router).
 * Define metadados globais, fontes e estrutura base da página.
 */

import type { Metadata } from 'next';
import { Poppins, Quicksand } from 'next/font/google';
import './globals.css';

// ─── Configuração das Fontes ───────────────────────────────────────────────
// Poppins: usada para títulos (display)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

// Quicksand: usada para corpo do texto (mais arredondada e amigável)
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

// ─── Metadados SEO ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://escolajerbs.com.br'),
  title: 'Escola JERBS | Berçário e Educação Infantil em Carapicuíba',
  description:
    'A melhor escola infantil de Carapicuíba com 32 anos de tradição. Berçário especializado, Maternal e Pré-escola. Educação lúdica, afetuosa e segura. Agende sua visita!',
  keywords: [
    'escola infantil Carapicuíba',
    'melhor berçário Carapicuíba',
    'educação infantil particular',
    'Escola JERBS',
    'matrículas abertas 2025',
    'colégio infantil carapicuíba',
  ],
  icons: {
    icon: '/images/icon-logo-jerbs.png',
    shortcut: '/images/icon-logo-jerbs.png',
    apple: '/images/icon-logo-jerbs.png',
  },
  manifest: '/manifest.json',
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
  openGraph: {
    title: 'Escola JERBS | Educação que Transforma, Cuidado que Acolhe',
    description:
      '32 anos formando gerações em Carapicuíba. Berçário, Maternal e Pré-escola com infraestrutura moderna e equipe qualificada.',
    url: 'https://escolajerbs.com.br',
    siteName: 'Escola JERBS',
    images: [
      {
        url: '/images/hero-bg.jpg', // Usando a imagem da hero como destaque
        width: 1200,
        height: 630,
        alt: 'Fachada da Escola JERBS',
      },
    ],
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escola JERBS | Berçário e Educação Infantil',
    description: 'A melhor opção para a educação do seu filho em Carapicuíba.',
    images: ['/images/hero-bg.jpg'],
  },
};

// ─── Componente de Layout Raiz ─────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    'name': 'Escola JERBS',
    'alternateName': 'Escola Infantil JERBS',
    'url': 'https://escolajerbs.com.br',
    'logo': 'https://escolajerbs.com.br/images/icon-logo-jerbs.png',
    'image': 'https://escolajerbs.com.br/images/hero-bg.jpg',
    'description': 'Escola de Educação Infantil e Berçário em Carapicuíba com 32 anos de tradição.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Rua Exemplo, 123',
      'addressLocality': 'Carapicuíba',
      'addressRegion': 'SP',
      'postalCode': '06310-000',
      'addressCountry': 'BR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -23.5234, // Exemplo, deve ser ajustado para a real
      'longitude': -46.8406
    },
    'telephone': '+551141810000',
    'openingHours': 'Mo-Fr 07:00-18:00',
    'priceRange': '$$',
    'sameAs': [
      'https://www.instagram.com/escolajerbs',
      'https://www.facebook.com/escolajerbs'
    ]
  };

  return (
    <html lang="pt-BR" className={`${poppins.variable} ${quicksand.variable}`} suppressHydrationWarning translate="no">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FDFAF6] antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
