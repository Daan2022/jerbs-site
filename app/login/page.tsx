/**
 * app/login/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Tela de autenticação unificada (Login, Cadastro e Recuperação).
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus, HelpCircle, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type AuthMode = 'login' | 'recuperar';

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  // Campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(null);

    try {
      if (modo === 'login') {
        const { session } = await authService.entrar(email, senha);
        
        // Criar um cookie simples para o Middleware/Proxy reconhecer o acesso
        if (session) {
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
        
        router.push('/admin');
      } else {
        await authService.recuperarSenha(email);
        setSucesso('E-mail de recuperação enviado!');
      }
    } catch (err: any) {
      setErro(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Blobs decorativos de fundo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#008FC7]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FBB03B]/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-[#008FC7]/5 border border-white p-8 md:p-10 relative z-10"
      >
        {/* Logo e Título */}
        <div className="text-center mb-10">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/images/icon-logo-jerbs.png" alt="Logo JERBS" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#2D2D2D]" style={{ fontFamily: 'var(--font-poppins)' }}>
            {modo === 'login' ? 'Bem-vindo de volta!' : 'Recuperar senha'}
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
            Acesso exclusivo para administradores da Escola JERBS.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@escolajerbs.com.br"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#008FC7] focus:ring-4 focus:ring-[#008FC7]/10 outline-none transition-all"
              />
            </div>
          </div>

          {modo === 'login' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#008FC7] focus:ring-4 focus:ring-[#008FC7]/10 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Alertas de Erro/Sucesso */}
          <AnimatePresence>
            {erro && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-2xl font-medium">
                {erro}
              </motion.div>
            )}
            {sucesso && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm p-4 rounded-2xl font-medium flex items-center gap-2">
                <CheckCircle size={18} /> {sucesso}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#008FC7] to-[#1C75BC] text-white font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#008FC7]/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                {modo === 'login' ? <LogIn size={22} /> : <HelpCircle size={22} />}
                {modo === 'login' ? 'Entrar no Painel' : 'Enviar link de recuperação'}
              </>
            )}
          </button>
        </form>

        {/* Links de Alternância */}
        <div className="mt-8 pt-6 border-t border-gray-50 space-y-4 text-center">
          {modo === 'login' ? (
            <button onClick={() => setModo('recuperar')} className="text-sm font-bold text-[#008FC7] hover:underline block w-full">
              Esqueceu sua senha?
            </button>
          ) : (
            <button onClick={() => setModo('login')} className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-[#008FC7] transition-colors w-full">
              <ArrowLeft size={16} /> Voltar para o Login
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
