import { Request, Response } from "express";
import galleryService from "../../services/gallery/galleryService.js";

class galleryController {
    async upload(req: Request, res: Response) {
        try {
            // Captura os dados enviados pelo front (incluindo a orientation string)
            const { name, tag, orientation } = req.body;
            
            const reqBody = {
                name,
                tag,
                orientation, // String passada pelo front ("portrait" ou "landscape")
                path: ""
            };

            // Verifica se o arquivo foi processado pelo middleware do multer
            if (req.file) {
                reqBody.path = req.file.filename;
            }

            if(!reqBody.path) {
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

    async getAll(req: Request, res: Response) {
        try {
            // Chama o serviço (você precisa adicionar o método getAll no galleryService)
            const images = await galleryService.getAll();

            // Mapeia para retornar a URL completa acessível pelo Nginx/Express
            const response = images.map((img: any) => ({
                name: img.image_name,
                tag: img.tag,
                url: `${req.protocol}://${req.get('host')}/gallery/${img.image_path}`
            }));

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar galeria" });
        }
    }
    // todo: implementar método de delete, lembrando de deletar o arquivo do storage também
    async deleteImage(req: Request, res: Response) {
        const {name} = req.params;
        if(!name) {
            return res.status(400).json({message:
                "Nome é obrigatorio"});
            };

            try {
                const deletedImage = await galleryService.deleteImage(name);
                res.status(200).json({message: "Imagem deletada com sucesso"});
            } catch (error) {
                return res.status(500).json({message: "Erro ao deletar imagem"});
            }
        }

}

export default new galleryController(); 