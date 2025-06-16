import type {Episode} from "../types/episode.ts";

const API_URL = import.meta.env.VITE_API_URL;

// export const fetchEpisodes = async () => {
//     const res = await fetch(`${API_URL}/episode`);
//
//     if (!res.ok) {
//         throw new Error('Ошибка при получении эпизодов');
//     }
//
//     const data = await res.json();
//     return data.results;
// };

export const fetchCastEpisodes = async (urls: string[]): Promise<Episode[]> => {
    return await Promise.all(
        urls.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Ошибка при получении эпизода персонажа: ${url}`);
            return res.json();
        })
    );
};

export const fetchEpisodeById = async (id: string): Promise<Episode> => {
    const res = await fetch(`${API_URL}/episode/${id}`);
    if (!res.ok) throw new Error("Ошибка при загрузке эпизода");
    return res.json();
}