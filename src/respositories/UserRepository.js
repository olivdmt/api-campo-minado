import db from '../config/database.js';

class UserRepository {
    async create(usuario) {
        const {
            nome,
            email,
            dataNascimento,
            senha
        } = usuario;
        const query = `
            INSERT INTO usuarios
                (nome, email, data_nascimento, senha)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome, email, data_nascimento, saldo
        `;
        const values = [nome, email, dataNascimento, senha];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    async findById(id) {
        const query = 'SELECT id, nome, email, saldo FROM usuarios WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    async updatePassword(id, novaSenha) {
        const query = 'UPDATE usuarios SET senha = $1 WHERE id = $2';
        await db.query(query, [novaSenha, id]);
    }

    async updateSaldo(id, saldo) {
        const query = 'UPDATE usuarios SET saldo = $1 WHERE id = $2 RETURNING saldo';
        const { rows } = await db.query(query, [saldo, id]);
        return rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM usuarios WHERE id = $1';
        await db.query(query, [id]);
    }

    async getDashboardStats(id) {
        const totalGamesQuery = 'SELECT COUNT(*) FROM jogo WHERE id_usuario = $1';
        const winsQuery = "SELECT COUNT(*) FROM jogo WHERE id_usuario = $1 AND status = 'SACOU'";
        const lossesQuery = "SELECT COUNT(*) FROM jogo WHERE id_usuario = $1 AND status = 'PERDIDO'";
        const amountWonQuery = "SELECT SUM(premio_atual) FROM jogo WHERE id_usuario = $1 AND status = 'SACOU'";
        const amountLostQuery = "SELECT SUM(valor_aposta) FROM jogo WHERE id_usuario = $1 AND status = 'PERDIDO'";

        const [
            totalGames,
            wins,
            losses,
            amountWon,
            amountLost
        ] = await Promise.all([
            db.query(totalGamesQuery, [id]),
            db.query(winsQuery, [id]),
            db.query(lossesQuery, [id]),
            db.query(amountWonQuery, [id]),
            db.query(amountLostQuery, [id])
        ]);

        return {
            totalJogos: parseInt(totalGames.rows[0].count),
            vitorias: parseInt(wins.rows[0].count),
            derrotas: parseInt(losses.rows[0].count),
            valorGanho: parseFloat(amountWon.rows[0].sum || 0),
            valorPerdido: parseFloat(amountLost.rows[0].sum || 0)
        };
    }
}

export default new UserRepository();