interface MessageDetailDTO {
    id: string;
    senderName: string;
    email: string;
    phone?: string;
    type: string;
    message: string;
    imageUrl?: string;
    isOpen: boolean;
    createdAt: Date;
    dateOfEvent?: Date;
}

export default MessageDetailDTO