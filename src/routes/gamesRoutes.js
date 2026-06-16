import Express from 'express';
import { Router } from 'express';
import GamesController from '../controllers/GameController.js';

const router = Router();

router.post('/start', GamesController.start);
router.post('/:gameId/reveal', GamesController.reveal);
router.post('/:gameId/cashout', GamesController.cashout);

export default router;