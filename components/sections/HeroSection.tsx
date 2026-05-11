/**
 * components/sections/HeroSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção principal (Hero) com Carousel dinâmico e responsivo.
 * Corrigido para evitar cortes em telas menores e sobreposição de ícones 3D.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Award, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Floating3DIcon from '@/components/Floating3DIcon';
import { buscarSlidesHero, type SlideHero } from '@/services/supabaseService';

// ─── Variantes de animação para os elementos do slide ─────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Sub-componente: Badge de estatística ─────────────────────────────────
function StatBadge({ icon, value, label, color, delay }: { icon: React.ReactNode, value: string, label: string, color: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      className="clay-card flex items-center gap-3 px-3 py-2 sm:px-4 sm:py-3 cursor-default bg-white/90 backdrop-blur-sm"
    >
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '22' }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div>
        <p
          className="text-base sm:text-lg font-black leading-none"
          style={{ fontFamily: 'var(--font-poppins)', color }}
        >
          {value}
        </p>
        <p className="text-[10px] sm:text-xs text-[#9494A8] font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [slides, setSlides] = useState<SlideHero[]>([
    {
      id: 0,
      titulo_principal: 'Educação que transforma, cuidado que acolhe.',
      subtitulo: 'A melhor opção para a educação do seu filho.',
      texto_botao_primario: 'Agende uma Visita',
      link_botao_primario: '#contato',
      texto_botao_secundario: 'Conheça a Escola',
      link_botao_secundario: '#sobre',
      imagem_url_fundo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920',
      imagem_url_destaque: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800',
      badge_texto: 'Escola JERBS',
    }
  ]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const activeIndex = Math.abs(page % slides.length);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Garantir montagem no cliente
  useEffect(() => {
    setIsMounted(true);
    const carregarDados = async () => {
      try {
        const dados = await buscarSlidesHero();
        if (dados && dados.length > 0) setSlides(dados);
      } catch (error) {
        console.error('Erro ao buscar slides:', error);
      }
    };
    carregarDados();
  }, []);

  // Autoplay
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => paginate(1), 10000);
    return () => clearInterval(timer);
  }, [paginate, slides.length]);

  const slideAtual = slides[activeIndex];


  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden pt-36 pb-32 lg:pt-40 lg:pb-40 bg-[#FDFAF6]"
    >
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 }
            }}
            className="absolute inset-0"
          >
            {/* Gradientes responsivos */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFAF6] via-[#FDFAF6]/98 to-transparent z-10 hidden lg:block" />
            <div className="absolute inset-0 bg-[#FDFAF6]/90 z-10 lg:hidden" />
            <Image
              src={slideAtual.imagem_url_fundo}
              alt="Background"
              fill
              sizes="100vw"
              className="object-cover opacity-10 lg:opacity-20"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Elementos Decorativos (Blobs) ── */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] blob-shape opacity-10 bg-gradient-to-br from-[#008FC7] to-[#1C75BC] pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] blob-shape-alt opacity-10 bg-gradient-to-br from-[#1C75BC] to-[#19194D] pointer-events-none" />

      {/* ── Ícones 3D Flutuantes (Reposicionados para as bordas extremas) ── */}
      <Floating3DIcon 
        src="/icons/3d-book.svg" 
        alt="Livro 3D" 
        width={90} 
        height={90} 
        className="top-32 right-[2%] z-30 hidden xl:block" 
        delay={0.5} 
        rotationAngle={10}
      />
      <Floating3DIcon 
        src="/icons/3d-backpack.svg" 
        alt="Mochila 3D" 
        width={80} 
        height={80} 
        className="top-[40%] -right-4 z-30 hidden lg:block" 
        delay={1.2} 
        floatAmplitude={20}
      />
      <Floating3DIcon 
        src="/icons/3d-pencil.svg" 
        alt="Lápis 3D" 
        width={70} 
        height={70} 
        className="top-40 left-[1%] z-30 hidden xl:block" 
        delay={0.8} 
        rotationAngle={-15}
      />
      <Floating3DIcon 
        src="/icons/3d-ruler.svg" 
        alt="Régua 3D" 
        width={80} 
        height={80} 
        className="bottom-20 -left-4 z-30 hidden lg:block" 
        delay={1.5} 
        floatAmplitude={25}
      />
      <Floating3DIcon 
        src="/icons/3d-ball.svg" 
        alt="Bola 3D" 
        width={80} 
        height={80} 
        className="bottom-10 right-[2%] z-30 hidden lg:block" 
        delay={2.0} 
      />

      {/* ── Conteúdo Principal ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ── Coluna Esquerda: Texto ── */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentVariants}
                animate="visible"
                exit="hidden"
                className="text-center lg:text-left"
              >
                {/* Pílula / Badge Superior */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0F4FF] border border-[#008FC7]/20 mb-6 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#1C75BC]" />
                  <span className="text-xs sm:text-sm font-bold text-[#1C75BC]" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    {slideAtual.badge_texto}
                  </span>
                </div>

                {/* Título Principal - Responsivo com interlineado corrigido */}
                <h1 
                  className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.2] lg:leading-[1.15] mb-6 text-[#2D2D2D] tracking-tight"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                  dangerouslySetInnerHTML={{ __html: slideAtual.titulo_principal }}
                />

                {/* Descrição - Responsiva */}
                <p 
                  className="text-base sm:text-lg lg:text-xl text-[#5A5A6A] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  {slideAtual.subtitulo}
                </p>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                  <a
                    href={slideAtual.link_botao_primario}
                    className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#008FC7] to-[#1C75BC] hover:shadow-xl hover:shadow-[#008FC7]/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    {slideAtual.texto_botao_primario}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={slideAtual.link_botao_secundario}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-[#1C75BC] bg-white border-2 border-[#E0F4FF] hover:border-[#008FC7] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    {slideAtual.texto_botao_secundario}
                  </a>
                </div>

                {/* Estatísticas Rápidas */}
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-16 lg:mb-0">
                  <StatBadge icon={<Award className="w-5 h-5" />} value="32 Anos" label="de história" color="#008FC7" delay={0.6} />
                  <StatBadge icon={<Heart className="w-5 h-5" />} value="+2k" label="alunos" color="#1C75BC" delay={0.8} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Coluna Direita: Imagem de Destaque ── */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative w-[300px] h-[380px] sm:w-[400px] sm:h-[500px] lg:w-[380px] lg:h-[480px] xl:w-[450px] xl:h-[550px]"
              >
                {/* Moldura Decorativa */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#008FC7]/20 to-transparent rounded-[2.5rem] sm:rounded-[3rem] -rotate-6 scale-105" />
                
                {/* Imagem Principal */}
                <div className="relative z-10 w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-white">
                  <Image
                    src={slideAtual.imagem_url_destaque}
                    alt="Escola JERBS"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 450px"
                    priority
                  />
                </div>

                {/* Badge Flutuante "Excelência" - Reposicionado para não cortar */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#F0F8FF]"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFF3CC] flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#FBB03B]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-[#2D2D2D]">Excelência</p>
                    <p className="text-[8px] sm:text-[10px] text-[#9494A8]">Reconhecida</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Controles do Carousel - Corrigidos para Z-Index e Posição ── */}
      <div className="absolute bottom-4 sm:bottom-12 left-0 right-0 z-40 flex flex-col items-center gap-6 pointer-events-none">
        
        {/* Navegação e Indicadores */}
        <div className="flex items-center gap-6 sm:gap-10 pointer-events-auto">
          <button 
            onClick={() => paginate(-1)}
            className="p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[#1C75BC] hover:bg-[#008FC7] hover:text-white transition-all shadow-xl active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Indicadores (Dots) */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#008FC7]' : 'w-2 bg-[#008FC7]/20 hover:bg-[#008FC7]/40'}`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => paginate(1)}
            className="p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-[#1C75BC] hover:bg-[#008FC7] hover:text-white transition-all shadow-xl active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

    </section>
  );
}
