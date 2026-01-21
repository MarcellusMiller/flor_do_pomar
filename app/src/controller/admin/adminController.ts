import { Request, Response } from "express";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import listMessagesService from "../../services/admin/listMessagesService.js";

class adminController {
    async ListMessages(req: Request, res: Response) {
        
        const filters: listMessagesFilterDTO = {
            isOpen: req.query.isOpen != undefined
            ? req.query.isOpen === "true"
            : undefined,

            type: req.query.type as string | undefined,

            order: req.query.order as "asc" | "desc" | undefined,
        };

        const messages = await listMessagesService.execute(filters);

        return res.status(200).json({
            message: "Mensagens listadas com sucesso",
            data: messages
        })
    }
}

export default new adminController()