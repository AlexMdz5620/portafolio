import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache({
    max: 500,
    ttl: 60 * 100,
});

export function isRateLimited(identifier: string, limit: number = 3): boolean {
    const count = (rateLimitCache.get(identifier) as number) || 0;
    if (count > limit) {
        return true;
    }
    rateLimitCache.set(identifier, limit + 1);
    return false
}