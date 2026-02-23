import { pool } from "../DBconn.js";
import imageDTO from "../../DTOS/Gallery/galleryDTO.js";

export async function uploadGalleryRepository(image: imageDTO) {
    const query = "INSERT INTO gallery (author, image_path, description ) VALUES ($1, $2, $3) RETURNING *";
    const values = [image.author, image.path, JSON.stringify(image.description)];
    try {
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function getAllImagesRepository() {
    const query = "SELECT author, image_path, description, id FROM gallery ORDER BY created_at DESC";
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function deleteImageRepository(id: string) {
    const query = "DELETE FROM gallery WHERE id = $1 RETURNING image_path";
    try {
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error("Imagem não encontrada");
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}
export async function getImageByIDRepository(id: string) {
    const query = "SELECT image_path FROM gallery WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

export async function editImageRepository(id: string, author: string, description: object, path: any, newAuthor?: string) {
    const query = path 
        ? "UPDATE gallery SET author=$1, description=$2, image_path=$3 WHERE id=$4 RETURNING *"
        : "UPDATE gallery SET author=$1, description=$2 WHERE id=$3 RETURNING *";

    const values = path 
        ? [newAuthor ?? author, JSON.stringify(description), path, id]
        : [newAuthor ?? author, JSON.stringify(description), id];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}
