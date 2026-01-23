import messagesRepository from "../../DB/repository/messagesRepository.js";
import { UUID } from "crypto";

class listSingleMessage {
    async execute(id: string) {
        
        const message = await messagesRepository.findById(id)
        return message
    }
}


export default new listSingleMessage();