/**
 * components/sections/SobreSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção "Sobre Nós" com linha do tempo e metodologia da escola.
 * Utiliza whileInView diretamente para garantir compatibilidade com dispositivos móveis.
 */

'use client';

import { motion } from 'framer-motion';
import { Heart, BookOpen, Lightbulb, Users } from 'lucide-react';

// ─── Interface para card de valor ─────────────────────────────────────────
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  delay: number;
}

// ─── Dados dos valores da escola ──────────────────────────────────────────
const VALUES: Omit<ValueCardProps, 'delay'>[] = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Amor & Cuidado',
    description: 'Cada criança é acolhida com carinho genuíno e atenção individualizada.',
    color: '#008FC7',
    bgColor: '#E0F4FF',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Educação de Qualidade',
    description: 'Currículo pedagógico atualizado e alinhado com as melhores práticas.',
    color: '#1C75BC',
    bgColor: '#E0F4FF',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Desenvolvimento Integral',
    description: 'Estimulamos o cognitivo, emocional, social e motor de cada pequeno.',
    color: '#FBB03B',
    bgColor: '#FFF3CC',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Parceria com as Famílias',
    description: 'Comunicação transparente e constante com pais e responsáveis.',
    color: '#C1272D',
    bgColor: '#D8F3DC',
  },
];

// ─── Variantes de animação reutilizáveis ──────────────────────────────────
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Sub-componente: Card de Valor ────────────────────────────────────────
function ValueCard({ icon, title, description, color, bgColor, delay }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay }}
      className="clay-card p-6"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: bgColor, color }}
      >
        {icon}
      </div>
      <h4
        className="text-lg font-bold mb-2 text-[#2D2D2D]"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {title}
      </h4>
      <p
        className="text-[#5A5A6A] text-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
      >
        {description}
      </p>
    </motion.div>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function SobreSection() {
  return (
    <section id="sobre" className="relative py-24 overflow-hidden">
      {/* Blob decorativo de fundo */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] blob-shape opacity-20"
        style={{ background: 'radial-gradient(circle, #008FC7 0%, #1C75BC 60%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Cabeçalho da Seção ── */}
        <div className="text-center mb-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeLeft}
            className="text-sm font-bold uppercase tracking-widest text-[#1C75BC] mb-3"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            ✦ Quem Somos
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeRight}
            className="text-4xl md:text-5xl font-black text-[#2D2D2D] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Nossa{' '}
            <span className="text-gradient-blue">Trajetória</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeLeft}
            className="text-lg text-[#5A5A6A] max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
          >
            Construindo o futuro desde 1994 com muito amor e carinho.
          </motion.p>
        </div>

        {/* ── Grid Principal: Texto + Visual ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Coluna de texto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeLeft}
          >
            <div className="clay-card p-8 bg-gradient-to-br from-[#E0F4FF] to-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#008FC7] to-[#1C75BC] flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <p className="text-xs text-[#9494A8] font-medium uppercase tracking-wide">Fundada em</p>
                  <p className="text-2xl font-black text-[#1C75BC]" style={{ fontFamily: 'var(--font-poppins)' }}>
                    1994
                  </p>
                </div>
              </div>

              <p
                className="text-[#5A5A6A] leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
              >
                A Escola JERBS nasceu de um sonho simples, porém poderoso: oferecer um espaço
                onde cada criança pudesse <strong className="text-[#2D2D2D]">crescer com segurança,
                afeto e excelência pedagógica</strong>.
              </p>
              <p
                className="text-[#5A5A6A] leading-relaxed"
                style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
              >
                Ao longo de mais de três décadas, construímos uma história de amor pela
                educação infantil em Carapicuíba, formando gerações de crianças felizes e
                preparadas para o mundo.
              </p>

              {/* Linha divisória decorativa */}
              <div className="h-px bg-gradient-to-r from-[#008FC7] via-[#1C75BC] to-transparent my-6" />

              {/* Metodologia */}
              <div className="bg-[#E0F4FF] rounded-2xl p-5">
                <h4
                  className="font-bold text-[#2D2D2D] mb-2 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  <BookOpen className="w-5 h-5 text-[#1C75BC]" />
                  Nossa Metodologia
                </h4>
                <p
                  className="text-[#5A5A6A] text-sm leading-relaxed font-medium italic"
                  style={{ fontFamily: 'var(--font-quicksand)' }}
                >
                  "Aprender brincando, crescer descobrindo."
                </p>
                <p
                  className="text-[#5A5A6A] text-sm leading-relaxed mt-2"
                  style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
                >
                  Nossa abordagem lúdica integra brincadeiras estruturadas, arte, música e
                  contato com a natureza para estimular o desenvolvimento pleno.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Coluna visual: linha do tempo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeRight}
            className="flex flex-col gap-4"
          >
            {[
              { year: '1994', event: 'Fundação da Escola JERBS', color: '#19194D' },
              { year: '2000', event: 'Expansão para o Maternal', color: '#008FC7' },
              { year: '2010', event: 'Modernização da Estrutura', color: '#FBB03B' },
              { year: '2020', event: 'Nova Metodologia Pedagógica', color: '#C1272D' },
              { year: 'Hoje', event: '+2.000 famílias atendidas', color: '#1C75BC' },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className="w-16 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 text-white"
                  style={{ fontFamily: 'var(--font-poppins)', backgroundColor: item.color }}
                >
                  {item.year}
                </div>
                <div className="clay-card px-5 py-3 flex-1">
                  <p
                    className="text-[#2D2D2D] font-semibold text-sm"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Grid de Valores ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, index) => (
            <ValueCard key={value.title} {...value} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
