import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        CREATE TABLE analytics_snapshots (
        id SERIAL PRIMARY KEY,
        period VARCHAR(7),        -- ex: "2026-02"
        total_views INTEGER,
        total_users INTEGER,
        cta_clicks INTEGER,
        abandon_rate VARCHAR(10),
        avg_duration VARCHAR(10),
        created_at TIMESTAMP DEFAULT NOW()
        );
    `)
    
}

export async function down() {
    await pool.query(`DROP TABLE IF EXISTS analytics_snapshots;`)
}