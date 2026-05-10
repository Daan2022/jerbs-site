/**
 * Script utilitário para copiar as imagens geradas para a pasta public/estrutura.
 * Execute com: node scripts/copiar-imagens.js
 */

const fs = require('fs');
const path = require('path');

const PASTA_ORIGEM = 'C:\\Users\\Danie\\.gemini\\antigravity\\brain\\f50421ac-6243-4365-ad09-4c2803206bf8';
const PASTA_DESTINO = path.join(__dirname, '..', 'public', 'estrutura');

const IMAGENS = {
  'sala_de_aula_1778344823867.png': 'sala-de-aula.png',
  'area_externa_1778344837501.png': 'area-externa.png',
  'sala_movimento_1778344850686.png': 'sala-movimento.png',
  'tecnologia_1778344866891.png': 'tecnologia.png',
  'refeitorio_1778344879641.png': 'refeitorio.png',
  'seguranca_1778344892703.png': 'seguranca.png',
};

// Cria a pasta destino se não existir
if (!fs.existsSync(PASTA_DESTINO)) {
  fs.mkdirSync(PASTA_DESTINO, { recursive: true });
  console.log('✅ Pasta criada:', PASTA_DESTINO);
}

// Copia cada imagem
for (const [origem, destino] of Object.entries(IMAGENS)) {
  const caminhoOrigem = path.join(PASTA_ORIGEM, origem);
  const caminhoDestino = path.join(PASTA_DESTINO, destino);
  
  if (fs.existsSync(caminhoOrigem)) {
    fs.copyFileSync(caminhoOrigem, caminhoDestino);
    console.log(`✅ Copiado: ${destino}`);
  } else {
    console.log(`❌ Não encontrado: ${origem}`);
  }
}

console.log('\n🎉 Pronto! Imagens copiadas para public/estrutura/');
