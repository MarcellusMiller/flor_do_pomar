import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";

const uploadPath = path.join(process.cwd(), "storage", "gallery");

const upload = multer({
    storage: multer.memoryStorage(), // Armazena na memória para processar com Sharp
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas.'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Middleware para processar a imagem
const processImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const filename = `${randomUUID()}.webp`;
    const filepath = path.join(uploadPath, filename);

    try {
        console.log("Processando e salvando imagem em:", filepath);
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Converte para WebP, redimensiona se necessário (opcional) e salva
        await sharp(req.file.buffer)
            .webp({ quality: 80 }) // Qualidade 80% (ótimo balanço)
            .toFile(filepath);

        // Atualiza o req.file para o controller pensar que foi salvo pelo multer padrão
        req.file.filename = filename;
        req.file.path = filepath;
        req.file.mimetype = "image/webp";

        next();
    } catch (error) {
        next(error);
    }
};

// Exporta um objeto que imita o multer, mas injeta o processamento
export default {
    single: (fieldName: string) => [upload.single(fieldName), processImage]
};