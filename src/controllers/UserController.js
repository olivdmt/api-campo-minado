import UserService from "../services/UserService.js";

class UserController {
    async getProfile(req, res) {
        try {
            const { id } = req.params
            const user = await UserService.getUserProfile(id);
            res.status(201).json({
                success: true,
                data: user,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message,
            });
        }
    }

    async getDashboard(req, res) {
        try {
            const userId = req.query.userId || 1;
            const stats = await UserService.getDashboard(userId);
            res.status(200).json({
                success: true,
                data: stats,
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message,
            });
        }
    }

    async updateSaldo(req, res) {
        try {
            const { id } = req.params;
            const { saldo } = req.body;
            const updatedUser = await UserService.updateSaldo(id, saldo);
            res.status(200).json({
                success: true,
                data: updatedUser,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message,
            });
        }
    }

    async DeleteUser(req, res) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(id);
            res.status(200).send();
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message,
            });
        }
    }
}

export default new UserController();
