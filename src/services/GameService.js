import GameRepository from "../respositories/GameRepository.js";
import UserRepository from "../respositories/UserRepository.js";

class GameService {
    async startGame(userId, valorAposta) {
        if (valorAposta <= 0) {
            throw new Error('The value bet it must be bigger that 0');
        }

        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error("Could't find this users");
        }

        if (parseFloat(user.saldo) < parseFloat(valorAposta)) {
            throw new Error('There is enought balance');
        }

        const gameInProgress = await GameRepository.findInProgressByUserId(userId);
        if (gameInProgress) {
            throw new Error("You don't to start a new match");
        }

        const tabuleiro = this.generateBoard();

        const novoSaldo = parseFloat(user.saldo) - valorAposta;
        await UserRepository.updateSaldo(userId, novoSaldo);

        const game = await GameRepository.create({
            userId,
            valorAposta,
            tabuleiro,
            premioAtual: 0
        });

        return { gameId: game.id };
    }

    async revealPosition(gameId, linha, coluna) {
        const game = await GameRepository.findById(gameId);
        if (!game) {
            throw new Error('Match is not find!');
        }

        if (linha < 0 || linha >= 5 || coluna < 0 || coluna >= 5) {
            throw new Error('Invalid position on the board');
        }

        const posicoesReveladas = game.posicoes_reveladas || [];
        const jaReveladas = posicoesReveladas.some(
            p => p.linha === linha && p.coluna === coluna
        );

        if (jaReveladas) {
            throw new Error('This is position it has already been revealed. Please, choose another one!');
        }

        const tabuleiro = game.tabuleiro;
        const conteudo = tabuleiro[linha][coluna];

        posicoesReveladas.push({ linha, coluna });

        if (conteudo === "BOMBA") {
            await GameRepository.updateProgress(
                gameId,
                posicoesReveladas,
                game.diamantes_encontrados,
                0,
                'PERDIDO'
            );
            return { resultado: 'BOMBA', status: 'PERDIDO' };
        } else {
            const novosDiamantes = game.diamantes_encontrados + 1;
            const novoPremio = this.calculatePrize(game.valor_aposta, novosDiamantes);

            await GameRepository.updateProgress(gameId, posicoesReveladas, novosDiamantes, novoPremio, 'EM_ANDAMENTO');

            return {
                resultado: 'DIAMANTE',
                diamantesEncontrados: novosDiamantes,
                premioAtual: novoPremio
            };
        }
    }

    async cashout(gameId) {
        const game = await GameRepository.findById(gameId);
        if (!game) {
            throw new Error('Game is not find');
        }

        if (game.status !== 'EM_ANDAMENTO') {
            throw new Error('This is game has already been finished');
        }

        if (game.diamantes_encontrados === 0) {
            throw new Error('You need find at least one diamond before taking out');
        }

        const user = await UserRepository.findById(game.user_id);
        const novoSaldo = parseFloat(user.saldo) + parseFloat(game.premio_atual);

        await UserRepository.updateSaldo(game.user_id, novoSaldo);
        await GameRepository.finalizeGame(gameId, 'SACOU', game.premio_atual);

        return {
            status: 'VITORIA',
            valorSacado: game.premio_atual,
            novoSaldo: novoSaldo
        };
    }

    generateBoard() {
        const board = Array(5).fill(null).map(() => Array(5).fill('DIAMANTE'));
        let bombsPlaced = 0;
        while (bombsPlaced < 3) {
            const r = Math.floor(Math.random() * 5);
            const c = Math.floor(Math.random() * 5);
            if (board[r][c] === 'DIAMANTE') {
                board[r][c] = 'BOMBA';
                bombsPlaced++;
            }
        }
        return board;
    }

    calculatePrize(valorAposta, quantidadeDiamantes) {
        const premio = parseFloat(valorAposta) * (1 + (quantidadeDiamantes * 0.33));
        return Math.round(premio * 100) / 100;
    }
}

export default new GameService();
