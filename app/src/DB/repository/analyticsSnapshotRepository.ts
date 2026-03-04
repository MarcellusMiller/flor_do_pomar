import { pool } from "../DBconn.js";

export async function saveSnapshot(data: {
    period: string;
    total_views: number;
    total_users: number;
    cta_clicks: number;
    abandon_rate: string;
    avg_duration: string;
}) {
    await pool.query(`
        INSERT INTO analytics_snapshots (period, total_views, total_users, cta_clicks, abandon_rate, avg_duration)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (period) DO UPDATE SET
            total_views = EXCLUDED.total_views,
            total_users = EXCLUDED.total_users,
            cta_clicks = EXCLUDED.cta_clicks,
            abandon_rate = EXCLUDED.abandon_rate,
            avg_duration = EXCLUDED.avg_duration
    `, [data.period, data.total_views, data.total_users, data.cta_clicks, data.abandon_rate, data.avg_duration]);
}

export async function getSnapshot(period: string) {
    const result = await pool.query(
        `SELECT * FROM analytics_snapshots WHERE period = $1`,
        [period]
    );
    return result.rows[0] ?? null;
}

export async function getPreviousMonthPeriod() {
    const now = new Date();
    const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() === 0 ? 12 : now.getMonth();
    return `${year}-${String(month).padStart(2, "0")}`;
}