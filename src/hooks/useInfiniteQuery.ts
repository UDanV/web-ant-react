import {type QueryFunctionContext, useInfiniteQuery} from '@tanstack/react-query';

type Filters = Record<string, string | undefined>;

type EntityType = 'character' | 'location' | 'episode';

interface PageInfo {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

interface EntityPage<T> {
    info: PageInfo;
    results: T[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const useInfiniteEntityQuery = <T>(
    endpoint: EntityType,
    filters: Filters
) => {
    return useInfiniteQuery<EntityPage<T>, Error>({
        queryKey: [endpoint, filters],
        queryFn: async ({ pageParam = 1 }: QueryFunctionContext) => {
            const page = pageParam ?? 1;

            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
            params.append('page', page.toString());

            const res = await fetch(`${API_URL}/${endpoint}/?${params}`);
            if (!res.ok) throw new Error('Ошибка загрузки');
            return res.json();
        },
        getNextPageParam: (lastPage) => {
            const nextUrl = lastPage.info?.next;
            if (!nextUrl) return undefined;
            const url = new URL(nextUrl);
            return Number(url.searchParams.get('page'));
        },
        initialPageParam: 1,
    });
};