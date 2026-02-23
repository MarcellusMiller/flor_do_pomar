import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE gallery
        DROP COLUMN orientation,
        ADD COLUMN description JSONB;
    `)
    await pool.query(`
        ALTER TABLE gallery
        RENAME COLUMN image_name TO author;
    `)
}

export async function down() {
    await pool.query(`
        ALTER TABLE gallery
        DROP COLUMN description,
        ADD COLUMN orientation VARCHAR(20),
        DEFAULT 'landscape',
        CHECK (orientation IN ('landscape', 'portrait'));
    `)
    await pool.query(`
        ALTER TABLE gallery
        RENAME COLUMN author TO image_name;
    `)
}
