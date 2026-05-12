/**
 * services/supabaseService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Serviço real de conexão com o Supabase.
 * Centraliza a busca de dados seguindo o padrão de "Front-end Burro".
 * Toda regra de negócio e estrutura de dados vem do banco de dados via RPCs.
 */

import { supabase } from './supabaseClient';

// ─── Interfaces Reais (Sincronizadas com o Banco) ──────────────────────────

export interface Instalacao {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
  imagem_url: string;
  categoria: string;
  ordem: number;
}

export interface MetricasAdmin {
  hero_count: number;
  instalacoes_count: number;
  galeria_count: number;
  leads_novos: number;
  visitas_hoje: number;
  visitas_total: number;
  data_atualizacao: string;
}

export interface Lead {
  id: number;
  nome_responsavel: string;
  whatsapp: string;
  nome_crianca: string;
  faixa_etaria: string;
  turno_desejado: string;
  objetivo: string;
  mensagem: string;
  status: string;
  criado_em: string;
}

export interface ItemGaleria {
  id: number | string;
  titulo: string;
  descricao?: string;
  categoria: string;
  imagem_url: string;
  icone_slug?: string;
  cor_inicio?: string;
  cor_fim?: string;
  col_span?: number;
  row_span?: number;
  ordem?: number;
}

// ─── Funções de Busca (Consumindo RPCs) ────────────────────────────────────

/**
 * Busca as instalações da escola via RPC: buscar_instalacoes
 */
export async function buscarInstalacoes(): Promise<Instalacao[]> {
  const { data, error } = await supabase.rpc('buscar_instalacoes');

  if (error) {
    console.error('Erro ao buscar instalações:', error);
    return [];
  }

  return data as Instalacao[];
}

/**
 * Busca os itens da galeria via RPC: buscar_galeria
 */
export async function buscarGaleria(): Promise<ItemGaleria[]> {
  const { data, error } = await supabase.rpc('buscar_galeria');

  if (error) {
    console.error('Erro ao buscar galeria:', error);
    return [];
  }

  return data as ItemGaleria[];
}

/**
 * Salva ou atualiza um item na galeria via RPC.
 */
export async function salvarItemGaleria(item: Partial<ItemGaleria>): Promise<boolean> {
  const { error } = await supabase.rpc('salvar_galeria', { p_item: item });

  if (error) {
    console.error('Erro ao salvar item galeria:', error);
    return false;
  }

  return true;
}

/**
 * Exclui um item da galeria pelo ID.
 */
export async function excluirItemGaleria(id: number | string): Promise<boolean> {
  const { error } = await supabase.rpc('excluir_galeria', { p_id: id });

  if (error) {
    console.error('Erro ao excluir item galeria:', error);
    return false;
  }

  return true;
}

/**
 * Busca a galeria completa (pode ser usada em páginas específicas de fotos)
 */
export async function buscarGaleriaCompleta(): Promise<ItemGaleria[]> {
  const { data, error } = await supabase.rpc('buscar_galeria');

  if (error) {
    console.error('Erro ao buscar galeria completa:', error);
    return [];
  }

  return data as ItemGaleria[];
}

// ─── Funções Administrativas (Protegidas por RLS/Políticas do Banco) ───────

/**
 * Salva ou atualiza uma instalação via RPC.
 */
export async function salvarInstalacao(instalacao: Partial<Instalacao>): Promise<boolean> {
  const { error } = await supabase.rpc('salvar_instalacao', { p_item: instalacao });

  if (error) {
    console.error('Erro ao salvar instalação:', error);
    return false;
  }

  return true;
}

/**
 * Exclui uma instalação pelo ID.
 */
export async function excluirInstalacao(id: number | string): Promise<boolean> {
  const { error } = await supabase.rpc('excluir_instalacao', { p_id: id });

  if (error) {
    console.error('Erro ao excluir instalação:', error);
    return false;
  }

  return true;
}

/**
 * Busca as métricas consolidadas para o dashboard.
 */
export async function buscarMetricasAdmin(): Promise<MetricasAdmin | null> {
  const { data, error } = await supabase.rpc('buscar_metricas_admin');

  if (error) {
    console.error('Erro ao buscar métricas:', error);
    return null;
  }

  return data as MetricasAdmin;
}

/**
 * Salva um lead (contato) vindo do formulário do site.
 */
export interface LeadForm {
  nomeResponsavel: string;
  whatsapp: string;
  nomeCrianca: string;
  faixaEtaria: string;
  turnoDesejado: string;
  objetivo: string;
  observacoes: string;
}

export async function salvarLead(lead: LeadForm): Promise<boolean> {
  const { error } = await supabase.rpc('salvar_lead', { p_lead: lead });

  if (error) {
    console.error('Erro ao salvar lead:', error);
    return false;
  }

  return true;
}

/**
 * Exclui um lead permanentemente pelo ID.
 */
export async function excluirLead(id: number): Promise<boolean> {
  const { error } = await supabase.rpc('excluir_lead', { p_id: id });

  if (error) {
    console.error('Erro ao excluir lead:', error);
    return false;
  }

  return true;
}

/**
 * Busca os 5 leads mais recentes para o dashboard.
 */
export async function buscarLeadsRecentes(): Promise<Lead[]> {
  const { data, error } = await supabase.rpc('buscar_leads_recentes');

  if (error) {
    console.error('Erro ao buscar leads recentes:', error);
    return [];
  }

  return data as Lead[];
}

/**
 * Registra uma visita ao site (analíticos internos).
 */
export async function registrarVisita(): Promise<void> {
  if (typeof window !== 'undefined') {
    const jaVisitou = sessionStorage.getItem('jerbs_visit_registered');
    if (jaVisitou) return;
    
    const { error } = await supabase.rpc('registrar_visita');
    if (!error) {
      sessionStorage.setItem('jerbs_visit_registered', 'true');
    }
  }
}
