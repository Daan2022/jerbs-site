/**
 * services/heroService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulação de chamadas RPC para o Supabase (Mocks).
 * Mantém a arquitetura de "Front-end Burro" onde os dados vêm do "servidor".
 */

export interface SlideHero {
  id: number;
  titulo_principal: string;
  subtitulo: string;
  texto_botao_primario: string;
  link_botao_primario: string;
  texto_botao_secundario: string;
  link_botao_secundario: string;
  imagem_url_fundo: string;
  imagem_url_destaque: string;
  badge_texto: string;
}

/**
 * Mock de RPC: buscar_slides_hero
 * Retorna os slides configurados para o carousel do Hero.
 */
export async function buscarSlidesHero(): Promise<SlideHero[]> {
  // Simulando delay de rede
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      titulo_principal: 'Educação que <span class="text-gradient-coral">transforma</span>, cuidado que <span class="text-gradient-blue">acolhe.</span>',
      subtitulo: 'A melhor opção para a educação do seu filho em Carapicuíba. 32 anos de tradição com Berçário, Maternal e Pré-escola.',
      texto_botao_primario: 'Agende uma Visita',
      link_botao_primario: '#contato',
      texto_botao_secundario: 'Conheça a Escola',
      link_botao_secundario: '#sobre',
      imagem_url_fundo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920',
      imagem_url_destaque: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800',
      badge_texto: 'Matrículas Abertas 2024',
    },
    {
      id: 2,
      titulo_principal: 'Espaço <span class="text-gradient-coral">seguro</span> para o seu pequeno <span class="text-gradient-blue">brilhar.</span>',
      subtitulo: 'Infraestrutura moderna e planejada para o desenvolvimento integral de crianças de 0 a 5 anos.',
      texto_botao_primario: 'Ver Estrutura',
      link_botao_primario: '#estrutura',
      texto_botao_secundario: 'Nossas Turmas',
      link_botao_secundario: '#turmas',
      imagem_url_fundo: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1920',
      imagem_url_destaque: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      badge_texto: '+32 Anos de Tradição',
    },
    {
      id: 3,
      titulo_principal: 'Onde cada <span class="text-gradient-coral">descoberta</span> vira um grande <span class="text-gradient-blue">aprendizado.</span>',
      subtitulo: 'Metodologia sociointeracionista que valoriza o brincar e estimula a curiosidade natural da criança.',
      texto_botao_primario: 'Falar com Consultor',
      link_botao_primario: 'https://wa.me/5511999999999',
      texto_botao_secundario: 'Ver Galeria',
      link_botao_secundario: '#galeria',
      imagem_url_fundo: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1920',
      imagem_url_destaque: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
      badge_texto: 'Berçário ao Pré-Escolar',
    },
  ];
}
