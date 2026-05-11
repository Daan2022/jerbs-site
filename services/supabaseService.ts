/**
 * services/supabaseService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulação de chamadas RPC para o Supabase (Mocks).
 * Centraliza a busca de dados de todas as seções seguindo o padrão de "Front-end Burro".
 * Toda regra de negócio e estrutura de dados vem do "servidor".
 */

// ─── Interfaces ────────────────────────────────────────────────────────────

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

export interface Instalacao {
  id: number;
  nome: string;
  descricao: string;
  icone_slug: string; // ex: 'building', 'tree', etc
  cor_primaria: string;
  cor_fundo: string;
  imagem_url: string;
}

export interface ItemGaleria {
  id: string;
  titulo: string;
  descricao: string;
  icone_slug: string;
  cor_inicio: string;
  cor_fim: string;
  col_span: number;
  row_span: number;
  imagem_url: string;
}

// ─── Dados Mutáveis (Mocks para a sessão) ──────────────────────────────────

let slidesHero: SlideHero[] = [
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

let itensGaleria: ItemGaleria[] = [
  {
    id: 'dia-da-agua',
    titulo: 'Dia da Água',
    descricao: 'Brincadeiras aquáticas e conscientização ambiental',
    icone_slug: 'droplets',
    cor_inicio: '#008FC7',
    cor_fim: '#1C75BC',
    col_span: 2,
    row_span: 2,
    imagem_url: 'https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'dia-do-circo',
    titulo: 'Dia do Circo',
    descricao: 'Mágica, alegria e muita diversão',
    icone_slug: 'circle',
    cor_inicio: '#FBB03B',
    cor_fim: '#C1272D',
    col_span: 1,
    row_span: 1,
    imagem_url: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'festa-junina',
    titulo: 'Festa Junina',
    descricao: 'Forró, quadrilha e muito arraiá!',
    icone_slug: 'star',
    cor_inicio: '#95D5B2',
    cor_fim: '#52B788',
    col_span: 1,
    row_span: 1,
    imagem_url: 'https://images.unsplash.com/photo-1547313803-331d98946acc?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'musicalizacao',
    titulo: 'Musicalização',
    descricao: 'Ritmo, melodia e expressão criativa',
    icone_slug: 'music',
    cor_inicio: '#C77DFF',
    cor_fim: '#9B59B6',
    col_span: 1,
    row_span: 1,
    imagem_url: 'https://images.unsplash.com/photo-1514119412350-e174d90d280e?auto=format&fit=crop&q=80&w=800',
  },
];

// ─── Mock RPC: buscar_slides_hero ──────────────────────────────────────────
export async function buscarSlidesHero(): Promise<SlideHero[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [...slidesHero];
}

/**
 * Mock RPC: salvar_slide_hero
 */
export async function salvarSlideHero(slide: SlideHero): Promise<SlideHero> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const index = slidesHero.findIndex(s => s.id === slide.id);
  if (index >= 0) {
    slidesHero[index] = slide;
  } else {
    slidesHero.push(slide);
  }
  return slide;
}

// ─── Mock RPC: buscar_instalacoes ──────────────────────────────────────────
export async function buscarInstalacoes(): Promise<Instalacao[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      nome: 'Salas de Aula',
      descricao: 'Ambientes coloridos, iluminados e equipados com materiais pedagógicos de qualidade.',
      icone_slug: 'building',
      cor_primaria: '#008FC7',
      cor_fundo: '#E0F4FF',
      imagem_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      nome: 'Playground Moderno',
      descricao: 'Área externa segura e divertida para o desenvolvimento motor e social.',
      icone_slug: 'tree',
      cor_primaria: '#1DB954',
      cor_fundo: '#E9F7EF',
      imagem_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      nome: 'Espaço Maker',
      descricao: 'Laboratório criativo onde os pequenos colocam a mão na massa e descobrem o mundo.',
      icone_slug: 'monitor',
      cor_primaria: '#FBB03B',
      cor_fundo: '#FFF9E6',
      imagem_url: 'https://images.unsplash.com/photo-1564429234816-79b1df8de13d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      nome: 'Refeitório Saudável',
      descricao: 'Ambiente planejado para incentivar bons hábitos alimentares com acompanhamento.',
      icone_slug: 'coffee',
      cor_primaria: '#C1272D',
      cor_fundo: '#FDECEC',
      imagem_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 5,
      nome: 'Biblioteca Lúdica',
      descricao: 'Acervo variado para despertar o amor pela leitura desde os primeiros anos.',
      icone_slug: 'coffee',
      cor_primaria: '#C77DFF',
      cor_fundo: '#F5EBFF',
      imagem_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 6,
      nome: 'Segurança 24h',
      descricao: 'Monitoramento constante e protocolos rigorosos para a tranquilidade da família.',
      icone_slug: 'shield',
      cor_primaria: '#2D2D2D',
      cor_fundo: '#F0F0F0',
      imagem_url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800',
    },
  ];
}

// ─── Mock RPC: buscar_galeria ──────────────────────────────────────────────
export async function buscarGaleria(): Promise<ItemGaleria[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [...itensGaleria];
}

/**
 * Mock RPC: salvar_item_galeria
 */
export async function salvarItemGaleria(item: ItemGaleria): Promise<ItemGaleria> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const index = itensGaleria.findIndex(i => i.id === item.id);
  if (index >= 0) {
    itensGaleria[index] = item;
  } else {
    itensGaleria.push(item);
  }
  return item;
}

/**
 * Mock RPC: excluir_item_galeria
 */
export async function excluirItemGaleria(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  itensGaleria = itensGaleria.filter(i => i.id !== id);
  return true;
}

// ─── Mock RPC: buscar_galeria_completa ─────────────────────────────────────
export async function buscarGaleriaCompleta(): Promise<ItemGaleria[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [...itensGaleria];
}

