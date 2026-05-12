# Estágio 1: Instalação de dependências e build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./
RUN npm install

# Copia o restante do código
COPY . .

# Gera o build de produção do Next.js
RUN npm run build

# Estágio 2: Runner (execução)
FROM node:20-alpine AS runner
WORKDIR /app

# Define como produção
ENV NODE_ENV=production

# Copia os arquivos necessários do estágio de build
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]