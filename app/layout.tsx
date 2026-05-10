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
  title: 'Escola JERBS | Educação que Transforma, Cuidado que Acolhe',
  description:
    'A melhor opção para a educação do seu filho em Carapicuíba. 32 anos de tradição com Berçário, Maternal e Pré-escola. Agende uma visita!',
  keywords: [
    'escola infantil Carapicuíba',
    'berçário Carapicuíba',
    'maternal Carapicuíba',
    'pré-escola Carapicuíba',
    'Escola JERBS',
    'educação infantil',
  ],
  openGraph: {
    title: 'Escola JERBS | Educação que Transforma, Cuidado que Acolhe',
    description:
      '32 anos de tradição em Carapicuíba. Berçário, Maternal e Pré-escola com muito amor e carinho.',
    type: 'website',
    locale: 'pt_BR',
  },
};

// ─── Componente de Layout Raiz ─────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${quicksand.variable}`} suppressHydrationWarning translate="no">
      <body className="bg-[#FDFAF6] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
