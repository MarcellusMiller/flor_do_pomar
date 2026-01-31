import { Request, Response } from "express";
import adminLoginService from "../../services/admin/adminLoginService.js";

class AdminLoginController {
    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        try {
            const result = await adminLoginService.login(email, password);
            return res.status(200).json(result);

        } catch(error: any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }
}

export default new AdminLoginController();