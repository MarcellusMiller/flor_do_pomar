import { Router } from "express";
import messageController from "./controller/messagesController.js";

const router = Router();

// rotas da aplicação

// rota de teste 
router.get("/", (req, res) => {
    return res.json({ message: "API is running!" });
});

// rotas da api
router.post("/message", messageController.createMessage);

export default router;