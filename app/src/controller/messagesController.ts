import { Request, Response } from "express";
import messageDecoration from "../services/messages/createDecorationService.js";
import fs from "fs";
import messageDayCoordination from "../services/messages/createdayCoordination.js";
import nodeMailerService from "../services/mail/nodeMailerService.js";
import messageWeddingPlanning from "../services/messages/createWeddingPlaningService.js";

class messageController{

    private notifyAdmin = async (senderName: string, email: string, type: string, message: string) => {

        await nodeMailerService.send(
            process.env.MAIL_USER!, // email do admin (o seu próprio por enquanto)
            `Nova mensagem recebida - ${type}`,
            `Você recebeu uma nova mensagem de ${senderName} (${email}):\n\n${message}`,
            `
                <h2>Nova mensagem recebida!</h2>
                <p><strong>Nome:</strong> ${senderName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Tipo:</strong> ${type}</p>
                <p><strong>Mensagem:</strong> ${message}</p>
            `
        );
    }
    private notifyClient = async (to: string, senderName: string, type: string) => {

    const typeLabel: Record<string, string> = {
        decoration: "Decoração",
        weddingPlanning: "Planejamento de Casamento",
        dayCoordenation: "Coordenação do Dia"
    };

    await nodeMailerService.send(
            to,
            "Recebemos a sua mensagem!",
            `Olá ${senderName}, recebemos a sua mensagem e entraremos em contato em breve.`,
            `
                <h2>Olá, ${senderName}!</h2>
                <p>Recebemos a sua mensagem sobre <strong>${typeLabel[type] ?? type}</strong>.</p>
                <p>Entraremos em contacto em breve.</p>
                <br/>
                <p>Obrigado pelo contacto!</p>
            `
        );
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
            } else {
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