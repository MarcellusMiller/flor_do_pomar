    import { Request, Response } from "express";
    import galleryService from "../../services/gallery/galleryService.js";
    import imageDTO from "../../DTOS/Gallery/galleryDTO.js";

    class galleryController {
        async upload(req: Request, res: Response) {
            try {
                // Captura os dados enviados pelo front (incluindo a orientation string)
                const { author, description_pt, description_en } = req.body;
                
                const reqBody: imageDTO = {
                    author,
                    description: {
                        translations: [
                            {lang: "pt", text: description_pt},
                            {lang: "en", text: description_en}
                        ]
                    },
                    path: ""
                };

                // Verifica se o arquivo foi processado pelo middleware do multer
                if (req.file) {
                    reqBody.path = req.file.filename;
                }

                if(!reqBody.path) {
                    return res.status(400).json({message: "Ausencia de dados"});
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

                // Mapeia para retornar a URL completa acessível pelo Nginx/Express
                const response = images.map((img: any) => ({
                    id: img.id,
                    author: img.author,
                    description: img.description,
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
            const {id} = req.params;
            if(!id) {
                return res.status(400).json({message:
                    "Nome é obrigatorio"});
                };

                try {
                    const deletedImage = await galleryService.deleteImage(id);
                    res.status(200).json({message: "Imagem deletada com sucesso"});
                } catch (error) {
                    return res.status(500).json({message: "Erro ao deletar imagem"});
                }
        }

        async editImage(req: Request, res: Response) {
            try {
                const {id} = req.params;
                const {author, description_pt, description_en} = req.body;

            
                const description = {
                    translations: [
                        {lang: "pt", text: description_pt},
                        {lang: "en", text: description_en}
                    ]

                }

                if(req.file) {
                    await galleryService.editImage(author, description, req.file.filename, id )
                    res.status(200).json({message: "Imagem editada com sucesso"});
                } else {
                    await galleryService.editImage(author, description, null, id);
                    res.status(200).json({message: "Imagem editada com sucesso"});
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "Erro ao editar imagem"});
            }
            
        }
            
    }

    export default new galleryController(); 