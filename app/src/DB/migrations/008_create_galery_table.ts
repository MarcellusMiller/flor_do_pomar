import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS gallery (
            image_name VARCHAR(100) NOT NULL,
            image_path TEXT NOT NULL,
            tag VARCHAR(50) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        `);
}

export async function down() {
    await pool.query(`
        DROP TABLE IF EXISTS gallery;
        `)
}