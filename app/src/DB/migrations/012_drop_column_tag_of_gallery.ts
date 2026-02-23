import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE gallery
        DROP COLUMN tag;
        `)
}

export async function down() {
    await pool.query(`
        ALTER TABLE gallery
        ADD COLUMN tag VARCHAR(50) NOT NULL;
        `)
}