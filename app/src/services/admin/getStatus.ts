import messagesRepository from "../../DB/repository/messagesRepository.js"
class getStatusService {
    async execute() {
        const status = await messagesRepository.getMessagesStats();
        return status
    }
}

export default new getStatusService()