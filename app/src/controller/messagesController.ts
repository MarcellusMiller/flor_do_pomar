import { Request, Response } from "express";
class messageController{
    async createMessage(req: Request, res: Response){
        const body = req.body;
        try {
            if(!body || !body.senderName || !body.email || !body.phone || !body.type || !body.message || !body.type_of_event){ 
                return res.status(400).json({message: "Dados incompletos"});
            } else {
                if(body.type === "curação"){
                // Lógica para mensagens do tipo "curação"

                // Garante que o local do evento e a data do evento sejam fornecidos
                if(!body.localOfEvent || !body.dateOfEvent) {
                    return res.status(400).json({message: "Dados incompletos para mensagem de curação"});
                } else {
                    
                    const date = new Date();

                    body.sendTime = date.toLocaleString("pt-PT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });

                    console.log(body);
                    return res.status(200).json({ message: "Mensagem recebida com sucesso" });
                }
                }
            }
            
        } catch (error) {
            return res.status(500).json({message: "Erro no servidor"});
        }
}
}
export default new messageController();