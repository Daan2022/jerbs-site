-- FUNÇÕES ADMINISTRATIVAS PARA ESCOLA JERBS (VERSÃO CORRIGIDA)

-- Limpeza de funções existentes para evitar conflitos de tipo de retorno
DROP FUNCTION IF EXISTS salvar_hero(jsonb);
DROP FUNCTION IF EXISTS atualizar_configuracoes(jsonb);
DROP FUNCTION IF EXISTS salvar_instalacao(jsonb);
DROP FUNCTION IF EXISTS salvar_galeria(jsonb);
DROP FUNCTION IF EXISTS excluir_hero(int);
DROP FUNCTION IF EXISTS excluir_instalacao(int);
DROP FUNCTION IF EXISTS excluir_galeria(int);

-- 1. Salvar/Atualizar Slide do Hero
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
        (p_slide->>'ordem')::INT
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

-- 2. Atualizar Configurações da Escola (Sincronizado com schema_completo.sql)
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

-- 3. Salvar/Atualizar Instalação (Sincronizado com icone_slug)
CREATE OR REPLACE FUNCTION salvar_instalacao(p_item JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_instalacoes (
        id, titulo, descricao, icone_slug, imagem_url, ordem
    )
    VALUES (
        COALESCE((p_item->>'id')::INT, (SELECT COALESCE(MAX(id), 0) + 1 FROM escola_instalacoes)),
        p_item->>'titulo',
        p_item->>'descricao',
        p_item->>'icone',
        p_item->>'imagem_url',
        (p_item->>'ordem')::INT
    )
    ON CONFLICT (id) DO UPDATE SET
        titulo = EXCLUDED.titulo,
        descricao = EXCLUDED.descricao,
        icone_slug = EXCLUDED.icone_slug,
        imagem_url = EXCLUDED.imagem_url,
        ordem = EXCLUDED.ordem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Salvar/Atualizar Galeria
CREATE OR REPLACE FUNCTION salvar_galeria(p_item JSONB)
RETURNS VOID AS $$
BEGIN
    INSERT INTO escola_galeria (
        id, titulo, categoria, imagem_url, ordem
    )
    VALUES (
        COALESCE((p_item->>'id')::INT, (SELECT COALESCE(MAX(id), 0) + 1 FROM escola_galeria)),
        p_item->>'titulo',
        p_item->>'categoria',
        p_item->>'imagem_url',
        (p_item->>'ordem')::INT
    )
    ON CONFLICT (id) DO UPDATE SET
        titulo = EXCLUDED.titulo,
        categoria = EXCLUDED.categoria,
        imagem_url = EXCLUDED.imagem_url,
        ordem = EXCLUDED.ordem;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Excluir Registros
CREATE OR REPLACE FUNCTION excluir_hero(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_hero WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION excluir_instalacao(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_instalacoes WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE OR REPLACE FUNCTION excluir_galeria(p_id INT) RETURNS VOID AS $$ BEGIN DELETE FROM escola_galeria WHERE id = p_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
