/**
 * services/authService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerencia a autenticação da Escola JERBS usando Supabase Auth.
 */

import { supabase } from './supabaseClient';

export const authService = {
  // Login com E-mail e Senha
  async entrar(email: string, senha: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) throw error;
    return data;
  },

  // Recuperação de Senha
  async recuperarSenha(email: string) {
    // Teste com URL fixa para diagnosticar duplicação
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/admin/reset-password',
    });
    if (error) throw error;
  },

  // Logout
  async sair() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obter usuário atual
  async obterUsuario() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
