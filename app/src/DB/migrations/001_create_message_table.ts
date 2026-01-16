import { pool } from "../DBconn.js";

export async function up() {
   await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      
      type VARCHAR(20) NOT NULL CHECK (type IN ('curation', 'planning')),

      sender_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      message TEXT NOT NULL,

      is_open BOOLEAN NOT NULL DEFAULT false,
      send_time TIMESTAMP NOT NULL DEFAULT NOW(),

      -- Campos extras para curation
      local_event VARCHAR(150),
      date_of_event DATE,
      type_of_event VARCHAR(50),

      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}
export async function down() {
    await pool.query(`
        DROP TABLE IF EXISTS messages;
        `);
}