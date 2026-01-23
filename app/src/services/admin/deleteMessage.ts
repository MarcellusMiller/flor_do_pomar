import messagesRepository from "../../DB/repository/messagesRepository.js";

class deleteMessage {
    async execute(id: string) {
        return messagesRepository.deleteMessage(id)
         
    }
}

export default new deleteMessage();