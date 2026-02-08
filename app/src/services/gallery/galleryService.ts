import { uploadGalleryRepository } from "../../DB/repository/uploadGalleryRepository.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";
class galleryService {
    async upload(data: imageDTO) {
        return await uploadGalleryRepository(data);
    }
}

export default new galleryService();