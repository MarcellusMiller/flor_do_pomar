import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";
import dayCoordinationRepository from "../../DB/repository/dayCoordinationRepository.js";

class messageDayCoordination implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type !== "dayCoordenation") {
            throw new Error("Tipo de mensagem inválido para coordenação do dia");
        }
        try {
            // Chamada ao repositório genérico ou específico para salvar a mensagem
            const savedMessage = await dayCoordinationRepository.insertDayCoordinationMessage(message);
            return savedMessage;
        } catch (error) {
            throw new Error("Erro ao criar mensagem de coordenação do dia: " + error);
        }
    }

}

export default messageDayCoordination;