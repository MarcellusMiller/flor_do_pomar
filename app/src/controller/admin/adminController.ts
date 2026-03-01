import { Request, Response } from "express";
import listMessagesFilterDTO from "../../DTOS/listMessagesFilterDTO.js";
import listMessagesService from "../../services/admin/listMessagesService.js";
import listSingleMessage from "../../services/admin/listSingleMessage.js";
import deleteMessage from "../../services/admin/deleteMessage.js";
import getStatusService from "../../services/admin/getStatus.js";
import updateMessageStatusService from "../../services/admin/updateMessageStatusService.js";
const typeLabels: Record<string, string> = {
    weddingPlanning: 'Wedding Planning',
    decoration: 'Decoração',
    dayCoordenation: 'Coordenação do Dia',
    other: 'Outro',
}

const eventTypeLabels: Record<string, string> = {
    aniversario: 'Aniversário',
    batizado: 'Batizado',
    casamento: 'Casamento',
    formatura: 'Formatura',
    other: 'Outro',
}



class adminController {
    
    async ListMessages(req: Request, res: Response) {
        
        
        // paginação 
        const page = parseInt(req.query.page as string) || parseInt(req.params.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        
        // filtro basicos para as mensagens
        const filters: listMessagesFilterDTO = {
            status: req.query.status as 'new' | 'viewed' | 'responded' | undefined,
            type: req.query.type as string | undefined,
            order: req.query.order as "asc" | "desc" | undefined,
        };
        // messages que é a chamada da função com filtros como parametro
        const messages = await listMessagesService.execute(filters, limit, offset);

        const mappedRows = messages.rows.map((msg: any) => ({
            ...msg,
            type: typeLabels[msg.type] ?? msg.type,
        }))

        return res.status(200).json({
            message: "Mensagens listadas com sucesso",
            data: mappedRows,
            pagination: {
                total: messages.total,
                page,
                limit,
                totalPages: Math.ceil(messages.total / limit),
            }
        })
    }
    async ListSingleMessage(req: Request, res: Response) {
        try {
            const typeLabels: Record<string, string> = {
                weddingPlanning: 'Wedding Planning',
                decoration: 'Decoração',
                dayCoordenation: 'Coordenação do Dia',
                other: 'Outro',
            }
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
                data: { 
                    ...message, 
                    type: typeLabels[message.type] ?? message.type,
                    type_of_event: eventTypeLabels[message.type_of_event] ?? message.type_of_event
                }
            })
        } catch(error) {
            console.log(error)
            return res.status(500).json({message: "Erro ao buscar mensagem"})
        }
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
   async getMessagesStats(req: Request, res: Response) {
        try {
            const status = await getStatusService.execute();
            return res.status(200).json({ data: status });
        } catch(error) {
            return res.status(500).json({ message: "Erro ao buscar estatísticas" });
        }
    }
    async updateMessageStatus(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) return res.status(400).json({ message: "ID é obrigatório" });
        if (!['new', 'viewed', 'responded'].includes(status)) {
            return res.status(400).json({ message: "Status inválido" });
        }

        const updated = await updateMessageStatusService.execute(id, status);
        if (!updated) return res.status(404).json({ message: "Mensagem não encontrada" });

        return res.status(200).json({ message: "Status atualizado", data: updated });
    } catch(error) {
        return res.status(500).json({ message: "Erro ao atualizar status" });
    }
    }

}

export default new adminController()