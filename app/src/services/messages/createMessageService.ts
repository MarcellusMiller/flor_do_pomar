import createMessageDTO from "../../DTOS/createMessageDTO.js";
import messageServiceInterface from "../../interfaces/messageServiceInterface.js";
class createMessageService implements messageServiceInterface {
        async createMessage(message: createMessageDTO): Promise<void> {
            try {
                // if(!message.type || !message.id || !message.senderName || !message.email || !message.phone || !message.message || !message.type_of_event || !message.send_time || !message.image){ {
                // throw new Error("All fields are required to create a message."); } }
                if(message.type == "Curação") {
                    // receber local da curação e data da curaçao

                }
            
        }
        catch (error) {
            throw new Error(`Failed to create message: ${error}`);
        }
}

}
export default createMessageService;