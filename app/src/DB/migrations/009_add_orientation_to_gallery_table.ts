import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE gallery
        ADD COLUMN orientation VARCHAR(20)
        DEFAULT 'landscape'
        CHECK (orientation IN ('landscape', 'portrait'));
    `);
}

export async function down() {
    await pool.query(`
        ALTER TABLE gallery
        DROP COLUMN orientation;
    `);
}