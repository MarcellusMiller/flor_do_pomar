import { Request, Response } from "express";
import adminLoginService from "../../services/admin/adminLoginService.js"
import dotenv from "dotenv";

dotenv.config();

class AdminLoginController {
    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        try {
            const result = await adminLoginService.login(email, password);
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.JWT_SECRET === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24,
            });
            return res.status(200).json({
                message: "Login realizado com sucesso",
                admin: result.admin
            })

        } catch(error: any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }
}

export default new AdminLoginController();