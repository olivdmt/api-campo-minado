import Express from 'express';
import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.get('/dashboard', UserController.getDashboard);
router.get('/:id', UserController.getProfile);
router.put('/:id', UserController.updateSaldo);
router.delete('/:id', UserController.DeleteUser);

export default router;