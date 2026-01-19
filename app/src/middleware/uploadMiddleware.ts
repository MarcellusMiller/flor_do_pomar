import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const uploadMiddleware = multer({ storage });
