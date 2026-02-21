import { pool } from "../DBconn.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";

export async function uploadGalleryRepository(image: imageDTO) {
    const query = "INSERT INTO gallery (image_name, image_path, tag, orientation) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [image.name, image.path, image.tag, image.orientation];
    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getAllImagesRepository() {
    const query = "SELECT image_name, image_path, tag, orientation FROM gallery ORDER BY created_at DESC";
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function deleteImageRepository(name: string) {
    const query = "DELETE FROM gallery WHERE image_name = $1 RETURNING image_path";
    try {
        const { rows } = await pool.query(query, [name]);
        if (rows.length === 0) {
            throw new Error("Imagem não encontrada");
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}