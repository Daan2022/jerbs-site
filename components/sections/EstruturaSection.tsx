/**
 * components/sections/EstruturaSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção "Nossa Casa" com cards visuais mostrando as instalações da escola.
 * Consome dados do supabaseService (Mocks de RPC).
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, TreePine, Dumbbell, Monitor, Coffee, Shield, X, 
  ChevronLeft, ChevronRight, type LucideIcon 
} from 'lucide-react';
import { buscarInstalacoes, type Instalacao } from '@/services/supabaseService';

// ─── Mapa de Ícones ────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  building: Building2,
  tree: TreePine,
  dumbbell: Dumbbell,
  monitor: Monitor,
  coffee: Coffee,
  shield: Shield,
};

export default function EstruturaSection() {
  const [instalacoes, setInstalacoes] = useState<Instalacao[]>([
    {
      id: 1,
      nome: 'Salas de Aula',
      descricao: 'Espaços climatizados e lúdicos projetados para cada fase do aprendizado.',
      icone_slug: 'building',
      cor_fundo: '#E8F4FD',
      cor_primaria: '#008FC7',
      imagem_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      nome: 'Área Externa',
      descricao: 'Amplo espaço para brincadeiras ao ar livre e integração com a natureza.',
      icone_slug: 'tree',
      cor_fundo: '#E9F7EF',
      cor_primaria: '#1DB954',
      imagem_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Carregar dados (Mock RPC)
  useEffect(() => {
    setIsMounted(true);
    const carregar = async () => {
      try {
        const dados = await buscarInstalacoes();
        setInstalacoes(dados);
      } catch (err) {
        console.error('Erro ao carregar instalações:', err);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  // Navegar no lightbox
  const abrirLightbox = (index: number) => setLightboxIndex(index);
  const fecharLightbox = () => setLightboxIndex(null);
  
  const irParaAnterior = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? instalacoes.length - 1 : lightboxIndex - 1);
    }
  };
  
  const irParaProximo = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === instalacoes.length - 1 ? 0 : lightboxIndex + 1);
    }
  };


  return (
    <>
      <section id="estrutura" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#FDFAF6] to-[#F0F8FF]">
        {/* Elemento decorativo de fundo */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-30"
          style={{ background: 'radial-gradient(ellipse, #008FC7 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ─── Cabeçalho ─── */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              className="text-sm font-bold uppercase tracking-widest text-[#1C75BC] mb-3"
              style={{ fontFamily: 'var(--font-quicksand)' }}
            >
              ✦ Nossas Instalações
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-[#2D2D2D] mb-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Nossa{' '}
              <span style={{ background: 'linear-gradient(135deg, #C77DFF, #9B59B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Casa
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#5A5A6A] max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
            >
              Um ambiente arquitetônico seguro, moderno e inspirador para erguer sonhos.
            </motion.p>
          </div>

          {/* ─── Grid de Cards ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {instalacoes.map((espaco, index) => {
              const IconComponent = ICON_MAP[espaco.icone_slug] || Building2;
              
              return (
                <motion.div
                  key={espaco.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="clay-card overflow-hidden cursor-pointer group"
                  onClick={() => abrirLightbox(index)}
                >
                  {/* Imagem do espaço */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={espaco.imagem_url}
                      alt={`Foto: ${espaco.nome}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-[#5A5A6A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      🔍 Ampliar
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5 flex gap-3 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: espaco.cor_fundo, color: espaco.cor_primaria }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2D2D2D] mb-1 text-base" style={{ fontFamily: 'var(--font-poppins)' }}>
                        {espaco.nome}
                      </h4>
                      <p className="text-sm text-[#5A5A6A] leading-relaxed font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>
                        {espaco.descricao}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={fecharLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[50vh] sm:h-[60vh]">
                <Image
                  src={instalacoes[lightboxIndex].imagem_url}
                  alt={instalacoes[lightboxIndex].nome}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: instalacoes[lightboxIndex].cor_fundo, color: instalacoes[lightboxIndex].cor_primaria }}
                >
                  {(() => {
                    const IconComp = ICON_MAP[instalacoes[lightboxIndex].icone_slug] || Building2;
                    return <IconComp className="w-6 h-6" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D2D]">{instalacoes[lightboxIndex].nome}</h3>
                  <p className="text-[#5A5A6A] mt-1 font-medium">{instalacoes[lightboxIndex].descricao}</p>
                </div>
              </div>

              <button onClick={fecharLightbox} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"><X /></button>
              <button onClick={(e) => { e.stopPropagation(); irParaAnterior(); }} className="absolute left-4 top-1/3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"><ChevronLeft /></button>
              <button onClick={(e) => { e.stopPropagation(); irParaProximo(); }} className="absolute right-4 top-1/3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"><ChevronRight /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
