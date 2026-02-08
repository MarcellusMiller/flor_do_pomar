import { pool } from "../DBconn.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";

export async function uploadGalleryRepository(image: imageDTO) {
    const query = "INSERT INTO gallery (image_name, image_path, tag) VALUES ($1, $2, $3)";
    const values = [image.name, image.path, image.tag];
    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
}