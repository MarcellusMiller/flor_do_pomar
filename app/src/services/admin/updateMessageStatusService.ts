import messagesRepository from "../../DB/repository/messagesRepository.js";

class updateMessageStatusService {
    async execute(id: string, status: 'new' | 'viewed' | 'responded') {
        return messagesRepository.updateStatus(id, status);
    }
}

export default new updateMessageStatusService();