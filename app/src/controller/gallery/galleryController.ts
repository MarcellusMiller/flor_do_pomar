import { Request, Response } from "express";
import galleryService from "../../services/gallery/galleryService.js";

class galleryController {
    async upload(req: Request, res: Response) {
        const reqBody: {} = {...req.body};
        try {
            if(!reqBody) {
                res.status(400).json({message: "Ausencia de dados"});
            } else {
                await galleryService.upload(reqBody);
                res.status(200).json({message: "Upload realizado com sucesso"});
            }
        } catch(error) {
            // tirar em produção
            console.log(error);
        }
        
    }
}

export default new galleryController(); 