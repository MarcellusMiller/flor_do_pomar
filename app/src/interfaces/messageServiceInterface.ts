import createMessageDTO from "../DTOS/createMessageDTO.js";

export default interface messageServiceInterface {
    createMessage(message: createMessageDTO): Promise<createMessageDTO>;
}