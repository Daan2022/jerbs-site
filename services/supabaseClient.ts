/**
 * services/supabaseClient.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Cliente único do Supabase para toda a aplicação.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  // Logamos um aviso mas não travamos o build
  console.warn('⚠️ Variáveis de ambiente do Supabase não encontradas. Isso é normal durante o build se não foram passadas como segredos.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
