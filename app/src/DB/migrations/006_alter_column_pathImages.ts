import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE messages
        ALTER COLUMN image_path TYPE TEXT[]
        USING ARRAY[image_path];
    `);
}

export async function down() {
    await pool.query(`
        ALTER TABLE messages
        ALTER COLUMN image_path TYPE TEXT;
    `)
}