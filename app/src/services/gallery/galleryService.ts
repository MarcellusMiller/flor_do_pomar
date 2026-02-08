import { uploadGalleryRepository, getAllImagesRepository } from "../../DB/repository/uploadGalleryRepository.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";
class galleryService {
    async upload(data: imageDTO) {
        return await uploadGalleryRepository(data);
    }
    async getAll() {
        return await getAllImagesRepository();
    }
}

export default new galleryService();