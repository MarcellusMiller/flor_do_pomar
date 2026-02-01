import fs from "fs";
import messagesRepository from "../../DB/repository/messagesRepository.js";
import path from "path";
import { fileURLToPath } from "url";

// Correção para __dirname funcionar em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PullImagesService {
    async execute(id: string) {
        const message = await messagesRepository.findById(id);
        
        // Valida se a mensagem existe e se tem imagem antes de tentar montar o caminho
        if(!message || !message.image_path) {
            return null;
        }

        // Ajuste do caminho: sobe 3 níveis para chegar na raiz (src/services/messages -> raiz)
        const imagepath = path.join(__dirname, "..", "..", "..", "storage", "images", message.image_path);
           
        if(!fs.existsSync(imagepath)) {
            return null;
        }

        return imagepath;
    }
}

export default new PullImagesService();