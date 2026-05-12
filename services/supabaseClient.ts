/**
 * services/supabaseClient.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Cliente único do Supabase para toda a aplicação.
 */

import { createClient } from '@supabase/supabase-js';

// Durante o build no GitHub Actions, essas variáveis não existem. 
// Usamos valores de "mentira" apenas para o build não travar.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tmp-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'tmp-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('⚠️ Usando Supabase URL temporária para o Build.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
