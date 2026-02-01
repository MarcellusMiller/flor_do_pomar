import { Router } from "express";
import messageController from "./controller/messagesController.js";
import uploadMiddleware from "./middleware/uploadMiddleware.js";
import adminController from "./controller/admin/adminController.js";
import { adminAuth } from "./middleware/adminMiddleware.js";
import adminLoginController from "./controller/admin/adminLoginController.js";
import sendTestEmailController from "./controller/email/sendTestEmailController.js";
const router = Router();

// rotas da aplicação

// rota de teste 
router.get("/", (req, res) => {
    return res.json({ message: "API is running!" });
});

// rotas da api
router.post("/message",
    uploadMiddleware.array("image", 5),
    messageController.createMessage,
    sendTestEmailController.send
);

router.get("/admin/messages", 
    adminAuth,
    adminController.ListMessages
);

router.get("/admin/messages/:id", 
    adminAuth,
    adminController.ListSingleMessage
)

router.get("/admin/messages/unread/count",
    adminAuth,
    adminController.countUnreadMessages
)

router.delete("/admin/delete/messages/:id",
    adminAuth,
    adminController.deleteMessage
);

router.post("/admin/login",
    adminLoginController.login
)

router.post("/email/sendTest",
    sendTestEmailController.send
)

export default router;