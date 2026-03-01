import { error } from "console";
import messagesRepository from "../../DB/repository/messagesRepository.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";

class genericMessage implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type !== "other") {
            throw new Error("Tipo de mensagem inválido")
        } 
        try {
            const savedMessage = await messagesRepository.InsertOtherMessage(message)
            return savedMessage;
        } catch(error) {
            throw new Error("Erro ao criar mensagem: " + error);
        }
    }
}

export default genericMessage