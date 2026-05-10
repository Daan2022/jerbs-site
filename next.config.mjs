/**
 * next.config.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Configuração do Next.js 16 para a landing page da Escola JERBS.
 *
 * IMPORTANTE (Next.js 16):
 * - `allowedDevOrigins` aceita apenas HOSTNAMES (sem porta!).
 *   A função interna `parseHostnameFromHeader` extrai somente o hostname
 *   do header Origin/Referer antes de comparar.
 * - Essa propriedade deve estar na RAIZ da config (não dentro de experimental).
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Otimização de Imagens de Domínios Externos ─────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // ─── Origens permitidas no modo de desenvolvimento ──────────────────────
  // Permite acesso via IP de rede local (celular, tablet, etc.)
  // FORMATO: apenas hostname, SEM porta (o Next.js 16 extrai só o hostname)
  allowedDevOrigins: [
    '192.168.1.104',
    'localhost',
    '*.local',
  ],

  // ─── Configurações experimentais ────────────────────────────────────────
  experimental: {
    serverActions: {
      allowedOrigins: ['192.168.1.104:3000', 'localhost:3000'],
    },
  },

  // ─── Turbopack ──────────────────────────────────────────────────────────
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
