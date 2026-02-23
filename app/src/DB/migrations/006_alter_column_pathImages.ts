import { pool } from "../DBconn.js";

async function up() {
    await pool.query(`
        ALTER TABLE messages
        ALTER COLUMN image_path TYPE TEXT[]
        USING ARRAY[image_path];
    `);
}

async function down() {
    await pool.query(`
        ALTER TABLE messages
        ALTER COLUMN image_path TYPE TEXT;
    `)
}