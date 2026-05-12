-- ─────────────────────────────────────────────────────────────────────────────
-- SQL COMPLETO PARA SUPABASE - ESCOLA JERBS
-- ESTE ARQUIVO É O "SOURCE OF TRUTH" PARA O BANCO DE DADOS
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. CONFIGURAÇÃO DE STORAGE (Balde de Imagens) ──────────────────────────────

-- Criar o bucket para fotos da escola (se não existir)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('escola_jerbs', 'escola_jerbs', true)
ON CONFLICT (id) DO NOTHING;

-- Liberar acesso público para leitura das imagens
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Leitura Pública de Imagens') THEN
        CREATE POLICY "Leitura Pública de Imagens" ON storage.objects FOR SELECT USING (bucket_id = 'escola_jerbs');
    END IF;
END $$;

-- Restringir upload para usuários autenticados (Admin)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Upload para Admins') THEN
        CREATE POLICY "Upload para Admins" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'escola_jerbs');
    END IF;
END $$;

-- Restringir exclusão para usuários autenticados (Admin)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Exclusão para Admins') THEN
        CREATE POLICY "Exclusão para Admins" ON storage.objects FOR DELETE USING (bucket_id = 'escola_jerbs');
    END IF;
END $$;

-- 2. TABELAS PRINCIPAIS ──────────────────────────────────────────────────────

