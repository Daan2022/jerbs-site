'use client';

import { useEffect } from 'react';
import { registrarVisita } from '@/services/supabaseService';

/**
 * VisitTracker
 * ─────────────────────────────────────────────────────────────────────────────
 * Componente invisível que registra a visita do usuário no banco de dados.
 * Usa sessionStorage para evitar contagens duplicadas na mesma sessão.
 */
export default function VisitTracker() {
  useEffect(() => {
    registrarVisita();
  }, []);

  return null; // Não renderiza nada na tela
}
