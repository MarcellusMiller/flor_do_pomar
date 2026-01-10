import { Request, Response } from "express";
import messageCuration from "../services/messages/createCurationService.js";
class messageController{
    async createMessage(req: Request, res: Response){
        // captura do json enviado pelo cliente
        const body = req.body;
        // uso do try para tratar erros
        try {
            // validação dos dados obrigatórios
            if(!body || !body.senderName || !body.email || !body.phone || !body.type || !body.message || !body.type_of_event){ 
                return res.status(400).json({message: "Dados incompletos"});
            } 
            // logica para criação de mensagem de curadoria
            else if(body.type === "curation"){
                const service = new messageCuration();
                const result = await service.createMessage(body)
                
                
                return res.status(201).json({
                    message: "Mensagem de curadoria criada com sucesso", 
                    data: result
                });
            } 
            // to do para mensagem de tipo planing
            
            
        } catch (error:any) {

            return res.status(500).json({message: error.message});
        }
}
}
export default new messageController();