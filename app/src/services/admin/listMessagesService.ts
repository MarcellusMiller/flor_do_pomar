import messagesRepository from "../../DB/repository/messagesRepository.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";

class listMessagesService {
    // função que vai ser utilizada no controller
    async execute(filters: listMessagesFilterDTO) {

        const finalFilters: listMessagesFilterDTO = {
            isOpen: filters.isOpen ?? false, //valor default
            type: filters.type,
            order: filters.order ?? "desc",
        };

        
        return messagesRepository.list(finalFilters);
    }
}

export default new listMessagesService();