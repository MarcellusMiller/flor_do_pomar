import dateService from "../dateService.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";
import { randomUUID } from "crypto";

class messageCuration implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type != "curation") {
            throw new Error("Tipo de mensagem inválido para curação");
        } 

        if(!message.localEvent || !message.dateOfEvent || !message.type_of_event) {
                throw new Error("Dados incompletos para mensagem de curação");
        } 
        // Lógica para criar mensagem de curação
        message.send_time = dateService.now();
        // id da mensagem
        message.id = randomUUID();
        // se a mensagem foi aberta
        message.isOpen = false;
        return message
        
    }
    
}

export default messageCuration;

