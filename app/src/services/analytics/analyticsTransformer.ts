const colors = ["bg-pink-500", "bg-blue-500", "bg-red-500", "bg-indigo-500"];

const ignoredRoutes = ["/confirmed", "/cookies", "/terms", "/privacy"];

const routeLabels: Record<string, string> = {
  "/pt": "Página Inicial",
  "/en": "Página Inicial",
  "/pt/contact": "Contacto",
  "/en/contact": "Contacto",
  "/pt/contact/confirmed": "Pedido Enviado",
  "/en/contact/confirmed": "Pedido Enviado",
  "/pt/wedding-planner": "Wedding Planner",
  "/en/wedding-planner": "Wedding Planner",
  "/pt/portifolio": "Portfólio",
  "/en/portifolio": "Portfólio",
  "/pt/decoration": "Decoração",
  "/en/decoration": "Decoração",
  "/pt/about": "Sobre Nós",
  "/en/about": "Sobre Nós",
  "/pt/cookies": "Política de Cookies",
  "/en/cookies": "Política de Cookies",
  "/pt/terms": "Termos de Uso",
  "/en/terms": "Termos de Uso",
  "/pt/privacy": "Política de Privacidade",
  "/en/privacy": "Política de Privacidade",
}

export function transformDevices(results: any[]) {
    const colors: Record<string, string> = {
        Desktop: "bg-blue-500",
        Mobile: "bg-pink-500",
        Tablet: "bg-yellow-500",
    }
    const total = (results ?? []).reduce((acc, r) => acc + (r.count ?? 0), 0) || 1

    return (results ?? [])
        .sort((a, b) => b.count - a.count)
        .map((r) => ({
            device: r.breakdown_value ?? "Desconhecido",
            visits: r.count ?? 0,
            percentage: Math.round(((r.count ?? 0) / total) * 100),
            color: colors[r.breakdown_value] ?? "bg-gray-500",
        }))
}

export function transformCountries(results: any[]) {
    const total = (results ?? []).reduce((acc, r) => acc + (r.count ?? 0), 0) || 1

    return (results ?? [])
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
        .map((r) => ({
            country: r.breakdown_value ?? "Desconhecido",
            visits: r.count ?? 0,
            percentage: Math.round(((r.count ?? 0) / total) * 100),
        }))
}

export function transformCtaSources(results: any[]) {
    const sourceLabels: Record<string, string> = {
        sidebar: "Menu Lateral",
        weedingPlanner: "Wedding Planner",
        "about-page": "Sobre Nós",
        decoration: "Decoração",
    }
    const total = (results ?? []).reduce((acc, r) => acc + (r.count ?? 0), 0) || 1

    return (results ?? [])
        .sort((a, b) => b.count - a.count)
        .map((r) => ({
            source: sourceLabels[r.breakdown_value] ?? r.breakdown_value ?? "Desconhecido",
            clicks: r.count ?? 0,
            percentage: Math.round(((r.count ?? 0) / total) * 100),
        }))
}

export function transformFunnel(results: any[]) {
    const labels: Record<string, string> = {
        wedding_planner_viewed: "Wedding Planner",
        portfolio_viewed: "Portfólio",
        about_viewed: "Sobre Nós",
        contact_cta_clicked: "CTA Clicado",
        contact_form_submitted: "Formulário Enviado",
    }

    return (results ?? []).map((r) => ({
        step: labels[r.label] ?? r.label,
        count: r.count ?? 0,
    }))
}


export function transformPages(results: any[], totalViews: number) {
    const grouped: Record<string, number> = {};

    (results ?? [])
        .filter((r) => r.breakdown_value !== "/home")
        .forEach((r) => {
            const label = routeLabels[r.breakdown_value] ?? r.breakdown_value ?? "Desconhecida";
            grouped[label] = (grouped[label] ?? 0) + (r.count ?? 0);
        });

    return Object.entries(grouped)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([page, views]) => ({
            page,
            views,
            percentage: totalViews > 0 ? Math.round((views / totalViews) * 100) : 0,
        }));
}

export function transformLanguages(results: any[]) {
    const filtered = (results ?? []).filter((r) =>
        !ignoredRoutes.some((ignored) => r.breakdown_value?.includes(ignored))
    );

    const pt = filtered
        .filter((r) => r.breakdown_value?.startsWith("/pt"))
        .reduce((acc, r) => acc + (r.count ?? 0), 0);

    const en = filtered
        .filter((r) => r.breakdown_value?.startsWith("/en"))
        .reduce((acc, r) => acc + (r.count ?? 0), 0);

    const total = pt + en || 1;

    return [
        { lang: "Português", visits: pt, percentage: Math.round((pt / total) * 100), color: "bg-green-500" },
        { lang: "English", visits: en, percentage: Math.round((en / total) * 100), color: "bg-blue-500" },
    ];
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