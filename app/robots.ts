import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin', // Protege a área administrativa de aparecer no Google
      },
      {
        userAgent: 'GPTBot',
        disallow: '/', // Evita que IAs usem o conteúdo sem permissão (Opcional/Recomendado)
      }
    ],
    sitemap: 'https://escolajerbs.com.br/sitemap.xml',
  };
}
