/**
 * services/configuracoesService.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Gerencia as configurações gerais da escola (endereço, contato, etc).
 * Segue o padrão de "Front-end Burro" com chamadas simuladas (Mocks).
 */

export interface ConfiguracoesEscola {
  endereco: string;
  telefone: string;
  whatsapp: string;
  email: string;
  horario_funcionamento: string;
  instagram_url: string;
  facebook_url: string;
}

// Dados iniciais (mock)
let configuracoesAtuais: ConfiguracoesEscola = {
  endereco: 'Rua Exemplo, 123 - Carapicuíba, São Paulo - SP',
  telefone: '(11) 4181-0000',
  whatsapp: '(11) 99999-9999',
  email: 'contato@escolajerbs.com.br',
  horario_funcionamento: 'Seg–Sex: 7h às 18h',
  instagram_url: 'https://instagram.com/escolajerbs',
  facebook_url: 'https://facebook.com/escolajerbs',
};

/**
 * Mock RPC: buscar_configuracoes
 */
export async function buscarConfiguracoes(): Promise<ConfiguracoesEscola> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ...configuracoesAtuais };
}

/**
 * Mock RPC: atualizar_configuracoes
 */
export async function atualizarConfiguracoes(novasConfig: Partial<ConfiguracoesEscola>): Promise<ConfiguracoesEscola> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  configuracoesAtuais = { ...configuracoesAtuais, ...novasConfig };
  return { ...configuracoesAtuais };
}
