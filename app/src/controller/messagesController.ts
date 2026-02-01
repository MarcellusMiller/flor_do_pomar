import { Request, Response } from "express";
import messageDecoration from "../services/messages/createDecorationService.js";
import messagePlanning from "../services/messages/createWeddingPlaningService.js";
class messageController{
    async createMessage(req: Request, res: Response){
        // uso do try para tratar erros
        try {
            // captura do json enviado pelo cliente
            const body = { ...req.body }; // criando a garantia de um objeto com spread operator
            const files = req.files as any[]; // imagem

            // remover em produção
            console.log(body)
            console.log(files)

            // checa se existe imagem
            if(files && files.length > 0) {
                body.image = files.map(file => file.filename);
            }
            // validação dos dados obrigatórios
            if(!body || !body.senderName || !body.email || !body.phone || !body.type || !body.message || !body.type_of_event){ 
                return res.status(400).json({message: "Dados incompletos"});
            } 
            // logica para criação de mensagem de decoration
            else if(body.type === "decoration"){
                const service = new messageDecoration();
                const result = await service.createMessage(body)
                
                
                return res.status(201).json({
                    message: "Mensagem de decoratin criada com sucesso", 
                    data: result
                });
            } 
            // to do para mensagem de tipo planing
            else if(body.type === "weddingPlanning"){
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