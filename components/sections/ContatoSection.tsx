/**
 * components/sections/ContatoSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção final de CTA com formulário multi-etapa dinâmico.
 * Consome dados dinâmicos do configuracoesService para faixas etárias, turnos e objetivos.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, Star, CheckCircle2, 
  ChevronRight, ArrowLeft, MessageCircle, User, Baby, Calendar, Target
} from 'lucide-react';
import { buscarConfiguracoes, ConfiguracoesEscola } from '@/services/configuracoesService';
import Image from 'next/image';

// ─── Interface para dados do formulário ───────────────────────────────────
interface FormData {
  nomeResponsavel: string;
  whatsapp: string;
  nomeCrianca: string;
  faixaEtaria: string;
  idadeExata: string;
  turnoDesejado: string;
  objetivo: string;
  observacoes: string;
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function ContatoSection() {
  const [config, setConfig] = useState<ConfiguracoesEscola | null>(null);
  const [loading, setLoading] = useState(true);
  const [etapa, setEtapa] = useState<number>(1);

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    nomeResponsavel: '',
    whatsapp: '',
    nomeCrianca: '',
    faixaEtaria: '',
    idadeExata: '',
    turnoDesejado: '',
    objetivo: '',
    observacoes: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await buscarConfiguracoes();
        setConfig(data);
        // Valores iniciais padrão baseados no banco
        if (data) {
          setFormData(prev => ({
            ...prev,
            faixaEtaria: data.faixas_etarias[0] || '',
            turnoDesejado: data.turnos[1] || '', // Tarde por padrão como sugerido
            objetivo: data.objetivos[0] || ''
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar configurações de contato:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const proximaEtapa = () => setEtapa(prev => prev + 1);
  const etapaAnterior = () => setEtapa(prev => prev - 1);

  const enviarFormulario = (e: React.FormEvent) => {
    e.preventDefault();
    setEtapa(3); // Vai para o resumo/sucesso
  };

  const reiniciarForm = () => {
    setEtapa(1);
    setFormData({
      nomeResponsavel: '',
      whatsapp: '',
      nomeCrianca: '',
      faixaEtaria: config?.faixas_etarias[0] || '',
      idadeExata: '',
      turnoDesejado: config?.turnos[1] || '',
      objetivo: config?.objetivos[0] || '',
      observacoes: '',
    });
  };

  const gerarLinkWhatsApp = () => {
    const msg = `Olá! Acabei de preencher o formulário no site.%0A%0A` +
      `*Dados Principais:*%0A` +
      `- Responsável: ${formData.nomeResponsavel}%0A` +
      `- WhatsApp: ${formData.whatsapp}%0A` +
      `- Criança: ${formData.nomeCrianca}%0A` +
      `- Faixa Etária: ${formData.faixaEtaria}%0A` +
      `- Idade Exata: ${formData.idadeExata || 'Não informada'}%0A%0A` +
      `*Detalhes:*%0A` +
      `- Turno: ${formData.turnoDesejado}%0A` +
      `- Objetivo: ${formData.objetivo}%0A` +
      `- Observações: ${formData.observacoes || 'Nenhuma'}`;
    
    return `https://wa.me/55${config?.whatsapp.replace(/\D/g, '')}?text=${msg}`;
  };

  if (loading) return null;

  const CONTATO_INFOS = [
    { icon: <MapPin className="w-5 h-5" />, titulo: 'Endereço', valor: config?.endereco || '', cor: '#008FC7' },
    { icon: <Phone className="w-5 h-5" />, titulo: 'Contato Central', valor: `${config?.telefone} / ${config?.whatsapp}`, cor: '#1C75BC' },
    { icon: <Mail className="w-5 h-5" />, titulo: 'E-mail', valor: config?.email || '', cor: '#FBB03B' },
    { icon: <Clock className="w-5 h-5" />, titulo: 'Horário', valor: config?.horario_funcionamento || '', cor: '#FFD166' },
  ];

  return (
    <>
      <section id="contato" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#2D2D2D] via-[#3A3A4A] to-[#2D2D2D]">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] blob-shape opacity-10" style={{ background: 'radial-gradient(circle, #008FC7 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] blob-shape-alt opacity-10" style={{ background: 'radial-gradient(circle, #1C75BC 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ── Cabeçalho ── */}
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008FC7]/20 border border-[#008FC7]/40 mb-6">
              <Star className="w-4 h-4 text-[#008FC7] fill-[#008FC7]" />
              <span className="text-sm font-semibold text-[#008FC7]" style={{ fontFamily: 'var(--font-quicksand)' }}>Vagas abertas para 2025!</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Agende sua <span className="text-gradient-coral">Visita</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/70 max-w-xl mx-auto font-medium" style={{ fontFamily: 'var(--font-quicksand)' }}>
              Preencha em menos de 1 minuto. Retornamos pelo WhatsApp.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* ── Formulário Multi-Step ── */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Barra de Progresso */}
              {etapa < 3 && (
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${etapa >= 1 ? 'bg-[#008FC7] text-white' : 'bg-white/20 text-white/40'}`}>1</div>
                    <span className={`text-sm font-bold ${etapa === 1 ? 'text-white' : 'text-white/40'}`}>Dados principais</span>
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${etapa >= 2 ? 'bg-[#008FC7] text-white' : 'bg-white/20 text-white/40'}`}>2</div>
                    <span className={`text-sm font-bold ${etapa === 2 ? 'text-white' : 'text-white/40'}`}>Detalhes</span>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {etapa === 1 && (
                  <motion.div key="etapa1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><User className="w-4 h-4 text-[#008FC7]" /> Nome do responsável</label>
                      <input type="text" name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} placeholder="Seu nome completo" className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><MessageCircle className="w-4 h-4 text-[#008FC7]" /> WhatsApp</label>
                      <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="(11) 91234-5678" className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><Baby className="w-4 h-4 text-[#008FC7]" /> Nome da criança</label>
                        <input type="text" name="nomeCrianca" value={formData.nomeCrianca} onChange={handleChange} placeholder="Nome do pequeno(a)" className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><Calendar className="w-4 h-4 text-[#008FC7]" /> Faixa etária (obrigatório)</label>
                        <select name="faixaEtaria" value={formData.faixaEtaria} onChange={handleChange} className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] outline-none transition-all appearance-none cursor-pointer">
                          {config?.faixas_etarias.map(f => <option key={f} value={f} className="bg-[#2D2D2D]">{f}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 text-center sm:text-left">Idade exata (opcional)</label>
                      <input type="text" name="idadeExata" value={formData.idadeExata} onChange={handleChange} placeholder="Ex.: 2 anos e 3 meses / 8 meses" className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] outline-none transition-all" />
                    </div>
                    <button onClick={proximaEtapa} disabled={!formData.nomeResponsavel || !formData.whatsapp} className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#008FC7] to-[#1C75BC] text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#008FC7]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      Continuar <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {etapa === 2 && (
                  <motion.div key="etapa2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><Clock className="w-4 h-4 text-[#008FC7]" /> Turno desejado</label>
                      <select name="turnoDesejado" value={formData.turnoDesejado} onChange={handleChange} className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] outline-none transition-all cursor-pointer">
                        {config?.turnos.map(t => <option key={t} value={t} className="bg-[#2D2D2D]">{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-white/80 mb-2"><Target className="w-4 h-4 text-[#008FC7]" /> Objetivo</label>
                      <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] outline-none transition-all cursor-pointer">
                        {config?.objetivos.map(o => <option key={o} value={o} className="bg-[#2D2D2D]">{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2">Observações (opcional)</label>
                      <textarea name="observacoes" value={formData.observacoes} onChange={handleChange} rows={3} placeholder="Alguma informação importante?" className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white focus:border-[#008FC7] outline-none transition-all resize-none" />
                    </div>
                    
                    <div className="flex gap-4 pt-2">
                      <button onClick={etapaAnterior} className="flex-1 py-4 rounded-2xl border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-5 h-5" /> Voltar
                      </button>
                      <button onClick={enviarFormulario} className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-[#008FC7] to-[#1C75BC] text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#008FC7]/20 transition-all">
                        Enviar <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-white/40 text-center leading-relaxed">
                      Ao enviar, você autoriza contato para retorno sobre matrícula (LGPD). <br />
                      <span className="underline cursor-pointer hover:text-white transition-colors">Política de Privacidade</span>.
                    </p>
                  </motion.div>
                )}

                {etapa === 3 && (
                  <motion.div key="etapa3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#95D5B2]/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-[#95D5B2]" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Enviado com sucesso</h3>
                    <p className="text-white/60 text-center mb-8 font-medium">Obrigado! Já recebemos seu contato. Nossa equipe vai retornar pelo WhatsApp.</p>
                    
                    <div className="w-full bg-white/5 rounded-3xl border border-white/10 p-6 mb-8 space-y-4">
                      <h4 className="text-xs font-bold text-[#008FC7] uppercase tracking-widest mb-2">Resumo do envio</h4>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div><p className="text-white/40 mb-0.5">Responsável</p><p className="text-white font-semibold">{formData.nomeResponsavel}</p></div>
                        <div><p className="text-white/40 mb-0.5">WhatsApp</p><p className="text-white font-semibold">{formData.whatsapp}</p></div>
                        <div><p className="text-white/40 mb-0.5">Criança</p><p className="text-white font-semibold">{formData.nomeCrianca}</p></div>
                        <div><p className="text-white/40 mb-0.5">Faixa etária</p><p className="text-white font-semibold">{formData.faixaEtaria}</p></div>
                        {formData.idadeExata && <div><p className="text-white/40 mb-0.5">Idade</p><p className="text-white font-semibold">{formData.idadeExata}</p></div>}
                        <div><p className="text-white/40 mb-0.5">Turno</p><p className="text-white font-semibold">{formData.turnoDesejado}</p></div>
                        <div className="col-span-2"><p className="text-white/40 mb-0.5">Objetivo</p><p className="text-white font-semibold">{formData.objetivo}</p></div>
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <a href={gerarLinkWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold hover:shadow-xl hover:shadow-green-500/20 transition-all">
                        <MessageCircle className="w-6 h-6" /> Abrir WhatsApp com mensagem pronta
                      </a>
                      <button onClick={reiniciarForm} className="w-full py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                        Enviar outro contato
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Informações de Contato Lateral ── */}
            <div className="flex flex-col gap-6 lg:pt-4">
              {CONTATO_INFOS.map((info, idx) => (
                <motion.div key={info.titulo} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[24px] p-6 hover:border-white/20 transition-all">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: info.cor + '20', color: info.cor }}>{info.icon}</div>
                  <div>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-quicksand)' }}>{info.titulo}</p>
                    <p className="text-white font-bold leading-relaxed" style={{ fontFamily: 'var(--font-quicksand)' }}>{info.valor}</p>
                  </div>
                </motion.div>
              ))}

              {/* Botão Flutuante Secundário ou Chamada Direta */}
              <div className="mt-4 p-8 rounded-[32px] bg-gradient-to-br from-[#008FC7]/10 to-transparent border border-[#008FC7]/20">
                <h4 className="text-white font-bold mb-2">Prefere falar agora?</h4>
                <p className="text-white/60 text-sm mb-6">Nossa secretaria está disponível para tirar suas dúvidas em tempo real.</p>
                <a href={`https://wa.me/55${config?.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#008FC7] font-bold hover:gap-3 transition-all">
                  Chamar no WhatsApp <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rodapé Simples ── */}
      <footer className="bg-[#1A1A2E] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/images/icon-logo-jerbs.png" alt="Logo Escola JERBS" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white leading-none">Escola JERBS</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Desde 1994</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-center md:text-right">
            <p className="text-sm text-white/60 font-medium">© {new Date().getFullYear()} Escola JERBS · Carapicuíba, SP</p>
            <p className="text-xs text-white/30">Educação que Transforma · Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
}
