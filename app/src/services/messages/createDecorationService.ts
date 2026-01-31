import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";
import decorationRepository from "../../DB/repository/decorationRepository.js";


class messageDecoration implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type != "decoration") {
            throw new Error("Tipo de mensagem inválido para curação");
        } 
        try {
            if(!message.localEvent  || !message.type_of_event) {
                throw new Error("Dados incompletos para mensagem de curação");
            }
            // chamada ao repositório para salvar a mensagem de curação
            const savadMessage = await new decorationRepository().InsertdecorationMessage(message);
            // retorna a mensagem salva
            return savadMessage;
            
        } catch (error) {
            throw new Error("Erro ao criar mensagem de decoration: " + error);
        }
        
    }
    
}

export default messageDecoration;

