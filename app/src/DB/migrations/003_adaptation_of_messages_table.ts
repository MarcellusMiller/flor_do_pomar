import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
            ALTER TABLE messages
            DROP COLUMN date_of_event;
        `)
}

export async function down() {
    await pool.query(`
        ALTER TABLE messages
        ADD COLUMN date_of_event DATE;
        `)
}