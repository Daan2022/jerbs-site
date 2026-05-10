/**
 * components/Floating3DIcon.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Componente reutilizável para exibir imagens 3D flutuantes com animação yoyo.
 * Utiliza Framer Motion para o efeito de subir e descer suavemente (loop infinito).
 *
 * COMO USAR:
 * <Floating3DIcon
 *   src="/icons/3d-book.png"
 *   alt="Livro 3D decorativo"
 *   width={120}
 *   height={120}
 *   floatAmplitude={20}
 *   duration={3}
 *   delay={0.5}
 *   className="top-10 right-20"
 * />
 */

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Interface de Props ────────────────────────────────────────────────────
interface Floating3DIconProps {
  /** Caminho da imagem (dentro da pasta /public) */
  src: string;
  /** Texto alternativo para acessibilidade */
  alt: string;
  /** Largura em pixels da imagem */
  width: number;
  /** Altura em pixels da imagem */
  height: number;
  /** Amplitude do efeito flutuante em pixels (padrão: 15) */
  floatAmplitude?: number;
  /** Duração de um ciclo completo da animação em segundos (padrão: 3) */
  duration?: number;
  /** Atraso inicial da animação em segundos (padrão: 0) */
  delay?: number;
  /** Classes Tailwind adicionais para posicionamento */
  className?: string;
  /** Rotação sutil durante a flutuação em graus (padrão: 5) */
  rotationAngle?: number;
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function Floating3DIcon({
  src,
  alt,
  width,
  height,
  floatAmplitude = 15,
  duration = 3,
  delay = 0,
  className = '',
  rotationAngle = 5,
}: Floating3DIconProps) {
  // Variantes da animação: define os estados "baixo" e "cima" do efeito yoyo
  const floatVariants = {
    down: {
      y: 0,
      rotate: 0,
    },
    up: {
      y: -floatAmplitude,
      rotate: rotationAngle,
    },
  };

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      // Animação de entrada: o ícone aparece com fade + escala suave
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay, type: 'spring', stiffness: 200 },
      }}
    >
      {/* Animação de flutuação yoyo (loop infinito) */}
      <motion.div
        variants={floatVariants}
        initial="down"
        animate="up"
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: 'reverse', // <- Isso cria o efeito YOYO (vai e volta)
          ease: 'easeInOut',
        }}
        // Sombra dinâmica que muda junto com a flutuação (dá profundidade)
        style={{
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          // priority garante que ícones do hero carreguem rapidamente
          priority
          style={{ objectFit: 'contain' }}
        />
      </motion.div>
    </motion.div>
  );
}
