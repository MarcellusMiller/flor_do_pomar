import { UUID } from "crypto";

interface Messages {
    id : UUID;
    senderId : UUID;
    senderName : string;
    message : string;
    send_time : Date;
    
}

export default Messages;