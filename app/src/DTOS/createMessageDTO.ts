interface createMessageDTO {
    type: "curation" | "planning";
   
    senderName : string;
    email: string;
    phone: string;
    message : string;
    type_of_event : "casamento" | "aniversario" | "formatura" | "batizado";
    // Campos opcionais 
    
    localEvent? : string;
    image? : string
    // criarei mais tarde
    numberOfGuests? : number;
    budget? : string;
    ideas? : string;

    // removidos caso for adicionar novamente
    // dateOfEvent? : Date;
}

export default createMessageDTO;