import { UUID } from "crypto";

interface createMessageDTO {
    type: "curation" | "planning";
   
    senderName : string;
    email: string;
    phone: string;
    message : string;
    isOpen : boolean;
    send_time : Date;

    // Optional fields
    type_of_event : "casamento" | "aniversario" | "formatura" | "batizado";
    id? : UUID;
    localEvent? : string;
    dateOfEvent? : Date;
    image? : string;

}

export default createMessageDTO;