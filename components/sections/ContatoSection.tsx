/**
 * components/sections/ContatoSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Seção final de CTA com formulário de contato e informações da escola.
 * Consome dados dinâmicos do configuracoesService.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Star, CheckCircle2 } from 'lucide-react';
import { buscarConfiguracoes, ConfiguracoesEscola } from '@/services/configuracoesService';
import Image from 'next/image';

// ─── Interface para dados do formulário ───────────────────────────────────
interface FormData {
  nomeResponsavel: string;
  nomeCrianca: string;
  telefone: string;
  email: string;
  turmaInteresse: string;
  mensagem: string;
}

// ─── Componente Principal ──────────────────────────────────────────────────
export default function ContatoSection() {
  const [config, setConfig] = useState<ConfiguracoesEscola | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    nomeResponsavel: '',
    nomeCrianca: '',
    telefone: '',
    email: '',
    turmaInteresse: '',
    mensagem: '',
  });

  // Estado de envio (sucesso)
  const [enviado, setEnviado] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await buscarConfiguracoes();
        setConfig(data);
      } catch (error) {
        console.error('Erro ao carregar configurações de contato:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Handler de mudança genérico
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    setEnviado(true);
  };

  if (loading) return null;

  const CONTATO_INFOS = [
    {
      icon: <MapPin className="w-5 h-5" />,
      titulo: 'Endereço',
      valor: config?.endereco || 'Carapicuíba, São Paulo - SP',
      cor: '#008FC7',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      titulo: 'Telefone / WhatsApp',
      valor: `${config?.telefone || '(11) 4181-0000'} / ${config?.whatsapp || '(11) 99999-9999'}`,
      cor: '#1C75BC',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      titulo: 'E-mail',
      valor: config?.email || 'contato@escolajerbs.com.br',
      cor: '#FBB03B',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      titulo: 'Horário de Funcionamento',
      valor: config?.horario_funcionamento || 'Seg–Sex: 7h às 18h',
      cor: '#FFD166',
    },
  ];

  return (
    <>
      <section
        id="contato"
        className="relative py-24 overflow-hidden bg-gradient-to-br from-[#2D2D2D] via-[#3A3A4A] to-[#2D2D2D]"
      >
        {/* Blobs decorativos sobre fundo escuro */}
        <div
          className="absolute -top-20 -left-20 w-[400px] h-[400px] blob-shape opacity-10"
          style={{ background: 'radial-gradient(circle, #008FC7 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] blob-shape-alt opacity-10"
          style={{ background: 'radial-gradient(circle, #1C75BC 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* ── Cabeçalho ── */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008FC7]/20 border border-[#008FC7]/40 mb-6"
            >
              <Star className="w-4 h-4 text-[#008FC7] fill-[#008FC7]" />
              <span
                className="text-sm font-semibold text-[#008FC7]"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                Vagas abertas para 2025!
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Faça Parte da{' '}
              <span className="text-gradient-coral">Família JERBS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
            >
              Vagas abertas! Dê o primeiro passo para um futuro brilhante e
              matricule seu pequeno.
            </motion.p>
          </div>

          {/* ── Grid: Formulário + Info de Contato ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* ── Formulário ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
            >
              {enviado ? (
                // Estado de sucesso
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-[#95D5B2]" />
                  <h3
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Mensagem enviada! 🎉
                  </h3>
                  <p
                    className="text-white/70"
                    style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
                  >
                    Entraremos em contato em breve. Obrigado pelo interesse na Escola JERBS!
                  </p>
                </motion.div>
              ) : (
                // Formulário de contato
                <div className="flex flex-col gap-4">
                  <h3
                    className="text-xl font-black text-white mb-2"
                    style={{ fontFamily: 'var(--font-poppins)' }}
                  >
                    Agende uma Visita
                  </h3>

                  {/* Campos do formulário */}
                  {([
                    { name: 'nomeResponsavel', label: 'Nome do Responsável', type: 'text', placeholder: 'Seu nome completo' },
                    { name: 'nomeCrianca', label: 'Nome da Criança', type: 'text', placeholder: 'Nome do seu filho(a)' },
                    { name: 'telefone', label: 'WhatsApp', type: 'tel', placeholder: '(11) 9 9999-9999' },
                    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
                  ] as Array<{ name: keyof FormData; label: string; type: string; placeholder: string }>
                  ).map((field) => (
                    <div key={field.name}>
                      <label
                        className="block text-sm font-semibold text-white/80 mb-1.5"
                        style={{ fontFamily: 'var(--font-quicksand)' }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 transition-all duration-200"
                        style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
                      />
                    </div>
                  ))}

                  {/* Select de turma */}
                  <div>
                    <label
                      className="block text-sm font-semibold text-white/80 mb-1.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Turma de Interesse
                    </label>
                    <select
                      name="turmaInteresse"
                      value={formData.turmaInteresse}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 transition-all duration-200"
                      style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
                    >
                      <option value="" className="text-black">Selecione uma turma</option>
                      <option value="bercario" className="text-black">Berçário (4 meses – 1 ano)</option>
                      <option value="mini-maternal" className="text-black">Mini Maternal (1 – 2 anos)</option>
                      <option value="maternal" className="text-black">Maternal (2 – 3 anos)</option>
                      <option value="fase-1" className="text-black">Fase I (3 – 4 anos)</option>
                      <option value="fase-2" className="text-black">Fase II (4 – 5 anos)</option>
                    </select>
                  </div>

                  {/* Textarea de mensagem */}
                  <div>
                    <label
                      className="block text-sm font-semibold text-white/80 mb-1.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      Mensagem (opcional)
                    </label>
                    <textarea
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Alguma dúvida ou informação adicional?"
                      className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#008FC7] focus:ring-2 focus:ring-[#008FC7]/20 transition-all duration-200 resize-none"
                      style={{ fontFamily: 'var(--font-quicksand)', fontWeight: 500 }}
                    />
                  </div>

                  {/* Botão de envio */}
                  <button
                    onClick={handleSubmit}
                    className="group flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#008FC7] to-[#1C75BC] hover:shadow-xl hover:shadow-[#008FC7]/30 hover:-translate-y-1 transition-all duration-300"
                    style={{ fontFamily: 'var(--font-quicksand)' }}
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Solicitar Agendamento de Visita
                  </button>
                </div>
              )}
            </motion.div>

            {/* ── Informações de Contato ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {CONTATO_INFOS.map((info, index) => (
                <motion.div
                  key={info.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: info.cor + '33', color: info.cor }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs text-white/50 font-medium uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      {info.titulo}
                    </p>
                    <p
                      className="text-white font-semibold mt-0.5"
                      style={{ fontFamily: 'var(--font-quicksand)' }}
                    >
                      {info.valor}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Chamada para WhatsApp */}
              <motion.a
                href={`https://wa.me/55${config?.whatsapp.replace(/\D/g, '') || '11999999999'}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Escola%20JERBS.`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-white bg-[#25D366] hover:bg-[#1ebe5a] hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                {/* Ícone WhatsApp SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Fale pelo WhatsApp
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Rodapé ── */}
      <footer className="bg-[#1A1A2E] text-white/60 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image 
                src="/images/icon-logo-jerbs.png" 
                alt="Logo Escola JERBS" 
                fill 
                sizes="32px"
                className="object-contain"
              />
            </div>
            <span
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Escola JERBS
            </span>
          </div>
          <p
            className="text-sm text-center"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            © {new Date().getFullYear()} Escola JERBS · Carapicuíba, SP · Desde 1994 com ❤️
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            Transformando infâncias desde 1994
          </p>
        </div>
      </footer>
    </>
  );
}
