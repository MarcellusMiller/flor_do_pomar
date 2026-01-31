import jwt from "../services/utils/jwt.js";
import { Request, Response, NextFunction } from "express";


export function adminAuth(req:Request, res:Response, next: NextFunction) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Não autorizado: Token não encontrado" });
    }

    const decoded = jwt.validateToken(token);

    if (!decoded) {
        return res.status(403).json({ message: "Acesso negado: Token inválido ou expirado" });
    }

    // Inserimos o ID no header para que o controller possa identificar o admin, se necessário
    if (typeof decoded === 'object' && decoded.id) {
        req.headers['user-id'] = String(decoded.id);
    }

    next();
}
