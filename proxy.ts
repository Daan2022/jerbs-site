/**
 * proxy.ts (Antigo middleware.ts)
 * ─────────────────────────────────────────────────────────────────────────────
 * Protege as rotas administrativas conforme a nova convenção do Next.js 16.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/admin');
  const isResetPasswordRoute = path === '/admin/reset-password';

  // Supabase armazena o token em cookies. Verificamos a existência deles.
  const token = request.cookies.get('sb-access-token')?.value || 
                request.cookies.get('supabase-auth-token')?.value;

  // Protege apenas se for rota protegida E NÃO FOR a rota de reset de senha
  if (isProtectedRoute && !isResetPasswordRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
