import fs from "fs";
import path from "path";
import messagesRepository from "../../DB/repository/messagesRepository.js";

class deleteMessage {
    async execute(id: string) {
        // Busca imagem antes de deletar
        const imagePath = await messagesRepository.findImageByMessageId(id);

        // Deleta do banco
        const deletedMessage = await messagesRepository.deleteMessage(id);

        if (!deletedMessage) return null;

        // Apaga arquivos do disco
        if (imagePath) {
            const images = Array.isArray(imagePath) ? imagePath : [imagePath];
            images.forEach((img: string) => {
                const fullPath = path.join(process.cwd(), "storage", "images", path.basename(img));
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }

        return deletedMessage;
    }
}

export default new deleteMessage();