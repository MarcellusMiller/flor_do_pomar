import path from "path";
import messagesRepository from "../../DB/repository/messagesRepository.js";

class listSingleMessage {
    async execute(id: string) {
        
        const message = await messagesRepository.findById(id);
        
        if(!message) {
            return null;            
        }

        const imagePath = await messagesRepository.findImageByMessageId(id);

        if(imagePath) {
            const images = Array.isArray(imagePath) ? imagePath : [imagePath];
            message.imagePath = images.map(img => `/images/${path.basename(img)}`);
        }
        return message
    }
}


export default new listSingleMessage();