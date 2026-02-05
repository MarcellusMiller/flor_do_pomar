import messagesRepository from "../../DB/repository/messagesRepository.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";

class listMessagesService {
    // função que vai ser utilizada no controller
    async execute(filters: listMessagesFilterDTO, limit: number, offset: number) {
        const finalFilters: listMessagesFilterDTO = {
            isOpen: filters.isOpen, // Remove o default false para permitir listar todas
            type: filters.type,
            order: filters.order ?? "desc",
        };
        
        
        
        return messagesRepository.list(finalFilters, limit, offset);
    }
}

export default new listMessagesService();