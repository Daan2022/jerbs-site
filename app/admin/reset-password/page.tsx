/**
 * app/admin/reset-password/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Tela para definição de nova senha após recuperação por e-mail.
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [validando, setValidando] = useState(true); // Estado para validar o link
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // Verificar se existe uma sessão ativa (vinda do link de recuperação)
  useEffect(() => {
    const checarSessao = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setErro('Link de recuperação expirado ou inválido. Solicite um novo e-mail.');
      }
      setValidando(false);
    };
    checarSessao();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (novaSenha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setErro(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha
      });

      if (error) throw error;

      setSucesso(true);
      // Redireciona para o admin após 3 segundos
      setTimeout(() => {
        router.push('/admin');
      }, 3000);
      
    } catch (err: any) {
      setErro(err.message || 'Erro ao atualizar senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#008FC7]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FBB03B]/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-10 relative z-10 border border-white"
      >
        <div className="text-center mb-10">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/images/icon-logo-jerbs.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-black text-[#2D2D2D]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Definir Nova Senha
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
            Crie uma senha forte e segura para o seu acesso.
          </p>
        </div>

        {validando ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="animate-spin text-[#008FC7]" size={40} />
            <p className="text-gray-500 font-medium">Validando seu link...</p>
          </div>
        ) : sucesso ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-emerald-700">Senha Atualizada!</h3>
            <p className="text-gray-500">Sua senha foi alterada com sucesso. Redirecionando para o painel...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nova Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  required
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#008FC7] focus:ring-4 focus:ring-[#008FC7]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#008FC7] focus:ring-4 focus:ring-[#008FC7]/10 outline-none transition-all"
                />
              </div>
            </div>

            {erro && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-2xl flex items-center gap-2 font-medium">
                <AlertCircle size={18} /> {erro}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#008FC7] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#1C75BC] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={22} /> : <><Save size={22} /> Salvar Nova Senha</>}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
