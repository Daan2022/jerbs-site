/**
 * components/sections/TurmasSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção "Nossas Turmas" com cards interativos para cada fase do aprendizado.
 */

'use client';

import { motion } from 'framer-motion';
import { Baby, Star, Smile, BookOpen, Rocket } from 'lucide-react';

// ─── Interface para dados de turma ────────────────────────────────────────
interface TurmaData {
  id: string;
  icon: React.ReactNode;
  nome: string;
  faixa: string;
  descricao: string;
  atividades: string[];
  color: string;
  bgColor: string;
  bgGradient: string;
  emoji: string;
}

// ─── Dados das turmas ─────────────────────────────────────────────────────
const TURMAS: TurmaData[] = [
  {
    id: 'bercario',
    icon: <Baby className="w-7 h-7" />,
    nome: 'Berçário',
    faixa: '4 meses – 1 ano',
    descricao:
      'Um ambiente aconchegante e seguro para os primeiros meses de vida. Estimulação sensorial, afeto e cuidado integral.',
    atividades: ['Estimulação sensorial', 'Música e movimentos', 'Banho de sol'],
    color: '#008FC7',
    bgColor: '#E0F4FF',
    bgGradient: 'from-[#E0F4FF] to-[#B8E4FA]',
    emoji: '🍼',
  },
  {
    id: 'mini-maternal',
    icon: <Smile className="w-7 h-7" />,
    nome: 'Mini Maternal',
    faixa: '1 – 2 anos',
    descricao:
      'Desenvolvimento da autonomia e primeiras descobertas. Atividades lúdicas que estimulam a linguagem e a coordenação.',
    atividades: ['Artes visuais', 'Música interativa', 'Brincadeiras simbólicas'],
    color: '#1C75BC',
    bgColor: '#E0F4FF',
    bgGradient: 'from-[#E0F4FF] to-[#EBF8FF]',
    emoji: '🌱',
  },
  {
    id: 'maternal',
    icon: <Star className="w-7 h-7" />,
    nome: 'Maternal',
    faixa: '2 – 3 anos',
    descricao:
      'Expansão da linguagem, socialização e criatividade. Um mundo de descobertas guiadas por educadores apaixonados.',
    atividades: ['Contação de histórias', 'Dança e ritmo', 'Jogos cooperativos'],
    color: '#FBB03B',
    bgColor: '#FFF3CC',
    bgGradient: 'from-[#FFF3CC] to-[#FFFAE0]',
    emoji: '🌟',
  },
  {
    id: 'fase-1',
    icon: <BookOpen className="w-7 h-7" />,
    nome: 'Fase I',
    faixa: '3 – 4 anos',
    descricao:
      'Introdução à pré-alfabetização com projetos temáticos. Desenvolvimento do pensamento lógico e da escrita espontânea.',
    atividades: ['Pré-leitura e escrita', 'Projetos temáticos', 'Educação física'],
    color: '#C1272D',
    bgColor: '#FFE8E4',
    bgGradient: 'from-[#FFE8E4] to-[#FFF0ED]',
    emoji: '📚',
  },
  {
    id: 'fase-2',
    icon: <Rocket className="w-7 h-7" />,
    nome: 'Fase II',
    faixa: '4 – 5 anos',
    descricao:
      'Preparação completa para o Ensino Fundamental. Letramento, pensamento matemático e desenvolvimento socioemocional.',
    atividades: ['Letramento', 'Matemática lúdica', 'Ciências e natureza'],
    color: '#19194D',
    bgColor: '#E0F4FF',
    bgGradient: 'from-[#E0F4FF] to-[#B8E4FA]',
    emoji: '🚀',
  },
];

// ─── Sub-componente: Card de Turma ────────────────────────────────────────
function TurmaCard({ turma, index }: { turma: TurmaData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="clay-card overflow-hidden cursor-default group"
    >
      {/* Cabeçalho colorido do card */}
      <div
        className={`bg-gradient-to-br ${turma.bgGradient} p-6 pb-4 relative`}
      >
        {/* Emoji decorativo grande */}
        <span className="absolute top-3 right-4 text-4xl opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          {turma.emoji}
        </span>

        {/* Ícone */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-md"
          style={{ backgroundColor: turma.color, color: 'white' }}
        >
          {turma.icon}
        </div>

        {/* Nome e faixa etária */}
        <h3
          className="text-2xl font-black mb-1"
          style={{ fontFamily: 'var(--font-poppins)', color: turma.color }}
        >
          {turma.nome}
        </h3>
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: turma.color }}
        >
          {turma.faixa}
        </span>
      </div>

      {/* Corpo do card */}
      <div className="p-6 pt-4">
        <p
          className="text-[#5A5A6A] text-sm leading-relaxed mb-4"
          style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
        >
          {turma.descricao}
        </p>

        {/* Lista de atividades */}
        <div className="flex flex-col gap-2">
          {turma.atividades.map((atividade) => (
            <div key={atividade} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: turma.color }}
              />
              <span
                className="text-xs text-[#5A5A6A] font-medium"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {atividade}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function TurmasSection() {
  return (
    <section id="turmas" className="relative py-24 overflow-hidden">
      {/* Blob decorativo */}
      <div
        className="absolute bottom-0 left-0 w-[450px] h-[450px] blob-shape-alt opacity-20"
        style={{ background: 'radial-gradient(circle, #FBB03B 0%, #008FC7 60%, transparent 100%)' }}
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
            ✦ Para Cada Fase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#2D2D2D] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Fases do{' '}
            <span className="text-gradient-blue">Aprendizado</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#5A5A6A] max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
          >
            Um espaço lúdico e ideal para cada etapa do seu filho.
          </motion.p>
        </div>

        {/* ── Grid de Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {TURMAS.map((turma, index) => (
            <TurmaCard key={turma.id} turma={turma} index={index} />
          ))}
        </div>

        {/* ── CTA abaixo dos cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#contato"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#008FC7] to-[#1C75BC] hover:shadow-xl hover:shadow-blue-300/40 hover:-translate-y-1 transition-all duration-300"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Verificar Vagas Disponíveis →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
