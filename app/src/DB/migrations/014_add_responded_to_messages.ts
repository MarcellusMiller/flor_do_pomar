import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE messages
        ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'new' 
        CHECK (status IN ('new', 'viewed', 'responded'));

        UPDATE messages SET status = 'viewed' WHERE is_open = true;
        UPDATE messages SET status = 'new' WHERE is_open = false;

        ALTER TABLE messages
        DROP COLUMN IF EXISTS is_open;
    `);
}

export async function down() {
    await pool.query(`
        ALTER TABLE messages
        ADD COLUMN IF NOT EXISTS is_open BOOLEAN NOT NULL DEFAULT false;

        UPDATE messages SET is_open = true WHERE status = 'viewed';
        UPDATE messages SET is_open = true WHERE status = 'responded';

        ALTER TABLE messages
        DROP COLUMN IF EXISTS status;
    `);
}