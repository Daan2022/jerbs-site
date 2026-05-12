/**
 * app/admin/configuracoes/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerenciamento de Informações da Escola.
 * Edita endereço, telefone, redes sociais e horários.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, MapPin, Phone, MessageCircle, Mail, Clock, Instagram, Facebook, Loader2, CheckCircle, X } from 'lucide-react';
import { buscarConfiguracoes, atualizarConfiguracoes, ConfiguracoesEscola } from '@/services/configuracoesService';

export default function ConfiguracoesAdmin() {
  const [config, setConfig] = useState<ConfiguracoesEscola | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await buscarConfiguracoes();
      if (data) {
        // Garante que campos de lista nunca sejam null
        setConfig({
          ...data,
          faixas_etarias: data.faixas_etarias || [],
          turnos: data.turnos || [],
          objetivos: data.objetivos || []
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setSaved(false);
    try {
      await atualizarConfiguracoes(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => prev ? { ...prev, [name]: value } : null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen">
        <Loader2 className="animate-spin text-[#008FC7]" size={40} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <header className="mb-10">
        <h2 className="text-3xl font-bold mb-2">Configurações Gerais</h2>
        <p className="text-white/50">Atualize as informações de contato e localização da escola.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ── Seção: Localização e Contato ── */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MapPin size={24} className="text-[#008FC7]" />
            Endereço e Contato
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Endereço Completo</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                  name="endereco"
                  value={config?.endereco || ''}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60">Telefone Fixo</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    name="telefone"
                    value={config?.telefone || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60">WhatsApp</label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    name="whatsapp"
                    value={config?.whatsapp || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">E-mail de Contato</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                  name="email"
                  value={config?.email || ''}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors"
                />
              </div>
            </div>
          </div>
        </section>


        {/* ── Seção: Operacional e Social ── */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock size={24} className="text-[#FBB03B]" />
            Horários e Redes Sociais
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/60">Horário de Funcionamento</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                <input
                  name="horario_funcionamento"
                  value={config?.horario_funcionamento || ''}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60">Instagram (URL)</label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    name="instagram_url"
                    value={config?.instagram_url || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/60">Facebook (URL)</label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    name="facebook_url"
                    value={config?.facebook_url || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#008FC7] transition-colors text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Seção: Opções do Formulário de Contato ── */}
        <section className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle size={24} className="text-[#95D5B2]" />
            Opções do Formulário de Contato
          </h3>

          <div className="space-y-8">
            {/* Faixas Etárias */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-white/60 block">Faixas Etárias Disponíveis</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {(config?.faixas_etarias || []).map((faixa, idx) => (
                  <span key={idx} className="px-4 py-2 bg-[#008FC7]/20 border border-[#008FC7]/40 rounded-full text-sm font-medium text-white flex items-center gap-2">
                    {faixa}
                    <button 
                      type="button" 
                      onClick={() => {
                        const novaLista = (config.faixas_etarias || []).filter((_, i) => i !== idx);
                        setConfig({ ...config, faixas_etarias: novaLista });
                      }}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  id="new-faixa"
                  placeholder="Ex: Berçário (4 meses – 1 ano)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#008FC7] transition-colors text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value;
                      if (val && config) {
                        setConfig({ ...config, faixas_etarias: [...config.faixas_etarias, val] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-faixa') as HTMLInputElement;
                    if (input.value && config) {
                      setConfig({ ...config, faixas_etarias: [...config.faixas_etarias, input.value] });
                      input.value = '';
                    }
                  }}
                  className="px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-bold text-white"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Turnos */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-white/60 block">Turnos em Funcionamento</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {(config?.turnos || []).map((turno, idx) => (
                  <span key={idx} className="px-4 py-2 bg-[#FBB03B]/20 border border-[#FBB03B]/40 rounded-full text-sm font-medium text-white flex items-center gap-2">
                    {turno}
                    <button 
                      type="button"
                      onClick={() => {
                        const novaLista = (config.turnos || []).filter((_, i) => i !== idx);
                        setConfig({ ...config, turnos: novaLista });
                      }}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  id="new-turno"
                  placeholder="Ex: Manhã / Tarde"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FBB03B] transition-colors text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value;
                      if (val && config) {
                        setConfig({ ...config, turnos: [...config.turnos, val] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-turno') as HTMLInputElement;
                    if (input.value && config) {
                      setConfig({ ...config, turnos: [...config.turnos, input.value] });
                      input.value = '';
                    }
                  }}
                  className="px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-bold text-white"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Objetivos */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-white/60 block">Objetivos de Contato</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {(config?.objetivos || []).map((obj, idx) => (
                  <span key={idx} className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-sm font-medium text-white flex items-center gap-2">
                    {obj}
                    <button 
                      type="button"
                      onClick={() => {
                        const novaLista = (config.objetivos || []).filter((_, i) => i !== idx);
                        setConfig({ ...config, objetivos: novaLista });
                      }}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  id="new-objetivo"
                  placeholder="Ex: Informações de matrícula"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value;
                      if (val && config) {
                        setConfig({ ...config, objetivos: [...config.objetivos, val] });
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('new-objetivo') as HTMLInputElement;
                    if (input.value && config) {
                      setConfig({ ...config, objetivos: [...config.objetivos, input.value] });
                      input.value = '';
                    }
                  }}
                  className="px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-bold text-white"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Botão de Salvar Fixo (ou no final) ── */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-10 py-5 rounded-2xl bg-[#008FC7] hover:bg-[#1C75BC] disabled:opacity-50 text-white font-bold transition-all shadow-xl shadow-[#008FC7]/20 flex items-center gap-3"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <Save size={24} />
            )}
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-400 font-semibold"
            >
              <CheckCircle size={20} />
              Configurações atualizadas!
            </motion.div>
          )}
        </div>
      </form>
    </div>
  );
}
