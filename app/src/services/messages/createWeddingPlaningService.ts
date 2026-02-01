import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";
import PlanningRepository from "../../DB/repository/weddingPlanningRepository.js";

class messageWeddingPlanning implements messageServiceInterface {
    async createMessage(message: createMessageDTO): Promise<createMessageDTO> {
        if(message.type != "weddingPlanning") {
            throw new Error("Tipo de mensagem inválido para planejamento");
    }
    try {
        // Lógica para criar mensagem de planejamento
        const savadMessage = await new PlanningRepository().InsertWeddingPlanningMessage(message);
        return savadMessage;
    } catch (error) {
        throw new Error("Erro ao criar mensagem de planejamento: " + error);
    }

}
}


export default messageWeddingPlanning;