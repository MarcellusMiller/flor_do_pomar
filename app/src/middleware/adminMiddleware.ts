import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config()

export function adminAuth(req:Request, res:Response, next: NextFunction) {
    const key = req.headers["x-admin-key"];

    if(!key || key !== process.env.ACESS_TOKEN) {
        return res.status(401).json({message: "acesso negado"});

    }
    next()
}
