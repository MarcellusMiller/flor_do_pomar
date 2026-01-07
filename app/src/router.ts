import { Router } from "express";
import { Request, Response } from "express";
import  RegisterController  from "./controller/registerController.js";

const router = Router();

// rotas da aplicação

// rota de teste 
router.get("/", (req, res) => {
    return res.json({ message: "API is running!" });
});

// rotas da api
router.post("/register", new RegisterController().handle);

export default router;