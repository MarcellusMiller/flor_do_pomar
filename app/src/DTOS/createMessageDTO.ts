interface createMessageDTO {
    type: "curation" | "planning";
   
    senderName : string;
    email: string;
    phone: string;
    message : string;
    type_of_event : "casamento" | "aniversario" | "formatura" | "batizado";
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