import { Request, Response } from "express";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import listMessagesService from "../../services/admin/listMessagesService.js";
import listSingleMessage from "../../services/admin/listSingleMessage.js";


class adminController {
    async ListMessages(req: Request, res: Response) {
        // filtro basicos para as mensagens
        const filters: listMessagesFilterDTO = {
            isOpen: req.query.isOpen != undefined
            ? req.query.isOpen === "true"
            : undefined,

            type: req.query.type as string | undefined,

            order: req.query.order as "asc" | "desc" | undefined,
        };
        // messages que é a chamada da função com filtros como parametro
        const messages = await listMessagesService.execute(filters);

        return res.status(200).json({
            message: "Mensagens listadas com sucesso",
            data: messages
        })
    }
    async ListSingleMessage(req: Request, res: Response) {
        try {
            const {id} = req.params;
            // tem q esperar pelo service com a mensagem
            if(!id) {
                return res.status(400).json({message: "ID é Obrigatorio"}) 
            }

            const message = await listSingleMessage.execute(id);

            if(!message) {
                return res.status(404).json({message: "Mensagem não encontrada"})
            }

            return res.status(200).json({
                message: "Mensagem obtida com sucesso",
                data: message
            })
        } catch(error) {
            return res.status(500).json({message: "Erro ao buscar mensagem"})
        }
        
    }
}

export default new adminController()