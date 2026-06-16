CREATE DATABASE IF NOT EXISTS api_campo_minado;

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0.00,

    vitorias INTEGER DEFAULT 0,
    derrotas INTEGER DEFAULT 0,
    valor_ganho DECIMAL(10, 2) DEFAULT 0.00,
    valor_perdido DECIMAL(10, 2) DEFAULT 0.00,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_saldo_positivo CHECK (saldo >= 0)
);

CREATE TABLE IF NOT EXISTS jogo (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    valor_aposta DECIMAL(10, 2) NOT NULL,
    premio_atual DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'EM_ANDAMENTO', -- EM_ANDAMENTO, SACOU, PERDIDO

    tabuleiro JSONB NOT NULL,
    posicoes_reveladas JSONB DEFAULT '[]',
    diamantes_encontrados INTEGER DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_jogo FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
    ON DELETE CASCADE
);
