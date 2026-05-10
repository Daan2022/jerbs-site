/**
 * app/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Página principal (rota raiz "/") da landing page da Escola JERBS.
 * Compõe todas as seções em ordem, utilizando os componentes modularizados.
 *
 * ESTRUTURA DE SEÇÕES:
 * 1. <Navbar>          — Barra de navegação fixa com efeito glass
 * 2. <HeroSection>     — Seção principal acima da dobra
 * 3. <SobreSection>    — Nossa Trajetória e Metodologia
 * 4. <TurmasSection>   — Fases do Aprendizado (cards interativos)
 * 5. <DiferenciaisSection> — Por que escolher a JERBS?
 * 6. <GaleriaSection>  — Momentos Inesquecíveis (grid de eventos)
 * 7. <EstruturaSection> — Nossa Casa (instalações)
 * 8. <ContatoSection>  — CTA Final + Formulário + Rodapé
 */

// ─── Importações de Componentes ────────────────────────────────────────────
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SobreSection from '@/components/sections/SobreSection';
import TurmasSection from '@/components/sections/TurmasSection';
import DiferenciaisSection from '@/components/sections/DiferenciaisSection';
import GaleriaSection from '@/components/sections/GaleriaSection';
import EstruturaSection from '@/components/sections/EstruturaSection';
import ContatoSection from '@/components/sections/ContatoSection';
import WhatsAppButton from '@/components/WhatsAppButton';

// ─── Componente da Página ──────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="relative">
      {/* ── Navegação Principal (fixa no topo) ── */}
      <Navbar />

      {/* ── 1. Hero: Primeira dobra da página ── */}
      <HeroSection />

      {/* ── Divisor visual decorativo entre seções ── */}
      <SectionDivider color="from-[#E0F4FF] via-[#FDFAF6] to-[#E0F4FF]" />

      {/* ── 2. Sobre: Nossa Trajetória e Metodologia ── */}
      <SobreSection />

      <SectionDivider color="from-[#E0F4FF] via-[#FDFAF6] to-[#FFF3CC]" />

      {/* ── 3. Turmas: Fases do Aprendizado ── */}
      <TurmasSection />

      <SectionDivider color="from-[#FFF3CC] via-[#FDFAF6] to-[#E0F4FF]" />

      {/* ── 4. Diferenciais: Por que a JERBS? ── */}
      <DiferenciaisSection />

      <SectionDivider color="from-[#E0F4FF] via-[#FDFAF6] to-[#FFF3CC]" />

      {/* ── 5. Galeria: Momentos Inesquecíveis ── */}
      <GaleriaSection />

      <SectionDivider color="from-[#FFF3CC] via-[#FDFAF6] to-[#E0F4FF]" />

      {/* ── 6. Estrutura: Nossa Casa ── */}
      <EstruturaSection />

      {/* ── 7. Contato + Rodapé ── */}
      <ContatoSection />

      {/* ── Botão Flutuante WhatsApp ── */}
      <WhatsAppButton />
    </main>
  );
}

// ─── Componente auxiliar: Divisor gradiente entre seções ──────────────────
/**
 * SectionDivider
 * Linha fina com gradiente para transição suave entre seções.
 * Visualmente discreta mas auxilia na leitura do fluxo da página.
 */
function SectionDivider({ color }: { color: string }) {
  return (
    <div className={`h-px w-full bg-gradient-to-r ${color} opacity-60`} />
  );
}
