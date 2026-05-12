/**
 * services/heroService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulação de chamadas RPC para o Supabase (Mocks).
 * Mantém a arquitetura de "Front-end Burro" onde os dados vêm do "servidor".
 */

import { supabase } from './supabaseClient';

export interface SlideHero {
  id: number;
  titulo: string;
  subtitulo: string;
  texto_botao_principal: string;
  link_botao_principal: string;
  texto_botao_secundario: string;
  link_botao_secundario: string;
  imagem_url_fundo: string;
  imagem_url_destaque: string;
  badge_texto: string;
  ordem: number;
}

/**
 * Busca os slides do carousel diretamente do banco via RPC.
 */
export async function buscarSlidesHero(): Promise<SlideHero[]> {
  const { data, error } = await supabase.rpc('buscar_hero');

  if (error) {
    console.error('Erro ao buscar slides da hero:', error);
    return [];
  }

  return data as SlideHero[];
}

/**
 * Salva ou atualiza um slide do hero via RPC.
 */
export async function salvarSlideHero(slide: Partial<SlideHero>): Promise<boolean> {
  const { error } = await supabase.rpc('salvar_hero', { p_slide: slide });

  if (error) {
    console.error('Erro ao salvar slide hero:', error);
    return false;
  }

  return true;
}

/**
 * Exclui um slide do hero pelo ID.
 */
export async function excluirSlideHero(id: number): Promise<boolean> {
  const { error } = await supabase.rpc('excluir_hero', { p_id: id });

  if (error) {
    console.error('Erro ao excluir slide hero:', error);
    return false;
  }

  return true;
}
