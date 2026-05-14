/**
 * components/sections/DiferenciaisSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção "Por que escolher a JERBS?" com grid de diferenciais.
 */

'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  GraduationCap,
  Utensils,
  Music2,
  Camera,
  Bus,
  HeartHandshake,
} from 'lucide-react';

// ─── Interface para diferencial ───────────────────────────────────────────
interface Diferencial {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  color: string;
  bgColor: string;
}

// ─── Dados dos diferenciais ───────────────────────────────────────────────
const DIFERENCIAIS: Diferencial[] = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    titulo: 'Segurança Total',
    descricao: 'Câmeras, controle de acesso e equipe treinada para garantir a integridade de todos.',
    color: '#008FC7',
    bgColor: '#E0F4FF',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    titulo: 'Equipe Especializada',
    descricao: 'Educadores formados e em constante capacitação, apaixonados pela infância.',
    color: '#1C75BC',
    bgColor: '#E0F4FF',
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    titulo: 'Alimentação Saudável',
    descricao: 'Cardápio nutricional balanceado, preparado com ingredientes frescos e de qualidade.',
    color: '#FBB03B',
    bgColor: '#D8F3DC',
  },
  {
    icon: <Music2 className="w-6 h-6" />,
    titulo: 'Arte e Música',
    descricao: 'Aulas de musicalização e artes plásticas integradas ao currículo pedagógico.',
    color: '#FBB03B',
    bgColor: '#FFF3CC',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    titulo: 'Registro do Crescimento',
    descricao: 'Documentação pedagógica contínua com fotos e portfólios de cada criança.',
    color: '#19194D',
    bgColor: '#E0F4FF',
  },
  {
    icon: <Bus className="w-6 h-6" />,
    titulo: 'Transporte Escolar',
    descricao: 'Parceria com vans escolares credenciadas para facilitar a rotina das famílias.',
    color: '#008FC7',
    bgColor: '#E0F4FF',
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    titulo: 'Família JERBS',
    descricao: 'Comunicação aberta, reuniões frequentes e total transparência com os pais.',
    color: '#1C75BC',
    bgColor: '#E0F4FF',
  },
];

// ─── Componente Principal ──────────────────────────────────────────────────
export default function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#FDFAF6] via-[#FFF5F3] to-[#FDFAF6]">
      {/* Padrão de bolinhas decorativo no fundo */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #008FC7 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Cabeçalho ── */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-[#1C75BC] mb-3"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            ✦ Nossos Diferenciais
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#2D2D2D] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Por que escolher a{' '}
            <span className="text-gradient-coral">JERBS?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#5A5A6A] max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
          >
            Diferenciais que transformam a educação e trazem tranquilidade para os pais.
          </motion.p>
        </div>

        {/* ── Grid de Diferenciais ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIFERENCIAIS.map((item, index) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="clay-card p-6 group cursor-default"
            >
              {/* Ícone */}
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: item.bgColor, color: item.color }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {item.icon}
              </motion.div>

              {/* Título */}
              <h4
                className="text-base font-bold mb-2 text-[#2D2D2D]"
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                {item.titulo}
              </h4>

              {/* Descrição */}
              <p
                className="text-[#5A5A6A] text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
              >
                {item.descricao}
              </p>

              {/* Linha decorativa colorida embaixo (aparece no hover) */}
              <div
                className="h-1 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: item.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
