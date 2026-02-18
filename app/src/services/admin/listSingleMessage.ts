import messagesRepository from "../../DB/repository/messagesRepository.js";

class listSingleMessage {
    async execute(id: string) {
        
        const message = await messagesRepository.findById(id);
        if(!message) {
            return null;
        }
        // depois ajustar para um update para marcar como lida, e não ficar dependendo do front para isso
        // if(!message.is_open) {
        //     await messagesRepository.markAsOpen(id);
        //     message.is_open = true;
        // }
        return message
    }
}


export default new listSingleMessage();