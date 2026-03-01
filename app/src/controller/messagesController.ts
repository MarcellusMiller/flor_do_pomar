import { Request, Response } from "express";
import messageDecoration from "../services/messages/createDecorationService.js";
import fs from "fs";
import messageDayCoordination from "../services/messages/createdayCoordination.js";
import nodeMailerService from "../services/mail/nodeMailerService.js";
import messageWeddingPlanning from "../services/messages/createWeddingPlaningService.js";
import { clientEmailTemplate } from "../services/mail/template/clientEmail.js";
import { adminEmailTemplate } from "../services/mail/template/adminEmail.js";
import genericMessage from "../services/messages/genericMessage.js";

class messageController{

    private notifyClient = async (to: string, senderName: string, type: string) => {
        const typeLabel: Record<string, string> = {
            decoration: "Decoração",
            weddingPlanning: "Planejamento de Casamento",
            dayCoordination: "Coordenação do Dia",
        };
        await nodeMailerService.send(
            to,
            "Recebemos sua mensagem!",
            `Olá ${senderName}, recebemos a sua mensagem e encontraremos em contato em breve`,
            clientEmailTemplate(senderName, typeLabel[type] ?? type)
        )
    }
    private notifyAdmin = async (senderName: string,email: string, type: string, message: string) => {

    const typeLabel: Record<string, string> = {
        decoration: "Decoração",
        weddingPlanning: "Planejamento de Casamento",
        dayCoordenation: "Coordenação do Dia"
    };
    await nodeMailerService.send(
        process.env.MAIL_USER!,
        `Nova mensagem recebida - ${type}`,
        `Nova mensagem recebida de ${senderName}, (${email}), ${message}`,
        adminEmailTemplate(senderName, email, type, message)
    )
    
    }

    createMessage = async (req: Request, res: Response) => {
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
                for(const file of files) {
                    const isImage = file.mimetype.startsWith("image/");
                    const limit = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB para imagens, 10MB para outros arquivos
                    if(file.size > limit) {
                        files.forEach((f) => fs.unlinkSync(f.path)); // remove todos os arquivos do servidor
                        return res.status(400).json({message: `${isImage ? "Imagens" : "PDFs"} excedem o limite de ${isImage ? "5MB" : "10MB"}`});
                    } 
                }
                body.image = files.map(file => file.filename);
            }
            // validação dos dados obrigatórios
            if(!body || !body.senderName || !body.email || !body.phone || !body.type || !body.message || !body.type_of_event){ 
                return res.status(400).json({message: "Dados incompletos"});
            } 
            let result;
            let responseMessage;

            if(body.type === "decoration") {
                result = await new messageDecoration().createMessage(body);
                responseMessage = "Mensagem de decoration criada com sucesso";
            } else if(body.type === "weddingPlanning") {
                result = await new messageWeddingPlanning().createMessage(body);
                responseMessage = "Mensagem de planejamento criada com sucesso";
            } else if(body.type === "dayCoordenation") {
                result = await new messageDayCoordination().createMessage(body);
                responseMessage = "Mensagem de coordenação do dia criada com sucesso";
            } else if(body.type === "other") {
                result = await new genericMessage().createMessage(body);
                responseMessage = "Mesagem criada com sucesso"
            }
             else {
                return res.status(400).json({message: "Tipo de mensagem inválido"});
            }

            Promise.all([
                this.notifyAdmin(body.senderName, body.email, body.type, body.message),
                this.notifyClient(body.email, body.senderName, body.type)
            ]).catch(err => console.error("Erro ao enviar emails", err));

            return res.status(201).json({ message: responseMessage, data: result });
        } catch (error:any) {

            console.error("Erro no createMessage:", error.message, error.stack);
            return res.status(500).json({message: error.message});
        }
}
}
export default new messageController();