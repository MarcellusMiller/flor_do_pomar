import messagesRepository from "../../DB/repository/messagesRepository.js";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";

class listMessagesService {
    async execute(filters: listMessagesFilterDTO) {

        const finalFilters: listMessagesFilterDTO = {
            isOpen: filters.isOpen ?? false, //valor default
            type: filters.type,
            order: filters.order ?? "desc",
        };

        const repository = new messagesRepository()
        return repository.list(finalFilters);
    }
}

export default new listMessagesService();