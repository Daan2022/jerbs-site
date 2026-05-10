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
  const IconComponent = ICON_MAP[item.icone_slug] || Camera;
  const isLarge = layoutClass.includes('col-span-2') && layoutClass.includes('row-span-2');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-[1.75rem] cursor-pointer group ${layoutClass}`}
      style={{ minHeight: isLarge ? '380px' : '220px' }}
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
          background: `linear-gradient(160deg, ${item.cor_inicio}44 0%, transparent 40%, ${item.cor_fim}BB 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:from-black/40 transition-all duration-500" />

      {/* ── Badge superior esquerdo com glassmorphism ── */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border border-white/20 shadow-lg"
          style={{ backgroundColor: `${item.cor_inicio}33` }}
        >
          <IconComponent className="w-3.5 h-3.5 text-white" />
          <span
            className="text-[10px] font-bold text-white uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {item.id.replace(/-/g, ' ')}
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
            className={`font-black text-white leading-tight mb-1 ${isLarge ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {item.titulo}
          </h4>
          <p
            className={`text-white/80 font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${isLarge ? 'text-sm' : 'text-xs'}`}
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {item.descricao}
          </p>
        </div>

        {/* Barra de progresso decorativa no hover */}
        <div className="mt-3 h-0.5 rounded-full bg-white/20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${item.cor_inicio}, ${item.cor_fim})` }}
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>
      </div>

      {/* ── Borda interna brilhante no hover ── */}
      <div className="absolute inset-0 rounded-[1.75rem] border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none" />
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
          {/* Pílula superior */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`bg-gray-100 rounded-[1.75rem] ${i === 1 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 5 ? 'md:col-span-2' : ''}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4 mb-14">
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
            {/* Brilho animado no botão */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <Images className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Ver Galeria Completa</span>
            <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-xs font-black">
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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={fecharLightbox}
          >
            {/* Container principal */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-5xl mx-4 aspect-[4/3] sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagem principal */}
              <Image
                src={itensLightbox[lightboxIndex].imagem_url}
                alt={itensLightbox[lightboxIndex].titulo}
                fill
                className="object-contain rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              {/* Info flutuante inferior com glassmorphism */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white bg-black/30 backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-1">
                  {(() => {
                    const Ico = ICON_MAP[itensLightbox[lightboxIndex].icone_slug] || Camera;
                    return (
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${itensLightbox[lightboxIndex].cor_inicio}44` }}
                      >
                        <Ico className="w-4 h-4" style={{ color: itensLightbox[lightboxIndex].cor_inicio }} />
                      </div>
                    );
                  })()}
                  <h3 className="text-lg sm:text-2xl font-black" style={{ fontFamily: 'var(--font-poppins)' }}>
                    {itensLightbox[lightboxIndex].titulo}
                  </h3>
                </div>
                <p className="text-sm sm:text-base opacity-70 ml-11" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  {itensLightbox[lightboxIndex].descricao}
                </p>
              </motion.div>

              {/* Contador */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white text-xs font-bold">
                {lightboxIndex + 1} / {itensLightbox.length}
              </div>
            </motion.div>

            {/* ── Botão Fechar ── */}
            <button
              onClick={fecharLightbox}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/10 hover:border-white/20"
              aria-label="Fechar lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* ── Navegação Anterior ── */}
            <button
              onClick={(e) => { e.stopPropagation(); irAnterior(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/10 hover:border-white/20 hover:scale-110"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* ── Navegação Próximo ── */}
            <button
              onClick={(e) => { e.stopPropagation(); irProximo(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/10 hover:border-white/20 hover:scale-110"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* ── Thumbnails (miniaturas) na parte inferior ── */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10">
              {itensLightbox.map((item, i) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                    i === lightboxIndex
                      ? 'border-white scale-110 shadow-lg shadow-white/20'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={item.imagem_url}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                    sizes="60px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
