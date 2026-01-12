import { randomUUID } from "crypto";
import dateService from "../../utils/dateService.js";
import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";

class messagePlanning implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type != "planning") {
            throw new Error("Tipo de mensagem inválido para planejamento");
    }
    try {
        
        // logica para criar o id
        message.id = randomUUID();
        // se a mensagem foi aberta
        message.isOpen = false;
        // tempo do envio da mensagem
        message.send_time = dateService.now();
    } catch (error) {
        throw new Error("Erro ao criar mensagem de planejamento: " + error);
    }


    return message;
}
}


export default messagePlanning;