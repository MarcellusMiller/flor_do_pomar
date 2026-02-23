import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE gallery ADD COLUMN id UUID DEFAULT gen_random_uuid() PRIMARY KEY;
    `);
}

export async function down() {
    await pool.query(`
        ALTER TABLE gallery DROP COLUMN id;
    `);

}