import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE messages
        DROP CONSTRAINT IF EXISTS messages_type_check;

        ALTER TABLE messages
        ADD CONSTRAINT messages_type_check 
        CHECK (type IN ('weddingPlanning', 'decoration', 'dayCoordenation', 'other'));
    `);
}

export async function down() {
    await pool.query(`
        ALTER TABLE messages
        DROP CONSTRAINT IF EXISTS messages_type_check;

        ALTER TABLE messages
        ADD CONSTRAINT messages_type_check 
        CHECK (type IN ('weddingPlanning', 'decoration'));
    `);
}