/**
 * app/admin/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Página principal do Dashboard Admin.
 * Exibe métricas rápidas e status do sistema.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Image as ImageIcon, MessageSquare, ArrowUpRight, Layout, Loader2, RefreshCw, Phone, X, Trash2 } from 'lucide-react';
import { buscarMetricasAdmin, buscarLeadsRecentes, excluirLead, type MetricasAdmin, type Lead } from '@/services/supabaseService';

export default function AdminDashboard() {
  const [metricas, setMetricas] = useState<MetricasAdmin | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
   const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
   const [leadParaExcluir, setLeadParaExcluir] = useState<Lead | null>(null);
   const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    const [dataMetricas, dataLeads] = await Promise.all([
      buscarMetricasAdmin(),
      buscarLeadsRecentes()
    ]);
    
    if (dataMetricas) setMetricas(dataMetricas);
    if (dataLeads) setLeads(dataLeads);
    setLoading(false);
  }

  if (loading && !metricas) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#008FC7]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-white">Bem-vindo, Administrador</h2>
          <p className="text-white/50">Gerencie o conteúdo da sua landing page em tempo real.</p>
        </div>
        <button 
          onClick={carregarDados}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all text-sm border border-white/10"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
          Atualizar Dados
        </button>
      </header>

      {/* ── Grid de Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        <StatCard 
          icon={<ArrowUpRight className="text-blue-400" />} 
          label="Visitas Hoje" 
          value={metricas?.visitas_hoje?.toString() || '0'} 
          trend="Tempo Real" 
        />
        <StatCard 
          icon={<Users className="text-purple-400" />} 
          label="Total de Visitas" 
          value={metricas?.visitas_total?.toString() || '0'} 
          trend="Acumulado" 
        />
        <StatCard 
          icon={<ImageIcon className="text-emerald-400" />} 
          label="Fotos na Galeria" 
          value={metricas?.galeria_count?.toString() || '0'} 
          trend="Total" 
        />
        <StatCard 
          icon={<Layout className="text-amber-400" />} 
          label="Ambientes Escolares" 
          value={metricas?.instalacoes_count?.toString() || '0'} 
          trend="Estrutura" 
        />
        <StatCard 
          icon={<MessageSquare className="text-rose-400" />} 
          label="Novos Contatos" 
          value={metricas?.leads_novos?.toString() || '0'} 
          trend="Pendentes" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Lista de Leads Recentes ── */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Últimos Contatos</h3>
            <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 font-mono">
              Total: {leads.length} recentes
            </span>
          </div>

          <div className="space-y-4">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <div 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#008FC7]/30 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#008FC7] to-[#1C75BC] flex items-center justify-center text-white font-bold text-lg">
                    {lead.nome_responsavel[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold truncate">{lead.nome_responsavel}</p>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${lead.status === 'novo' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40 font-medium">
                      <span className="flex items-center gap-1"><Users size={12} /> Criança: {lead.nome_crianca}</span>
                      <span className="flex items-center gap-1"><ArrowUpRight size={12} /> {lead.objetivo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-white/20 sm:text-right hidden sm:block">
                      {new Date(lead.criado_em).toLocaleDateString('pt-BR')}
                    </div>
                    <a 
                      href={`https://wa.me/${lead.whatsapp?.replace(/\D/g, '')}`} 
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                      title="Chamar no WhatsApp"
                    >
                      <Phone size={18} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-white/20 italic">
                Nenhum contato recebido ainda.
              </div>
            )}
          </div>
        </div>

        {/* ── Status de Sincronização e Dicas ── */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6">Status do Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Sincronização</span>
                <span className="text-emerald-400 font-bold">Ativa</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Última leitura</span>
                <span className="text-white/60">{metricas?.data_atualizacao ? new Date(metricas.data_atualizacao).toLocaleTimeString('pt-BR') : '--:--'}</span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <QuickLink label="Editar Banner Hero" href="/admin/hero" />
              <QuickLink label="Gerenciar Galeria" href="/admin/galeria" />
              <QuickLink label="Configurações Gerais" href="/admin/configuracoes" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#008FC7] to-[#1C75BC] rounded-[32px] p-8 text-white">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <ArrowUpRight size={20} />
              Dica Sênior
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Responda os novos contatos em menos de 15 minutos para aumentar a chance de matrícula em até 3x!
            </p>
          </div>
        </div>
      </div>

      {/* ── Modal de Detalhes do Lead ── */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedLead(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#16162A] border border-white/10 rounded-[40px] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedLead(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#008FC7] to-[#1C75BC] flex items-center justify-center text-white font-bold text-2xl">
                  {selectedLead.nome_responsavel[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedLead.nome_responsavel}</h3>
                  <p className="text-white/40 text-sm">Recebido em {new Date(selectedLead.criado_em).toLocaleString('pt-BR')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <DetailItem label="Criança" value={selectedLead.nome_crianca} />
                <DetailItem label="Faixa Etária" value={selectedLead.faixa_etaria} />
                <DetailItem label="Turno" value={selectedLead.turno_desejado} />
                <DetailItem label="Objetivo" value={selectedLead.objetivo} />
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 mb-8">
                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Mensagem / Observações</h4>
                <p className="text-sm text-white/80 leading-relaxed italic">
                  "{selectedLead.mensagem || 'Sem observações adicionais.'}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${selectedLead.whatsapp?.replace(/\D/g, '')}`} 
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Phone size={20} />
                  WhatsApp
                </a>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => selectedLead && setLeadParaExcluir(selectedLead)}
                    className="p-4 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold"
                    title="Excluir Lead"
                  >
                    <Trash2 size={20} />
                  </button>

                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal de Confirmação de Exclusão ── */}
      <AnimatePresence>
        {leadParaExcluir && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => !excluindo && setLeadParaExcluir(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-[#1A1A2E] border border-white/10 rounded-[32px] p-8 shadow-2xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-6">
                <Trash2 size={40} />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Excluir Contato?</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Você está prestes a excluir o contato de <span className="text-white font-bold">{leadParaExcluir.nome_responsavel}</span>. Esta ação não pode ser desfeita.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  disabled={excluindo}
                  onClick={async () => {
                    setExcluindo(true);
                    const sucesso = await excluirLead(leadParaExcluir.id);
                    if (sucesso) {
                      setLeadParaExcluir(null);
                      setSelectedLead(null);
                      carregarDados();
                    } else {
                      alert('Erro ao excluir lead.');
                    }
                    setExcluindo(false);
                  }}
                  className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 disabled:opacity-50"
                >
                  {excluindo ? <Loader2 className="animate-spin" size={20} /> : 'Sim, Excluir'}
                </button>
                <button
                  disabled={excluindo}
                  onClick={() => setLeadParaExcluir(null)}
                  className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-bold text-white/30 tracking-wider">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function QuickLink({ label, href }: { label: string, href: string }) {
  return (
    <a href={href} className="block w-full px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-bold text-white/60 hover:text-white">
      {label}
    </a>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-lg bg-white/10 text-white/40`}>
          {trend}
        </span>
      </div>
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
    </motion.div>
  );
}

