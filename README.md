# 🌟 Escola JERBS — Landing Page

> Landing page moderna, lúdica e de alta conversão para a Escola JERBS de Carapicuíba, SP.
> Construída com **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Framer Motion**.

---

## 📁 Estrutura de Pastas

```
escola-jerbs/
│
├── app/                          # App Router do Next.js
│   ├── layout.tsx                # Layout raiz: fontes, metadados, <html>
│   ├── page.tsx                  # Página principal: compõe todas as seções
│   └── globals.css               # CSS global: variáveis, utilitários, animações
│
├── components/                   # Componentes React reutilizáveis
│   ├── Navbar.tsx                # Barra de navegação com glass effect
│   ├── Floating3DIcon.tsx        # ⭐ Ícone 3D flutuante (Framer Motion yoyo)
│   │
│   └── sections/                 # Uma pasta por seção da landing page
│       ├── HeroSection.tsx       # Seção hero: título, CTA, ícones 3D
│       ├── SobreSection.tsx      # Sobre nós: trajetória e metodologia
│       ├── TurmasSection.tsx     # Cards animados das turmas
│       ├── DiferenciaisSection.tsx # Grid de diferenciais
│       ├── GaleriaSection.tsx    # Grid masonry de eventos
│       ├── EstruturaSection.tsx  # Cards das instalações
│       └── ContatoSection.tsx    # Formulário, contato e rodapé
│
├── hooks/                        # Hooks customizados
│   └── useScrollReveal.ts        # Animações ao rolar a página
│
├── public/                       # Arquivos estáticos (imagens, ícones)
│   ├── icons/                    # ← Adicionar PNGs 3D aqui!
│   │   ├── 3d-book.png           # Livro 3D (Hero)
│   │   ├── 3d-backpack.png       # Mochila 3D (Hero)
│   │   ├── 3d-star.png           # Estrela 3D (Hero)
│   │   ├── 3d-pencil.png         # Lápis 3D (Hero)
│   │   └── 3d-ball.png           # Bola 3D (Hero)
│   └── galeria/                  # ← Adicionar fotos dos eventos aqui!
│       └── .gitkeep
│
├── tailwind.config.ts            # Tokens de design customizados
├── package.json                  # Dependências do projeto
└── tsconfig.json                 # Configuração do TypeScript
```

---

## 🚀 Como Rodar o Projeto

### 1. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 2. Rodar em modo desenvolvimento
```bash
npm run dev
```
Acesse: [http://localhost:3000](http://localhost:3000)

### 3. Build para produção
```bash
npm run build
npm start
```

---

## 🎨 Sistema de Design

| Token              | Valor             | Uso                          |
|--------------------|-------------------|------------------------------|
| `--color-blue-dark`   | `#19194D`      | Azul Escuro (Principal)      |
| `--color-blue-medium` | `#1C75BC`      | Azul Médio                   |
| `--color-blue-light`  | `#008FC7`      | Azul Claro (Secundário)      |
| `--color-red`         | `#C1272D`      | Vermelho (acento)            |
| `--color-yellow`      | `#FBB03B`      | Amarelo (acento)             |
| `--color-cream`       | `#FDFAF6`      | Background principal         |
| `--font-display`      | Poppins        | Títulos e headings           |
| `--font-body`         | Quicksand      | Corpo do texto               |

---

## 🖼️ Como Adicionar Ícones 3D

1. Baixe PNGs com fundo transparente de sites como:
   - [Icons8](https://icons8.com/icons/set/3d)
   - [Sketchfab](https://sketchfab.com)
   - [Blender Market](https://blendermarket.com)

2. Coloque-os em `/public/icons/` com os nomes:
   - `3d-book.png`
   - `3d-backpack.png`
   - `3d-star.png`
   - `3d-pencil.png`
   - `3d-ball.png`

3. O componente `<Floating3DIcon>` já cuida da animação automaticamente!

---

## 📧 Configurar Formulário de Contato

No arquivo `ContatoSection.tsx`, a função `handleSubmit` está pronta para integração.
Opções recomendadas:

- **Resend** (email): Criar uma API Route em `/app/api/contato/route.ts`
- **WhatsApp API**: Usar o link já configurado no componente
- **Formspree**: Substituir o `onClick` pelo `action` do Formspree

---

## ⚡ Dependências

| Pacote            | Versão   | Uso                              |
|-------------------|----------|----------------------------------|
| `next`            | ^14.2    | Framework React com App Router   |
| `react`           | ^18.3    | Biblioteca UI                    |
| `framer-motion`   | ^11.3    | Animações (float, scroll, fade)  |
| `lucide-react`    | ^0.383   | Ícones UI                        |
| `tailwindcss`     | ^3.4     | Estilização utility-first        |
| `typescript`      | ^5.4     | Tipagem estática                 |

---

## 📞 Contato da Escola

**Escola JERBS** · Carapicuíba, SP  
📍 Endereço: Carapicuíba, São Paulo - SP  
📱 WhatsApp: (11) 9 9999-9999  
📧 E-mail: contato@escolajerbs.com.br  
🕐 Funcionamento: Seg–Sex, 7h às 18h

---

*Feito com ❤️ para a Escola JERBS — Transformando infâncias desde 1994*
