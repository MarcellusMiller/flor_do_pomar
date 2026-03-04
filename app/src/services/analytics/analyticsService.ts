import { posthogQuery } from "./posthogClient.js";
import { transformPages, transformReferrers, transformDaily } from "./analyticsTransformer.js";

export type TimeFilter = "7d" | "30d" | "3m" | "6m" | "12m";

const dateRangeMap: Record<TimeFilter, string> = {
  "7d": "-7d",
  "30d": "-30d",
  "3m": "-90d",
  "6m": "-180d",
  "12m": "-365d",
};

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

  return {
    stats: {
      totalViews,
      totalUsers,
      ctaClicks,
      abandonRate,
      avgDuration,
    },
    pages: transformPages(pagesData.results, totalViews),
    referrers: transformReferrers(referrersData.results),
    daily: transformDaily(dailyData.results),
  };
}