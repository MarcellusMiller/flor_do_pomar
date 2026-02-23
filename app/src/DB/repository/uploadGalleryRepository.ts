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
    const query = "SELECT author, image_path, description FROM gallery ORDER BY created_at DESC";
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

export async function deleteImageRepository(author: string) {
    const query = "DELETE FROM gallery WHERE author = $1 RETURNING image_path";
    try {
        const { rows } = await pool.query(query, [author]);
        if (rows.length === 0) {
            throw new Error("Imagem não encontrada");
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
}
export async function getImageByNameRepository(author: string) {
    const query = "SELECT image_path FROM gallery WHERE author = $1";
    const { rows } = await pool.query(query, [author]);
    return rows[0];
}

export async function editImageRepository(author: string, description: object, path: any, newAuthor?: string) {
    const query = path 
        ? "UPDATE gallery SET author=$1, description=$2, image_path=$3 WHERE author=$4 RETURNING *"
        : "UPDATE gallery SET author=$1, description=$2 WHERE author=$3 RETURNING *";

    const values = path 
        ? [newAuthor ?? author, JSON.stringify(description), path, author]
        : [newAuthor ?? author, JSON.stringify(description), author];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
}
