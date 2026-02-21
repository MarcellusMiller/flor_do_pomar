import { Request, Response } from "express";
import galleryService from "../../services/gallery/galleryService.js";

class galleryController {
    async upload(req: Request, res: Response) {
        try {
            // Captura os dados enviados pelo front (incluindo a orientation string)
            const { name: imageName, tag, orientation } = req.body;
            
            const reqBody = {
                name: imageName,
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
            const GALLERY_PATH = "/storage/gallery/";
            console.log("GET /gallery chamado");
            console.log("images do banco:", images);
            console.log("GALLERY_PATH:", GALLERY_PATH);

            // Mapeia para retornar a URL completa acessível pelo Nginx/Express
            const response = images.map((img: any) => ({
                id: img.image_name,
                name: img.image_name,
                tag: img.tag,
                orientation: img.orientation,
                url: `${GALLERY_PATH}${img.image_path}`, 
                // Exemplo: http://localhost/gallery/filename.jpg
            }));
            console.log("URL gerada:", `${GALLERY_PATH}${images[0]?.image_path}`);
            console.log("GALLERY_PATH raw:", JSON.stringify(GALLERY_PATH));
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

    async editImage(req: Request, res: Response) {
        try {
            const {name: imageName, tag, orientation} = req.body;
        
            const reqbody = {
                name: imageName,
                tag,
                orientation,
                path: ""
            }

            if(req.file) {
                reqbody.path = req.file.filename;
                const newFile = await galleryService.editImage(imageName, tag, orientation, reqbody.path)
                res.status(200).json({message: "Imagem editada com sucesso"});
            } else {
                await galleryService.editImage(imageName, tag, orientation, null);
                res.status(200).json({message: "Imagem editada com sucesso"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Erro ao editar imagem"});
        }
        
    }
        
}

export default new galleryController(); 