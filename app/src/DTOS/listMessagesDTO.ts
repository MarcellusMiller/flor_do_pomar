interface listMessagesDTO {
    id: string;
    senderName: string;
    type: string;
    status: "new" | "viewed" | "responded";
    createdAt: Date;
}

export default listMessagesDTO