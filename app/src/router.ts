import { Router } from "express";
import messageController from "./controller/messagesController.js";
import uploadMiddleware from "./middleware/uploadMiddleware.js";
import adminController from "./controller/admin/adminController.js";
import { adminAuth } from "./middleware/adminMiddleware.js";
import adminLoginController from "./controller/admin/adminLoginController.js";
import galleryController from "./controller/gallery/galleryController.js";
import uploadGallery from "./middleware/uploadGalleryMiddleware.js";
import analyticsController from "./controller/GA4/analyticsController.js";
const router = Router();

// rotas da aplicação

// rota de teste 
router.get("/health", (req, res) => {
    return res.status(200).json({ status: "ok" });
});

// rotas da api
router.post("/message",
    uploadMiddleware.array("image", 5),
    messageController.createMessage,
);


router.get("/admin/messages", 
    adminAuth,
    adminController.ListMessages
);

router.get("/messages-stats", 
    adminAuth,
    adminController.getMessagesStats,
)

router.get("/admin/messages/:id", 
    adminAuth,
    adminController.ListSingleMessage
);

router.delete("/admin/delete/messages/:id",
    adminAuth,
    adminController.deleteMessage
);

router.patch("/messages/:id/status", adminAuth, adminController.updateMessageStatus)

router.post("/admin/login",
    adminLoginController.login
);
router.post("/admin/logout", 
    adminAuth, 
    adminLoginController.logout);

router.get("/admin/verify", adminAuth, (req, res) => {
    return res.status(200).json({ status: "ok" });
});

router.post("/gallery/upload", 
    adminAuth,
    uploadGallery.single("image"),
    galleryController.upload
);

router.get("/gallery", 
    galleryController.getAll
);

// rota para deletar imagem da galeria
router.delete("/gallery/delete/:id",
    adminAuth,
    galleryController.deleteImage
)

router.patch("/gallery/edit/:id",
    adminAuth,
    uploadGallery.single("image"),
    galleryController.editImage
);

router.get("/admin/analytics", 
    adminAuth, 
    analyticsController.getAnalytics
);

export default router;