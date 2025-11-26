export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    try {
        options = options || {};
        const url = `${process.env.API_URL}${endpoint}`;
        
        // console.log('🔵 API Request:', {
        //     url,
        //     method: options.method || 'GET',
        //     body: options.body ? JSON.parse(options.body as string) : undefined
        // });

        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });
        
        const json = await res.json();
        
        // console.log('🟡 API Response:', {
        //     status: res.status,
        //     statusText: res.statusText,
        //     data: json
        // });

        if (!res.ok) {
            throw new Error(JSON.stringify(json));
        }
        
        return json;
    } catch (error) {
        console.error('🔴 API Fetch Error:', error);
        throw error;
    }
}