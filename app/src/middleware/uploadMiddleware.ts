import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs"

// caminho para a pasta de uploads
const uploadPath = (file: Express.Multer.File) => {
   if(file.mimetype === "application/pdf") {
      return path.join(process.cwd(), "storage", "documents");
   }
   return path.join(process.cwd(), "storage", "images");
}

const storage = multer.diskStorage({
  // destino para o multer 
  destination: (_, file, cb) => {
    const dest = uploadPath(file);
    // validação da existencia da pasrta
    if(!fs.existsSync(dest)) {
      fs.mkdirSync(dest, {recursive: true});
    }
    cb(null, dest);
  },
  // logica para nomear o arquivo
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

//  uploadMiddleware carrega o multer
const uploadMiddleware = multer ({
  // storage é a variavel criada acima
  storage,
  // filtro e checagem para apenas aceitar imagens
  fileFilter: (_, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp","application/pdf"];
    //retorno de callback da função acima
    return cb(null, allowedTypes.includes(file.mimetype));
  },
  // limite para 5mb para img e 10mb para pdf
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB para todos
  }
});

export default uploadMiddleware;