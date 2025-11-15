export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    options = options || {};
    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.msg);
    }
    return json;
}