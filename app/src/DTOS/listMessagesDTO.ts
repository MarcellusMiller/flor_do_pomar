import { UUID } from "crypto";

interface listMessagesDTO {
    id: string;
    senderName: string;
    type: string;
    isOpen: boolean;
    createdAt: Date;
}

export default listMessagesDTO