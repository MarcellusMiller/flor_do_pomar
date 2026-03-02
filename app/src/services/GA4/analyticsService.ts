import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const propertyId = process.env.GA_PROPERTY_ID;

type TimeFilter = "7d" | "30d" | "3m" | "6m" | "12m";

const dateRangeMap: Record<TimeFilter, string> = {
  "7d": "7daysAgo",
  "30d": "30daysAgo",
  "3m": "90daysAgo",
  "6m": "180daysAgo",
  "12m": "365daysAgo",
};

export async function getAnalyticsData(period: TimeFilter) {
  const startDate = dateRangeMap[period] ?? "30daysAgo";

  // Métricas principais
  const [metricsResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate: "today" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "totalUsers" },
      { name: "bounceRate" },
      { name: "averageSessionDuration" },
      { name: "eventCount" },
    ],
  });

  // Páginas mais visitadas
  const [pagesResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "pageTitle" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  // Origem do tráfego
  const [referrersResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate: "today" }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 4,
  });

  // Visitas por dia da semana
  const [dailyResponse] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
  });

  // Processar métricas principais
  const row = metricsResponse.rows?.[0]?.metricValues;
  const totalViews = parseInt(row?.[0]?.value ?? "0");
  const totalUsers = parseInt(row?.[1]?.value ?? "0");
  const bounceRate = parseFloat(row?.[2]?.value ?? "0") * 100;
  const avgDuration = parseFloat(row?.[3]?.value ?? "0");
  const minutes = Math.floor(avgDuration / 60);
  const seconds = Math.floor(avgDuration % 60);

  // Processar páginas
  const totalPageViews = pagesResponse.rows?.reduce(
    (acc, r) => acc + parseInt(r.metricValues?.[0]?.value ?? "0"),
    0
  ) ?? 1;

  const pages = pagesResponse.rows?.map((r) => {
    const views = parseInt(r.metricValues?.[0]?.value ?? "0");
    return {
      page: r.dimensionValues?.[0]?.value ?? "Desconhecida",
      views,
      percentage: Math.round((views / totalPageViews) * 100),
    };
  }) ?? [];

  // Processar origens
  const colors = ["bg-pink-500", "bg-blue-500", "bg-red-500", "bg-indigo-500"];
  const referrers = referrersResponse.rows?.map((r, i) => ({
    source: r.dimensionValues?.[0]?.value ?? "Desconhecido",
    visits: parseInt(r.metricValues?.[0]?.value ?? "0"),
    color: colors[i] ?? "bg-gray-500",
  })) ?? [];

  // Processar dados diários
  const daily = dailyResponse.rows?.map((r) => ({
    date: r.dimensionValues?.[0]?.value ?? "",
    views: parseInt(r.metricValues?.[0]?.value ?? "0"),
  })) ?? [];

  return {
    stats: {
      totalViews,
      totalUsers,
      bounceRate: `${bounceRate.toFixed(1)}%`,
      avgDuration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    },
    pages,
    referrers,
    daily,
  };
}