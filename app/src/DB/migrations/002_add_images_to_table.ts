import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE messages
        ADD COLUMN image_path TEXT;
        `)
}

export async function down() {
    await pool.query(`
        ALTER TABLE messages
        DROP COLUMN image_path;
        `)
}