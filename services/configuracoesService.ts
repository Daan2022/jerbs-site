/**
 * services/configuracoesService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerencia as configurações globais da escola (contatos, redes sociais, horários).
 * Consome dados reais do Supabase via RPCs.
 */

import { supabase } from './supabaseClient';

export interface ConfiguracoesEscola {
  id: number;
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: string;
  instagram_url: string;
  facebook_url: string;
  horario_funcionamento: string;
  // Campos dinâmicos para o formulário de contato
  faixas_etarias: string[];
  turnos: string[];
  objetivos: string[];
}

/**
 * Busca todas as configurações da escola via RPC: buscar_configuracoes
 */
export async function buscarConfiguracoes(): Promise<ConfiguracoesEscola | null> {
  const { data, error } = await supabase.rpc('buscar_configuracoes');

  if (error) {
    console.error('Erro ao buscar configurações:', error);
    return null;
  }

  // A RPC retorna um array, pegamos o primeiro registro
  const config = Array.isArray(data) ? data[0] : data;
  return config as ConfiguracoesEscola;
}

/**
 * Atualiza as configurações no banco de dados.
 */
export async function atualizarConfiguracoes(config: Partial<ConfiguracoesEscola>): Promise<boolean> {
  const { error } = await supabase.rpc('atualizar_configuracoes', { p_config: config });

  if (error) {
    console.error('Erro ao atualizar configurações:', error);
    return false;
  }

  return true;
}
