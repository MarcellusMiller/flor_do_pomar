import { Request, Response } from "express";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import listMessagesService from "../../services/admin/listMessagesService.js";
import listSingleMessage from "../../services/admin/listSingleMessage.js";
import countUnreadMessages from "../../services/admin/countUnreadMessages.js";
import deleteMessage from "../../services/admin/deleteMessage.js";
import messagesRepository from "../../DB/repository/messagesRepository.js";
import path from "path";


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

            const imagePath = await messagesRepository.findImageByMessageId(id);

            if(imagePath) {
                const firstImage = Array.isArray(imagePath) ? imagePath[0] : imagePath;
                // Retorna a URL relativa para o frontend acessar (ex: /images/nome-do-arquivo.jpg)
                message.image = `/images/${path.basename(firstImage)}`;
            };

            return res.status(200).json({
                message: "Mensagem obtida com sucesso",
                data: message
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao buscar mensagem"})
        }
    }
   async countUnreadMessages(req: Request, res: Response) {
        const count = await countUnreadMessages.execute();
        return res.status(200).json({
            message: "Numero de mensagens obtido",
            data: count
        })
   }
   async deleteMessage(req: Request, res: Response) {
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "ID e obrigatorio"});
        }

        const deletedMessage = await deleteMessage.execute(id);
        if(!deletedMessage) {
            return res.status(404).json({message: "Mensagem não encontrada"});
        }
        return res.status(200).json({
            message: "Mensagem apagada com sucesso",
            data: deletedMessage
        })
   }
}

export default new adminController()