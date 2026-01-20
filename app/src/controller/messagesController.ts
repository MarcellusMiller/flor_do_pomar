import { Request, Response } from "express";
import messageCuration from "../services/messages/createCurationService.js";
import messagePlanning from "../services/messages/createPlaningService.js";
class messageController{
    async createMessage(req: Request, res: Response){
        // uso do try para tratar erros
        try {
            // captura do json enviado pelo cliente
            const body = { ...req.body }; // criando a garantia de um objeto com spread operator
            const file = req.file; // imagem

            // remover em produção
            console.log(body)
            console.log(file)

            // checa se existe imagem
            if(file) {
                body.image = file.filename;
                
            }
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
            else if(body.type === "planning"){
                const service = new messagePlanning();
                const result = await service.createMessage(body);
            
                return res.status(201).json({
                    message: "Mensagem de planejamento criada com sucesso",
                    data: result });
            }
        } catch (error:any) {

            return res.status(500).json({message: error.message});
        }
}
}
export default new messageController();