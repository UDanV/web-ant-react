import type {Character} from "../types/character.ts";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCharacters = async (urls: string[]): Promise<Character[]> => {
    return await Promise.all(
        urls.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Ошибка при получении персонажа: ${url}`);
            return res.json();
        })
    );
};

export async function fetchCharacterById(id: string): Promise<Character> {
    const res = await fetch(`${API_URL}/character/${id}`);
    if (!res.ok) throw new Error('Ошибка при получении конкретного персонажа');
    return res.json();
}