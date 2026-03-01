interface MessageDetailDTO {
    id: string;
    senderName: string;
    email: string;
    phone?: string;
    type: string;
    message: string;
    imageUrl?: string;
    status: 'new' | 'viewed' | 'responded';
    createdAt: Date;
    dateOfEvent?: Date;
}

export default MessageDetailDTO