import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import fs from "fs";

// diretorio onde as imagens serão salvas
const uploadDir = path.join(__dirname, "../../images");
// caso não exista o diretório, cria ele
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    filefilter: (_, file, cb) => {
        const allowed = ['image/webp', 'image/png', 'image/jpg'];
        if(!allowed.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo inválido'));
        }
    }
    cb(null, true);
    
 });