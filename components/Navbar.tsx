/**
 * components/Navbar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Barra de navegação principal com efeito glassmorphism ao rolar a página.
 * Responsiva com menu hambúrguer para mobile.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';
import Image from 'next/image';

// ─── Interface dos itens de navegação ─────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

// ─── Dados de navegação ────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: 'Sobre',      href: '#sobre'       },
  { label: 'Turmas',     href: '#turmas'      },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Galeria',    href: '#galeria'     },
  { label: 'Estrutura',  href: '#estrutura'   },
  { label: 'Contato',    href: '#contato'     },
];

// ─── Componente Principal ──────────────────────────────────────────────────
export default function Navbar() {
  // Estado de scroll: controla o estilo do navbar ao rolar
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  // Estado do menu mobile
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Detecta scroll para aplicar efeito glass
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu ao clicar em um link
  const handleNavClick = () => setIsMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-lg shadow-coral-100/30 border-b border-white/40'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* ── Logo ── */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
              <Image 
                src="/images/icon-logo-jerbs.png" 
                alt="Logo Escola JERBS" 
                fill 
                sizes="40px"
                className="object-contain"
              />
            </div>
            <span
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <span className="text-[#2D2D2D] text-sm font-semibold mr-1">Escola</span>
              <span className="text-[#1C75BC]">JERBS</span>
            </span>
          </a>

          {/* ── Links Desktop ── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-600 text-[#5A5A6A] hover:text-[#1C75BC] transition-colors duration-300 rounded-xl hover:bg-[#E0F4FF] group"
                  style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 600 }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA Desktop ── */}
          <a
            href="#contato"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#008FC7] to-[#1C75BC] hover:shadow-lg hover:shadow-blue-300/40 hover:-translate-y-0.5 transition-all duration-300"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            <Star className="w-4 h-4 fill-white" />
            Agende uma Visita
          </a>

          {/* ── Botão Hambúrguer Mobile ── */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden w-10 h-10 rounded-2xl bg-[#E0F4FF] flex items-center justify-center text-[#1C75BC] hover:bg-[#008FC7] transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* ── Menu Mobile (Drawer) ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-4 right-4 z-40 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E0F4FF] p-6"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="block px-4 py-3 rounded-2xl font-semibold text-[#5A5A6A] hover:text-[#1C75BC] hover:bg-[#E0F4FF] transition-all duration-200"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contato"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#008FC7] to-[#1C75BC]"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  <Star className="w-4 h-4 fill-white" />
                  Agende uma Visita
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
