import { UUID } from "crypto";

interface createMessageDTO {
    type: "curation" | "planning";
   
    senderName : string;
    email: string;
    phone: string;
    message : string;
    isOpen : boolean;
    send_time : Date;
    type_of_event : "casamento" | "aniversario" | "formatura" | "batizado";
    id : UUID;
    // Campos opcionais 
    
    localEvent? : string;
    dateOfEvent? : Date;

    // criarei mais tarde
    numberOfGuests? : number;
    budget? : string;
    ideas? : string;
    image? : string;

}

export default createMessageDTO;