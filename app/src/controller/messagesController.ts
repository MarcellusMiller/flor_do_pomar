import { Request, Response } from "express";
class messageController{
    async createMessage(req: Request, res: Response){
        const body = req.body;
        try {
            if(!body || !body.senderName || !body.email || !body.phone || !body.type || !body.message){ 
                return res.status(400).json({message: "Dados incompletos"});
            } else {
                return res.status(200).json({message: "Mensagem recebida com sucesso"});
            }
        } catch (error) {
            return res.status(500).json({message: "Erro no servidor"});
        }
}
}
export default new messageController();