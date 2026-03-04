import { pool } from "../DBconn.js";

export async function up() {
    await pool.query(`
        ALTER TABLE analytics_snapshots 
        ADD CONSTRAINT analytics_snapshots_period_unique UNIQUE (period);
    `)
}

export async function down() {
    await pool.query(`
        ALTER TABLE analytics_snapshots 
        DROP CONSTRAINT analytics_snapshots_period_unique;
    `)
}