import UserService from '../services/UserService.js';

class AuthController {
    async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }

    async login(req, res) {
        try {
            const { email, senha} = req.body;
            const user = await UserService.login(email, senha);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({ error: error.message});
        }
    }

    async resetPassword(req, res) {
        try {
            const { id, novaSenha } = req.body;
            await UserService.resetPassword(id, novaSenha);
            res.status(200).json({message: 'Password has been update successfully!'});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default new AuthController();