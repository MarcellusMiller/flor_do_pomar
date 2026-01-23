import { Router } from "express";
import messageController from "./controller/messagesController.js";
import uploadMiddleware from "./middleware/uploadMiddleware.js";
import adminController from "./controller/admin/adminController.js";
import { adminAuth } from "./middleware/adminMiddleware.js";
const router = Router();

// rotas da aplicação

// rota de teste 
router.get("/", (req, res) => {
    return res.json({ message: "API is running!" });
});

// rotas da api
router.post("/message",
    uploadMiddleware.single("image"),
    messageController.createMessage
);

router.get("/admin/messages", 
    adminAuth,
    adminController.ListMessages
);

router.get("/admin/messages/:id", 
    adminAuth,
    adminController.ListSingleMessage
)

export default router;