
import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";

class messagePlanning implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type != "planning") {
            throw new Error("Tipo de mensagem inválido para planejamento");
    }
    try {
        
        // Lógica para criar mensagem de planejamento
    } catch (error) {
        throw new Error("Erro ao criar mensagem de planejamento: " + error);
    }


    return message;
}
}


export default messagePlanning;