import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Episode } from "../types/episode";
import type { Character } from "../types/character";
import { fetchEpisodeById } from "../api/episodes";
import { fetchCharacters } from "../api/characters";
import Header from "../components/Header";
import { CharacterCard } from "../components/cardCharacter";

export default function EpisodeDetails() {
    const { episodeId } = useParams<{ episodeId: string }>();
    const [episode, setEpisode] = useState<Episode | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!episodeId) {
            setError("Не удалось найти данные или эпизода с таким id не существует");
            return;
        }

        (async () => {
            try {
                const ep = await fetchEpisodeById(episodeId);
                setEpisode(ep);

                const chars = await fetchCharacters(ep.characters || []);
                setCharacters(chars);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [episodeId]);

    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!episode) return <div className="text-center">Loading...</div>;

    return (
        <div>
            <Header />
            <section className="flex flex-col items-start gap-5 justify-between xl:px-80 xs:flex-row xs:items-start sm:p-10 mt-10">
                <Link to="/episodes" className="inline-flex items-center gap-2 text-gray-900 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="black"/>
                    </svg>
                    GO BACK
                </Link>

                <div className="flex flex-col items-start">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{episode.name}</h1>

                    <div className="flex flex-col md:flex-row gap-5 xs:gap-40">
                        <div>
                            <h3 className="text-gray-500 font-semibold mb-1">Air Date</h3>
                            <p className="text-gray-700">{episode.air_date || "Unknown"}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-500 font-semibold mb-1">Episode</h3>
                            <p className="text-gray-700">{episode.episode || "Unknown"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-[100px]"></div>
            </section>

            <section className="xl:px-80 sm:p-10 mb-10">
                <h3 className="text-2xl font-semibold text-gray-400 mb-4">Cast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {characters.length === 0 ? (
                        <p className="text-gray-500">No characters found</p>
                    ) : (
                        characters.map((char) => (
                            <CharacterCard key={char.id} character={char} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}