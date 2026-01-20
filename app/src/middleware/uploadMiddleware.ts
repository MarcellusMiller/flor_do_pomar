import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import fs from "fs"

// uploadPath guarda o caminho para guardar a imagem, adicionada também com contexto ao dockerfile
const uploadPath = path.join(process.cwd(), "storage", "images")

const storage = multer.diskStorage({
  // destino para o multer 
  destination: (_, __, cb) => {
    // validação da existencia da pasrta
    if(!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {recursive: true});
    }
    cb(null, uploadPath);
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
    if(!file.mimetype.startsWith("image/")) {
      return cb(new Error("Apenas imagens são permitidas"));
    }
    //retorno de callback da função acima
    return cb(null, true);
  },
  // limite para 5mb
  limits: {
    fieldSize: 5 * 1024 * 1024
  }
});

export default uploadMiddleware;