import db from '../config/database.js';

class GameRepository {
    async create(game) {
        const {
            userId,
            valorAposta,
            tabuleiro,
            premioAtual
        } = game;

        const query = `
            INSERT INTO jogo (id_usuario, valor_aposta, tabuleiro, premio_atual, status)
            VALUES ($1, $2, $3, $4, 'EM_ANDAMENTO')
            RETURNING id
        `;
        const values = [
            userId,
            valorAposta,
            JSON.stringify(tabuleiro),
            premioAtual
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findInProgressByUserId(userId) {
        const query = "SELECT * FROM jogo WHERE id_usuario = $1 AND status = 'EM_ANDAMENTO'";
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    async findById(id) {
        const query = "SELECT * FROM jogo WHERE id = $1";
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    async updateProgress(id, posicoesReveladas, diamantesEncontrados, premioAtual, status = 'EM_ANDAMENTO') {
        const query = `
            UPDATE jogo
            SET posicoes_reveladas = $1, diamantes_encontrados = $2, premio_atual = $3, status = $4
            WHERE id = $5
        `;
        const values = [JSON.stringify(posicoesReveladas), diamantesEncontrados, premioAtual, status, id];
        await db.query(query, values);
    }

    async finalizeGame(id, status, premioFinal) {
        const query = 'UPDATE jogo SET status = $1, premio_atual = $2 WHERE id = $3';
        const values = [status, premioFinal, id];
        await db.query(query, values);
    }
}

export default new GameRepository();