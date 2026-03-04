import cron from "node-cron";
import { getAnalyticsData } from "../services/analytics/analyticsService.js";
import { saveSnapshot, getPreviousMonthPeriod } from "../DB/repository/analyticsSnapshotRepository.js"

export function startAnalyticsSnapshotJob() {
    // Roda todo dia 1 do mês às 00:05
    cron.schedule("5 0 1 * *", async () => {
        console.log("[Analytics Snapshot] Iniciando snapshot mensal...");
        try {
            const period = await getPreviousMonthPeriod();
            const data = await getAnalyticsData("30d");

            await saveSnapshot({
                period,
                total_views: data.stats.totalViews,
                total_users: data.stats.totalUsers,
                cta_clicks: data.stats.ctaClicks,
                abandon_rate: data.stats.abandonRate,
                avg_duration: data.stats.avgDuration,
            });

            console.log(`[Analytics Snapshot] Snapshot de ${period} salvo com sucesso.`);
        } catch (error) {
            console.error("[Analytics Snapshot] Erro ao salvar snapshot:", error);
        }
    }, { timezone: "Europe/Lisbon" });

    console.log("[Analytics Snapshot] Job agendado.");
}