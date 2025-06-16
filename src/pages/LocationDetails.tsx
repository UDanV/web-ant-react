import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import type { Location } from "../types/location";
import type { Character } from "../types/character";
import { fetchLocationById } from "../api/locations.ts";
import Header from "../components/Header";
import {fetchCharacters} from "../api/characters.ts";
import {CharacterCard} from "../components/cardCharacter.tsx";

export default function LocationDetails() {
    const { locationId } = useParams<{ locationId: string }>();
    const [location, setLocation] = useState<Location | null>(null);
    const [residents, setResidents] = useState<Character[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!locationId) {
            setError('Не удалось найти данные или локации с таким id не существует');
            return;
        }

        (async () => {
            try {
                const loc = await fetchLocationById(locationId) as unknown as Location;
                setLocation(loc);
                const characters = await fetchCharacters(loc.residents);
                setResidents(characters);
            }
            catch (error) {console.error(error)}
        })();
    }, [locationId]);

    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!location) return <div className="text-center">Loading...</div>;

    return (
        <div>
            <Header />
            <section className="flex flex-col items-start gap-5 justify-between xl:px-80 xs:flex-row xs:items-start sm:p-10 mt-10">
                <Link to="/locations" className="inline-flex items-center gap-2 text-gray-900 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="black"/>
                    </svg>
                    GO BACK
                </Link>

                <div className="flex flex-col items-start">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{location.name}</h1>

                    <div className="flex flex-col md:flex-row gap-5 xs:gap-40">
                        <div>
                            <h3 className="text-gray-500 font-semibold mb-1">Type</h3>
                            <p className="text-gray-700">{location.type || "Unknown"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 font-semibold mb-1">Dimension</h3>
                            <p className="text-gray-700">{location.dimension || "Unknown"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-[100px]"></div>
            </section>

            <section className="xl:px-80 sm:p-10 mb-10">
                <h3 className="text-2xl font-semibold text-gray-400 mb-4">Residents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {residents.length === 0 ? (
                        <p className="text-gray-500">No residents found</p>
                    ) : (
                        residents.map((char) => (
                            <CharacterCard key={char.id} character={char} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
