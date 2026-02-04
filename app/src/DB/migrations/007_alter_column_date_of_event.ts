import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(` 
            ALTER TABLE MESSAGES
            ADD COLUMN date_of_event DATE;
        `)
}

export async function dows() {
    await pool.query(`
        ALTER TABLE MESSAGES
        DROP COLUMN date_of_event;
        `)
}