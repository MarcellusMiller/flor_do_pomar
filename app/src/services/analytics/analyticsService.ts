import { posthogQuery } from "./posthogClient.js";
import { transformPages, transformReferrers, transformDaily, transformLanguages } from "./analyticsTransformer.js";
import { getSnapshot, getPreviousMonthPeriod } from "../../DB/repository/analyticsSnapshotRepository.js";

export type TimeFilter = "7d" | "30d" | "3m" | "6m" | "12m";

const dateRangeMap: Record<TimeFilter, string> = {
  "7d": "-7d",
  "30d": "-30d",
  "3m": "-90d",
  "6m": "-180d",
  "12m": "-365d",
};

function calcTrend(current: number, previous: number): { value: number; positive: boolean } {
  if (!previous || previous === 0) return { value: 0, positive: true };
  const diff = ((current - previous) / previous) * 100;
  return { value: Math.abs(Math.round(diff)), positive: diff >= 0 };
}

export async function getAnalyticsData(period: TimeFilter) {
  const dateFrom = dateRangeMap[period];

  const [
    viewsData,
    uniqueData,
    pagesData,
    referrersData,
    dailyData,
    ctaData,
    abandonedData,
    avgDurationData,
  ] = await Promise.all([
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "$pageview", math: "total" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "$pageview", math: "dau" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", breakdownFilter: { breakdown: "$pathname", breakdown_type: "event" }, series: [{ event: "$pageview", math: "total" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", breakdownFilter: { breakdown: "$referring_domain", breakdown_type: "event" }, series: [{ event: "$pageview", math: "total" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "$pageview", math: "total" }], dateRange: { date_from: "-7d" }, interval: "day" }),
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "contact_cta_clicked", math: "total" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "contact_form_abandoned", math: "total" }], dateRange: { date_from: dateFrom } }),
    posthogQuery({ kind: "TrendsQuery", series: [{ event: "$pageview", math: "median", math_property: "$session_duration" }], dateRange: { date_from: dateFrom } }),
  ]);

  const totalViews = viewsData.results?.[0]?.count ?? 0;
  const totalUsers = uniqueData.results?.[0]?.count ?? 0;
  const ctaClicks = ctaData.results?.[0]?.count ?? 0;
  const formAbandoned = abandonedData.results?.[0]?.count ?? 0;

  const abandonRate = ctaClicks > 0
    ? `${Math.round((formAbandoned / ctaClicks) * 100)}%`
    : "—";

  const avgSeconds = avgDurationData.results?.[0]?.count ?? 0;
  const minutes = Math.floor(avgSeconds / 60);
  const seconds = Math.floor(avgSeconds % 60);
  const avgDuration = avgSeconds > 0
    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
    : "—";

  // busca snapshot do mês anterior para calcular tendência
  const previousPeriod = await getPreviousMonthPeriod();
  const snapshot = await getSnapshot(previousPeriod);

  const trends = {
    totalViews: calcTrend(totalViews, snapshot?.total_views ?? 0),
    totalUsers: calcTrend(totalUsers, snapshot?.total_users ?? 0),
    ctaClicks: calcTrend(ctaClicks, snapshot?.cta_clicks ?? 0),
  };

  return {
    stats: {
      totalViews,
      totalUsers,
      ctaClicks,
      abandonRate,
      avgDuration,
      trends,
    },
    pages: transformPages(pagesData.results, totalViews),
    languages: transformLanguages(pagesData.results), // 👈 reutiliza pagesData
    referrers: transformReferrers(referrersData.results),
    daily: transformDaily(dailyData.results),
};
}