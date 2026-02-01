import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto"
        CREATE TABLE IF NOT EXISTS admin (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

            email VARCHAR(150) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            
        );
    `);
} 

export async function down() {
    await pool.query(`
        DROP TABLE IF EXISTS admin
        `)
}