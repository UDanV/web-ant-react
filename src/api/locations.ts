const API_URL = import.meta.env.VITE_API_URL;

// export const fetchLocations = async () => {
//     const res = await fetch(`${API_URL}/location`);
//
//     if (!res.ok) {
//         throw new Error('Ошибка при получении локаций');
//     }
//
//     const data = await res.json();
//     return data.results;
// };

export async function fetchLocationById(id: string): Promise<Location> {
    const response = await fetch(`${API_URL}/location/${id}`);
    if (!response.ok) {
        throw new Error("Ошибка получения конкретной локации");
    }
    const data = await response.json();
    return data as Location;
}
