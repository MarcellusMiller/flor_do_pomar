const POSTHOG_HOST = process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

export async function posthogQuery(query: object) {
    const res = await fetch(
        `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${POSTHOG_API_KEY}`,
            },
            body: JSON.stringify({query}),
        }
    );
    if(!res.ok) throw new Error(`PostHog API error: ${res.status}`);
    return res.json();
}