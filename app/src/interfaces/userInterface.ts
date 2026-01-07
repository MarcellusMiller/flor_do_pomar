import { UUID } from "crypto";

interface user {
    id : UUID;
    nome : string;
    email : string;
    hash_senha : string;
    rule : 'admin' | 'user';
}

export default user;