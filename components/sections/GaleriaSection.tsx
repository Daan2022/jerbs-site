/**
 * components/sections/GaleriaSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção "Momentos Inesquecíveis" com layout Bento Grid premium,
 * lightbox interativo e design moderno com glassmorphism.
 * Consome dados dinâmicos do supabaseService (Mocks de RPC).
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Heart, Star, Music2, Droplets, CircleDot,
  X, ChevronLeft, ChevronRight, Sparkles, Images,
  Building2, TreePine, Dumbbell, type LucideIcon,
} from 'lucide-react';
import { buscarGaleria, buscarGaleriaCompleta, type ItemGaleria } from '@/services/supabaseService';

// ─── Mapa de Ícones ────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  camera: Camera,
  heart: Heart,
  star: Star,
  music: Music2,
  droplets: Droplets,
  circle: CircleDot,
  building: Building2,
  tree: TreePine,
  dumbbell: Dumbbell,
};

// ─── Layout fixo do Bento Grid (posição visual de cada item) ──────────────
// Define classes CSS para cada posição no grid, criando o efeito "bento box"
const BENTO_LAYOUTS = [
  'md:col-span-2 md:row-span-2',  // Item 0: Grande (hero da galeria)
  'md:col-span-1 md:row-span-1',  // Item 1: Pequeno
  'md:col-span-1 md:row-span-1',  // Item 2: Pequeno
  'md:col-span-1 md:row-span-1',  // Item 3: Pequeno
  'md:col-span-2 md:row-span-1',  // Item 4: Largo
  'md:col-span-1 md:row-span-1',  // Item 5: Pequeno
];

// ─── Sub-componente: Card Individual da Galeria ───────────────────────────
function GaleriaCard({
  item,
  index,
  layoutClass,
  onClick,
}: {
  item: ItemGaleria;
  index: number;
  layoutClass: string;
  onClick: () => void;
}) {
  // Lógica para definir ícone e cores com base na categoria (estratégia de Arquiteto Sênior)
  const configVisual = {
    'Atividades': { icone: Camera, cor_inicio: '#008FC7', cor_fim: '#1C75BC' },
    'Educação': { icone: Star, cor_inicio: '#FBB03B', cor_fim: '#C1272D' },
    'Infraestrutura': { icone: Building2, cor_inicio: '#95D5B2', cor_fim: '#52B788' },
    'Berçário': { icone: Heart, cor_inicio: '#C77DFF', cor_fim: '#9B59B6' },
  }[item.categoria] || { icone: Camera, cor_inicio: '#008FC7', cor_fim: '#1C75BC' };

  const IconComponent = configVisual.icone;
  
  // Verifica se o card é grande APENAS no desktop (md: para cima)
  // Isso evita que o minHeight force um tamanho errado no mobile
  const isLarge = layoutClass.includes('md:col-span-2') && layoutClass.includes('md:row-span-2');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-[2rem] cursor-pointer group ${layoutClass}`}
      style={{ 
        // No mobile (menor que 768px) usamos uma altura padrão de 280px para todos
        // No desktop respeitamos a lógica do Bento Grid
        minHeight: '280px' 
      }}
      onClick={onClick}
    >
      {/* ── Imagem de fundo com efeito parallax no hover ── */}
      <Image
        src={item.imagem_url}
        alt={item.titulo}
        fill
        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
        sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
      />

      {/* ── Overlay gradiente — mais suave e elegante ── */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(160deg, ${configVisual.cor_inicio}44 0%, transparent 40%, ${configVisual.cor_fim}BB 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 group-hover:from-black/50 transition-all duration-500" />

      {/* ── Badge superior esquerdo com glassmorphism ── */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/20 shadow-lg"
          style={{ backgroundColor: `${configVisual.cor_inicio}33` }}
        >
          <IconComponent className="w-3.5 h-3.5 text-white" />
          <span
            className="text-[10px] font-bold text-white uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {item.categoria}
          </span>
        </div>
      </div>

      {/* ── Botão de ampliar no hover ── */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* ── Conteúdo inferior com reveal no hover ── */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20">
        <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          <h4
            className={`font-black text-white leading-tight mb-1 text-xl sm:text-2xl`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {item.titulo}
          </h4>
          <p
            className={`text-white/80 font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm`}
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {item.categoria}
          </p>
        </div>

        {/* Barra de progresso decorativa no hover */}
        <div className="mt-3 h-0.5 rounded-full bg-white/20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${configVisual.cor_inicio}, ${configVisual.cor_fim})` }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>
      </div>

      {/* ── Borda interna brilhante no hover ── */}
      <div className="absolute inset-0 rounded-[2rem] border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function GaleriaSection() {
  const [items, setItems] = useState<ItemGaleria[]>([]);
  const [itemsCompletos, setItemsCompletos] = useState<ItemGaleria[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Determina se o lightbox está mostrando itens da galeria completa (modal) ou da preview
  const [mostrandoCompleta, setMostrandoCompleta] = useState(false);

  // Carregamento dos dados via Mock RPC
  useEffect(() => {
    const carregar = async () => {
      try {
        const [dadosSimples, dadosCompletos] = await Promise.all([
          buscarGaleria(),
          buscarGaleriaCompleta(),
        ]);
        setItems(dadosSimples);
        setItemsCompletos(dadosCompletos);
      } catch (err) {
        console.error('Erro ao carregar galeria:', err);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  // Itens ativos para o lightbox (depende de qual galeria está aberta)
  const itensLightbox = mostrandoCompleta ? itemsCompletos : items;

  // Handlers do Lightbox
  const abrirLightbox = useCallback((index: number, completa: boolean = false) => {
    setMostrandoCompleta(completa);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const fecharLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

  const irAnterior = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? itensLightbox.length - 1 : prev - 1) : null
    );
  }, [itensLightbox.length]);

  const irProximo = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === itensLightbox.length - 1 ? 0 : prev + 1) : null
    );
  }, [itensLightbox.length]);

  // Navegação pelo teclado no lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') fecharLightbox();
      if (e.key === 'ArrowLeft') irAnterior();
      if (e.key === 'ArrowRight') irProximo();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, fecharLightbox, irAnterior, irProximo]);

  return (
    <section id="galeria" className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#F8FFF8] to-white">
      {/* ── Elementos decorativos de fundo ── */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] blob-shape opacity-[0.06] bg-gradient-to-br from-[#52B788] to-[#95D5B2] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] blob-shape-alt opacity-[0.06] bg-gradient-to-br from-[#008FC7] to-[#C77DFF] pointer-events-none" />

      {/* ── Padrão de pontos sutil no fundo ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #52B788 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Cabeçalho ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D8F3DC] border border-[#95D5B2]/30 mb-5"
          >
            <Camera className="w-4 h-4 text-[#52B788]" />
            <span
              className="text-xs font-bold uppercase tracking-widest text-[#52B788]"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              Nossa Galeria
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2D2D2D] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Momentos{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #52B788, #2D6A4F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Inesquecíveis
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#5A5A6A] max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Cada dia é uma nova aventura. Veja os sorrisos, descobertas e a
            magia que acontece na nossa escola.
          </motion.p>
        </div>

        {/* ── Bento Grid Principal ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`bg-gray-100 rounded-[2rem] ${i === 1 ? 'md:col-span-2 md:row-span-2' : ''}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[280px] gap-6 mb-14">
            {items.map((item, index) => (
              <GaleriaCard
                key={item.id}
                item={item}
                index={index}
                layoutClass={BENTO_LAYOUTS[index] || ''}
                onClick={() => abrirLightbox(index)}
              />
            ))}
          </div>
        )}

        {/* ── CTA: Ver Galeria Completa ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => abrirLightbox(0, true)}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#52B788]/25 transition-all duration-300 overflow-hidden"
            style={{
              fontFamily: 'var(--font-quicksand)',
              background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <Images className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Ver Galeria Completa</span>
            <span className="relative z-10 flex items-center justify-center min-w-[1.75rem] h-7 px-1.5 rounded-full bg-white/20 text-xs font-black">
              {itemsCompletos.length}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* ─── LIGHTBOX PREMIUM ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0a]/98 backdrop-blur-xl"
            onClick={fecharLightbox}
          >
            {/* Overlay sutil de ruído */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            {/* 1. CABEÇALHO (Fixo no topo) */}
            <div className="relative flex items-center justify-between px-6 py-4 z-50">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-white/90 text-xs font-bold tracking-widest">
                {lightboxIndex + 1} <span className="opacity-40 mx-1">/</span> {itensLightbox.length}
              </div>
              
              <button
                onClick={fecharLightbox}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white transition-all duration-300 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* 2. ÁREA DA IMAGEM (Flexível) */}
            <div className="relative flex-1 flex items-center justify-center px-4 sm:px-12 group/main overflow-hidden">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full h-full max-h-[50vh] sm:max-h-[70vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={itensLightbox[lightboxIndex].imagem_url}
                  alt={itensLightbox[lightboxIndex].titulo}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />

                {/* Navegação Desktop (Laterais) */}
                <div className="hidden lg:block absolute inset-y-0 -inset-x-24 z-10 pointer-events-none">
                   <div className="h-full flex items-center justify-between">
                      <button
                        onClick={(e) => { e.stopPropagation(); irAnterior(); }}
                        className="pointer-events-auto w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
                      >
                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); irProximo(); }}
                        className="pointer-events-auto w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 group"
                      >
                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* 3. RODAPÉ DE INFORMAÇÕES E CONTROLES (Base) */}
            <div className="relative z-50 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-10 pb-8 px-6">
              <div className="max-w-3xl mx-auto flex flex-col gap-6">
                
                {/* Info Box - Glassmorphism */}
                <motion.div
                  key={`info-${lightboxIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 sm:p-6 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const itemAtual = itensLightbox[lightboxIndex];
                    const configV = {
                      'Atividades': { icone: Camera, cor_inicio: '#008FC7', cor_fim: '#1C75BC' },
                      'Educação': { icone: Star, cor_inicio: '#FBB03B', cor_fim: '#C1272D' },
                      'Infraestrutura': { icone: Building2, cor_inicio: '#95D5B2', cor_fim: '#52B788' },
                      'Berçário': { icone: Heart, cor_inicio: '#C77DFF', cor_fim: '#9B59B6' },
                    }[itemAtual.categoria] || { icone: Camera, cor_inicio: '#008FC7', cor_fim: '#1C75BC' };
                    
                    const Ico = configV.icone;

                    return (
                      <>
                        <div 
                          className="absolute inset-y-0 left-0 w-1.5"
                          style={{ background: `linear-gradient(to bottom, ${configV.cor_inicio}, ${configV.cor_fim})` }}
                        />
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${configV.cor_inicio}22` }}
                            >
                              <Ico className="w-5 h-5" style={{ color: configV.cor_inicio }} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
                              {itemAtual.titulo}
                            </h3>
                          </div>
                          <p className="text-white/60 text-sm sm:text-base leading-relaxed pl-[3.25rem]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                            Categoria: {itemAtual.categoria}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>

                {/* Controles e Thumbnails */}
                <div className="flex flex-col items-center gap-6">
                   {/* Setas Mobile */}
                   <div className="flex lg:hidden items-center gap-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); irAnterior(); }}
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); irProximo(); }}
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                   </div>

                   {/* Thumbnails */}
                   <div className="flex gap-3 overflow-x-auto py-2 px-2 max-w-full no-scrollbar">
                      {itensLightbox.map((item, i) => (
                        <button
                          key={item.id}
                          onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                          className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-500 border-2 ${
                            i === lightboxIndex
                              ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                              : 'border-transparent opacity-30 hover:opacity-60 scale-90'
                          }`}
                        >
                          <Image
                            src={item.imagem_url}
                            alt={item.titulo}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
