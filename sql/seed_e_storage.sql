-- ─────────────────────────────────────────────────────────────────────────────
-- CONFIGURAÇÃO DE STORAGE E POPULAÇÃO DA HERO
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. CRIAR O BUCKET DE IMAGENS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('escola_jerbs', 'escola_jerbs', true)
ON CONFLICT (id) DO NOTHING;

-- 2. POLÍTICAS DE ACESSO PARA O STORAGE
-- Permitir leitura pública
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura Pública') THEN
        CREATE POLICY "Leitura Pública" ON storage.objects FOR SELECT USING (bucket_id = 'escola_jerbs');
    END IF;
END $$;

-- Permitir upload para usuários autenticados (Admin)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload para Admins') THEN
        CREATE POLICY "Upload para Admins" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'escola_jerbs');
    END IF;
END $$;

-- Permitir exclusão para usuários autenticados (Admin)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Exclusão para Admins') THEN
        CREATE POLICY "Exclusão para Admins" ON storage.objects FOR DELETE USING (bucket_id = 'escola_jerbs');
    END IF;
END $$;


-- 3. POPULAR TABELA escola_hero COM OS DADOS ATUAIS
DELETE FROM escola_hero; -- Limpa para evitar duplicidade no seed

INSERT INTO escola_hero (
    titulo, subtitulo, texto_botao_principal, link_botao_principal, 
    texto_botao_secundario, link_botao_secundario, 
    imagem_url_fundo, imagem_url_destaque, badge_texto, ordem
) VALUES 
(
    'Educação que <span class="text-gradient-coral">transforma</span>, cuidado que <span class="text-gradient-blue">acolhe.</span>',
    'A melhor opção para a educação do seu filho em Carapicuíba. 32 anos de tradição com Berçário, Maternal e Pré-escola.',
    'Agende uma Visita',
    '#contato',
    'Conheça a Escola',
    '#sobre',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800',
    'Matrículas Abertas 2026',
    1
),
(
    'Espaço <span class="text-gradient-coral">seguro</span> para o seu pequeno <span class="text-gradient-blue">brilhar.</span>',
    'Infraestrutura moderna e planejada para o desenvolvimento integral de crianças de 0 a 5 anos.',
    'Ver Estrutura',
    '#estrutura',
    'Nossas Turmas',
    '#turmas',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    '+32 Anos de Tradição',
    2
),
(
    'Onde cada <span class="text-gradient-coral">descoberta</span> vira um grande <span class="text-gradient-blue">aprendizado.</span>',
    'Metodologia sociointeracionista que valoriza o brincar e estimula a curiosidade natural da criança.',
    'Falar com Consultor',
    'https://wa.me/5511999999999',
    'Ver Galeria',
    '#galeria',
    'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=800',
    'Berçário ao Pré-Escolar',
    3
);
