import messagesRepository from "../../DB/repository/messagesRepository.js";

class countUnreadMessages {
    async execute() {
        return messagesRepository.countUnread()
    }
}

export default new countUnreadMessages();