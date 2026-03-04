const colors = ["bg-pink-500", "bg-blue-500", "bg-red-500", "bg-indigo-500"];

export function transformPages(results: any[], totalViews: number) {
    return (results ?? [])
        .filter((r) => r.breakdown_value !== "/home")
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((r) => ({
            page: r.breakdown_value ?? "Desconhecida",
            views: r.count ?? 0,
            percentage: totalViews > 0 ? Math.round((r.count / totalViews) * 100) : 0,
        }));
}

export function transformReferrers(results: any[])  {
    return (results ?? [])
        .sort((a, b) => b.count - a.count)
        .slice(0, 4)
        .map((r, i) => ({
            source: r.breakdown_value === "$direct" ? "Direto" : r.breakdown_value || "Direto",
            visits: r.count ?? 0,
            color: colors[i] ?? "bg-gray-500"
        }));
}

export function transformDaily(results: any[]) {
    return (results?.[0]?.days ?? []).map((date: string, i: number) => ({
        date,
        views: results?.[0]?.data?.[i] ?? 0,
    }));
}