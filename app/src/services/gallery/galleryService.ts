import { uploadGalleryRepository, getAllImagesRepository, deleteImageRepository, editImageRepository,getImageByNameRepository } from "../../DB/repository/uploadGalleryRepository.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";
import fs from "fs";
import {join} from "path";

class galleryService {
    async upload(data: imageDTO) {
        return await uploadGalleryRepository(data);
    }
    async getAll() {
        return await getAllImagesRepository();
    }
    async deleteImage(name: string) {
        // 1. Deleta do banco primeiro para obter o nome real do arquivo (image_path)
        const deletedImage = await deleteImageRepository(name);

    // 2. Monta o caminho correto 
        const pathImage = join(process.cwd(), "storage", "gallery", deletedImage.image_path);

        // 3. Verifica se o arquivo existe e deleta (evita erro se o arquivo já sumiu)
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }

        return deletedImage;
    }

    async editImage(name: string, tag: string, orientation: string, path: any) {
        if(path) {
            const current = await getImageByNameRepository(name);
            if(current?.image_path) {
                const pathImage = path.join(process.cwd(), "storage", "gallery", current.image_path);
                if (fs.existsSync(pathImage)) {
                    fs.unlinkSync(pathImage);
                }
            }
        }
        const editedImage = await editImageRepository(name, tag, orientation, path);
        return editedImage;
    }
    
}

export default new galleryService();