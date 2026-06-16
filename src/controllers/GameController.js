import GameService from "../services/GameService.js";

class GameController {
    async start(req, res) {
        try {
            const { idUser, valorAposta } = req.body;
            const game = await GameService.startGame(idUser, valorAposta);
            res.status(201).json({
                success: true,
                data: game
            });
        } catch (error) {
            res.status(400).json({ 
                success: false,
                error: error.message,
            });
        }
    }

    async reveal(req, res) {
        try {
            const { gameId} = req.params;
            const { linha, coluna } = req.body;
            const result = await GameService.revealPosition(gameId, linha, coluna);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }

    async cashout(req, res) {
        try {
            const { gameId } = req.params;
            const result = await GameService.cashout(gameId);
            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
}

export default new GameController();
