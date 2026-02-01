import { UUID } from "crypto"

interface adminAccount{
    id: UUID
    email: string,
    password: string,
}

export default adminAccount