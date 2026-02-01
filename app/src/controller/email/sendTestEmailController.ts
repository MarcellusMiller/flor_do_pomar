import { Request, Response } from "express";
import nodeMailerService from "../../services/mail/nodeMailerService.js";

class sendTestEmailController {
    async send(req: Request, res: Response) {
        try {
            const result = await nodeMailerService.send(
                "destinatario@teste.com",
                "Teste de Email",
                "Conteúdo do email de teste",
                "<p>Conteúdo do email de <b>teste</b></p>"
            );
            return res.status(200).json({ message: "Email enviado", data: result });
        } catch(error) {
            return res.status(500).json({message: "Erro ao enviar email"});
        }
    }
}

export default new sendTestEmailController();