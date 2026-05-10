/**
 * hooks/useScrollReveal.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Hook customizado que expõe variantes do Framer Motion para animação
 * de entrada de elementos ao rolar a página (scroll reveal).
 *
 * COMO USAR:
 * const { ref, controls, fadeUpVariants } = useScrollReveal();
 * <motion.div ref={ref} animate={controls} variants={fadeUpVariants} initial="hidden">
 */

'use client';

import { useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAnimation, type Variants } from 'framer-motion';

// ─── Interface de retorno do hook ──────────────────────────────────────────
interface ScrollRevealReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  controls: ReturnType<typeof useAnimation>;
  /** Variante: sobe de baixo com fade */
  fadeUpVariants: Variants;
  /** Variante: aparece da esquerda */
  fadeLeftVariants: Variants;
  /** Variante: aparece da direita */
  fadeRightVariants: Variants;
  /** Variante: container com filhos em cascata */
  staggerContainerVariants: Variants;
}

// ─── Hook Principal ────────────────────────────────────────────────────────
export function useScrollReveal(threshold: number = 0.1): ScrollRevealReturn {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold });

  // Dispara a animação quando o elemento entra na tela
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // ── Variantes pré-configuradas ────────────────────────────────────────
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeLeftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return {
    ref,
    controls,
    fadeUpVariants,
    fadeLeftVariants,
    fadeRightVariants,
    staggerContainerVariants,
  };
}
