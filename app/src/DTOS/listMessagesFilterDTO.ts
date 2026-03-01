interface listMessagesFilterDTO {
    status?: 'new' | 'viewed' | 'responded';
    type?: string;
    order?: "asc" | "desc";
}

export default listMessagesFilterDTO