-- 1.1. TABELA: escola_hero
CREATE TABLE IF NOT EXISTS escola_hero (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    subtitulo TEXT,
    texto_botao_principal TEXT DEFAULT 'Saiba Mais',
    link_botao_principal TEXT DEFAULT '#sobre',
    texto_botao_secundario TEXT DEFAULT 'Contato',
    link_botao_secundario TEXT DEFAULT '#contato',
    imagem_url_fundo TEXT,
    imagem_url_destaque TEXT,
    badge_texto TEXT,
    ordem INTEGER DEFAULT 0,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2. TABELA: escola_instalacoes (Estrutura)
CREATE TABLE IF NOT EXISTS escola_instalacoes (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    icone TEXT, -- Slug do ícone lucide
    imagem_url TEXT,
    categoria TEXT DEFAULT 'Geral',
    ordem INTEGER DEFAULT 0,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3. TABELA: escola_galeria
CREATE TABLE IF NOT EXISTS escola_galeria (
    id SERIAL PRIMARY KEY,
    titulo TEXT,
    descricao TEXT,
    categoria TEXT DEFAULT 'Geral',
    imagem_url TEXT NOT NULL,
    icone_slug TEXT,
    cor_inicio TEXT,
    cor_fim TEXT,
    col_span INTEGER DEFAULT 1,
    row_span INTEGER DEFAULT 1,
    ordem INTEGER DEFAULT 0,
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 1.4. TABELA: escola_configuracoes
CREATE TABLE IF NOT EXISTS escola_configuracoes (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    endereco TEXT,
    telefone TEXT,
    whatsapp TEXT,
    email TEXT,
    horario_funcionamento TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    faixas_etarias TEXT[],
    turnos TEXT[],
    objetivos TEXT[],
    atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 1.5. TABELA: escola_leads (Contatos do Site)
CREATE TABLE IF NOT EXISTS escola_leads (
    id SERIAL PRIMARY KEY,
    nome_responsavel TEXT NOT NULL,
    whatsapp TEXT,
    nome_crianca TEXT,
    faixa_etaria TEXT,
    turno_desejado TEXT,
    objetivo TEXT,
    mensagem TEXT,
    status TEXT DEFAULT 'novo', -- 'novo', 'atendido', 'arquivado'
    criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 1.6. TABELA: escola_estatisticas (Analíticos)
CREATE TABLE IF NOT EXISTS escola_estatisticas (
    dia DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    visitas INT DEFAULT 1
);

-- 2. RPCs - BUSCAS (FRONT-END) ────────────────────────────────────────────────

-- Buscar Slides da Hero
CREATE OR REPLACE FUNCTION buscar_hero()
RETURNS SETOF escola_hero AS $$
BEGIN
    RETURN QUERY SELECT * FROM escola_hero ORDER BY ordem ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buscar Instalações
CREATE OR REPLACE FUNCTION buscar_instalacoes()
RETURNS SETOF escola_instalacoes AS $$
BEGIN
    RETURN QUERY SELECT * FROM escola_instalacoes ORDER BY ordem ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buscar Galeria
CREATE OR REPLACE FUNCTION buscar_galeria()
RETURNS SETOF escola_galeria AS $$
BEGIN
    RETURN QUERY SELECT * FROM escola_galeria ORDER BY ordem ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buscar Configurações
CREATE OR REPLACE FUNCTION buscar_configuracoes()
RETURNS SETOF escola_configuracoes AS $$
BEGIN
    RETURN QUERY SELECT * FROM escola_configuracoes LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. RPCs - ADMINISTRAÇÃO (SALVAR / ATUALIZAR) ────────────────────────────────

-- Salvar Hero
CREATE OR REPLACE FUNCTION salvar_hero(p_slide JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_hero (
        id, titulo, subtitulo, texto_botao_principal, link_botao_principal, 
        texto_botao_secundario, link_botao_secundario, 
        imagem_url_fundo, imagem_url_destaque, badge_texto, ordem
    )
    VALUES (
        COALESCE((p_slide->>'id')::INT, (SELECT COALESCE(MAX(id), 0) + 1 FROM escola_hero)),
        p_slide->>'titulo',
        p_slide->>'subtitulo',
        p_slide->>'texto_botao_principal',
        p_slide->>'link_botao_principal',
        p_slide->>'texto_botao_secundario',
        p_slide->>'link_botao_secundario',
        p_slide->>'imagem_url_fundo',
        p_slide->>'imagem_url_destaque',
        p_slide->>'badge_texto',
        COALESCE((p_slide->>'ordem')::INT, 0)
    )
    ON CONFLICT (id) DO UPDATE SET
        titulo = EXCLUDED.titulo,
        subtitulo = EXCLUDED.subtitulo,
        texto_botao_principal = EXCLUDED.texto_botao_principal,
        link_botao_principal = EXCLUDED.link_botao_principal,
        texto_botao_secundario = EXCLUDED.texto_botao_secundario,
        link_botao_secundario = EXCLUDED.link_botao_secundario,
        imagem_url_fundo = EXCLUDED.imagem_url_fundo,
        imagem_url_destaque = EXCLUDED.imagem_url_destaque,
        badge_texto = EXCLUDED.badge_texto,
        ordem = EXCLUDED.ordem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Atualizar Configurações
CREATE OR REPLACE FUNCTION atualizar_configuracoes(p_config JSONB)
RETURNS VOID AS $$
BEGIN
    UPDATE escola_configuracoes SET
        whatsapp = COALESCE(p_config->>'whatsapp', whatsapp),
        email = COALESCE(p_config->>'email', email),
        endereco = COALESCE(p_config->>'endereco', endereco),
        telefone = COALESCE(p_config->>'telefone', telefone),
        instagram_url = COALESCE(p_config->>'instagram_url', instagram_url),
        facebook_url = COALESCE(p_config->>'facebook_url', facebook_url),
        horario_funcionamento = COALESCE(p_config->>'horario_funcionamento', horario_funcionamento),
        faixas_etarias = COALESCE(ARRAY(SELECT jsonb_array_elements_text(p_config->'faixas_etarias')), faixas_etarias),
        turnos = COALESCE(ARRAY(SELECT jsonb_array_elements_text(p_config->'turnos')), turnos),
        objetivos = COALESCE(ARRAY(SELECT jsonb_array_elements_text(p_config->'objetivos')), objetivos),
        atualizado_em = NOW()
    WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Salvar Instalação
CREATE OR REPLACE FUNCTION salvar_instalacao(p_item JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_instalacoes (
        id, titulo, descricao, icone, imagem_url, categoria, ordem
    )
    VALUES (
        COALESCE((p_item->>'id')::INT, (SELECT COALESCE(MAX(id), 0) + 1 FROM escola_instalacoes)),
        p_item->>'titulo',
        p_item->>'descricao',
        COALESCE(p_item->>'icone', 'School'),
        p_item->>'imagem_url',
        COALESCE(p_item->>'categoria', 'Geral'),
        COALESCE((p_item->>'ordem')::INT, 0)
    )
    ON CONFLICT (id) DO UPDATE SET
        titulo = EXCLUDED.titulo,
        descricao = EXCLUDED.descricao,
        icone = EXCLUDED.icone,
        imagem_url = EXCLUDED.imagem_url,
        categoria = EXCLUDED.categoria,
        ordem = EXCLUDED.ordem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Salvar Galeria
CREATE OR REPLACE FUNCTION salvar_galeria(p_item JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_galeria (
        id, titulo, descricao, categoria, imagem_url, 
        icone_slug, cor_inicio, cor_fim, col_span, row_span, ordem
    )
    VALUES (
        COALESCE((p_item->>'id')::INT, (SELECT COALESCE(MAX(id), 0) + 1 FROM escola_galeria)),
        p_item->>'titulo',
        p_item->>'descricao',
        p_item->>'categoria',
        p_item->>'imagem_url',
        p_item->>'icone_slug',
        p_item->>'cor_inicio',
        p_item->>'cor_fim',
        (p_item->>'col_span')::INT,
        (p_item->>'row_span')::INT,
        COALESCE((p_item->>'ordem')::INT, 0)
    )
    ON CONFLICT (id) DO UPDATE SET
        titulo = EXCLUDED.titulo,
        descricao = EXCLUDED.descricao,
        categoria = EXCLUDED.categoria,
        imagem_url = EXCLUDED.imagem_url,
        icone_slug = EXCLUDED.icone_slug,
        cor_inicio = EXCLUDED.cor_inicio,
        cor_fim = EXCLUDED.cor_fim,
        col_span = EXCLUDED.col_span,
        row_span = EXCLUDED.row_span,
        ordem = EXCLUDED.ordem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. RPCs - EXCLUSÃO ──────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION excluir_hero(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_hero WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION excluir_instalacao(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_instalacoes WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION excluir_galeria(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_galeria WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION excluir_lead(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_leads WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RPCs - LEADS E MÉTRICAS ──────────────────────────────────────────────────

-- Salvar Lead vindo do formulário
CREATE OR REPLACE FUNCTION salvar_lead(p_lead JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_leads (
        nome_responsavel, whatsapp, nome_crianca, faixa_etaria, 
        turno_desejado, objetivo, mensagem
    )
    VALUES (
        p_lead->>'nomeResponsavel',
        p_lead->>'whatsapp',
        p_lead->>'nomeCrianca',
        p_lead->>'faixaEtaria',
        p_lead->>'turnoDesejado',
        p_lead->>'objetivo',
        p_lead->>'observacoes'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buscar Leads Recentes
CREATE OR REPLACE FUNCTION buscar_leads_recentes()
RETURNS SETOF escola_leads AS $$
BEGIN
    RETURN QUERY SELECT * FROM escola_leads ORDER BY criado_em DESC LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Registrar Visita
CREATE OR REPLACE FUNCTION registrar_visita()
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_estatisticas (dia, visitas)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (dia) DO UPDATE SET visitas = escola_estatisticas.visitas + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buscar Métricas Consolidadas
CREATE OR REPLACE FUNCTION buscar_metricas_admin()
RETURNS JSONB AS $$
DECLARE
    v_hero_count INT;
    v_instalacoes_count INT;
    v_galeria_count INT;
    v_leads_novos_count INT;
    v_visitas_hoje INT;
    v_visitas_total BIGINT;
BEGIN
    SELECT COUNT(*) INTO v_hero_count FROM escola_hero;
    SELECT COUNT(*) INTO v_instalacoes_count FROM escola_instalacoes;
    SELECT COUNT(*) INTO v_galeria_count FROM escola_galeria;
    SELECT COUNT(*) INTO v_leads_novos_count FROM escola_leads WHERE status = 'novo';
    SELECT COALESCE(visitas, 0) INTO v_visitas_hoje FROM escola_estatisticas WHERE dia = CURRENT_DATE;
    SELECT COALESCE(SUM(visitas), 0) INTO v_visitas_total FROM escola_estatisticas;
    
    RETURN jsonb_build_object(
        'hero_count', v_hero_count,
        'instalacoes_count', v_instalacoes_count,
        'galeria_count', v_galeria_count,
        'leads_novos', v_leads_novos_count,
        'visitas_hoje', v_visitas_hoje,
        'visitas_total', v_visitas_total,
        'data_atualizacao', NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. POPULAÇÃO INICIAL (Seed) ─────────────────────────────────────────────────

INSERT INTO escola_configuracoes (
    id, endereco, telefone, whatsapp, email, horario_funcionamento, 
    faixas_etarias, turnos, objetivos
) VALUES (
    1, 
    'Rua Exemplo, 123 - Carapicuíba, São Paulo - SP', 
    '(11) 4181-0000', 
    '(11) 99999-9999', 
    'contato@escolajerbs.com.br', 
    'Seg–Sex: 7h às 18h',
    ARRAY['Berçário (4 meses – 1 ano)', 'Mini Maternal (1 – 2 anos)', 'Maternal (2 – 3 anos)', 'Fase I (3 – 4 anos)', 'Fase II (4 – 5 anos)'],
    ARRAY['Manhã', 'Tarde', 'Integral'],
    ARRAY['Informações de matrícula', 'Agendar uma visita', 'Dúvidas pedagógicas']
) ON CONFLICT (id) DO NOTHING;
