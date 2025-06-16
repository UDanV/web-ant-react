import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import type {Character} from '../types/character';
import Header from "../components/Header.tsx";
import {fetchCastEpisodes} from "../api/episodes.ts";
import {fetchCharacterById} from "../api/characters.ts";
import type {Episode} from "../types/episode.ts";

export default function CharacterDetails() {
    const {characterId} = useParams();
    const [character, setCharacter] = useState<Character | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!characterId) {
            setError('Не удалось найти данные или персонажа с таким id не существует');
            return;
        }

        fetchCharacterById(characterId)
            .then(data => {
                setCharacter(data);

                if (Array.isArray(data.episode)) {
                    return fetchCastEpisodes(data.episode);
                } else {
                    return Promise.resolve([]);
                }
            })
            .then(setEpisodes)
            .catch(err => {
                console.error(err);
            });
    }, [characterId]);

    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!character) return <div className="text-center">Loading...</div>;

    return (
        <div>
            <Header/>
            <section className="avatar flex flex-col items-center gap-5 justify-between xl:px-80 xs:flex-row xs:items-start sm:p-10 mt-10">
                <Link to="/characters" className="flex items-center self-start gap-2 cursor-pointer xs:self-auto w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="black"/>
                    </svg>
                    <p className="text-gray-900">GO BACK</p>
                </Link>

                <div className="flex-1 flex flex-col items-center text-center">
                    <img src={character.image} alt={character.name}
                         className="w-[300px] h-[300px] border-4 border-gray-400 rounded-full"/>
                    <h1 className="text-4xl text-gray-900 font-normal mt-4">{character.name}</h1>
                </div>

                <div className="w-[100px]"></div>
            </section>

            <section className="info flex flex-col justify-center gap-10 xl:px-80 xs:flex-row sm:p-10 my-10">
                <div className="flex-1 flex flex-col">
                    <h2 className="text-gray-500 text-lg font-medium mb-2">Informations</h2>
                    {[
                        ['Gender', character.gender ?? 'Unknown'],
                        ['Status', character.status ?? 'Unknown'],
                        ['Species', character.species ?? 'Unknown'],
                        ['Origin', character.origin?.name ?? 'Unknown'],
                        ['Type', character.type || 'Unknown'],
                        ['Location', character.location?.name ?? 'Unknown'],
                    ].map(([title, value]) => (
                        <div key={title} className="border-b border-gray-200 p-4 w-full">
                            <h3 className="text-base text-gray-900 font-bold mb-1">{title}</h3>
                            <p className="text-sm text-gray-500">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="flex-1 flex flex-col">
                    <h2 className="text-gray-500 text-lg font-medium mb-2">Episodes</h2>
                    {episodes.length === 0 ? (
                        <p className="text-gray-900">No episodes found</p>
                    ) : (
                        episodes.map((ep) => {
                            if (!ep.url) return null;

                            const date = ep.air_date ? new Date(ep.air_date).toLocaleDateString() : 'Unknown date';
                            const episodeId = ep.url.split('/').pop();

                            return (
                                <div key={ep.id} className="border-b border-gray-200 p-4 w-full">
                                    <Link to={`/episode-details?id=${episodeId}`} className="block hover:underline">
                                        <h3 className="text-gray-900 font-bold">{ep.episode}</h3>
                                        <p className="text-sm text-gray-500">{ep.name}</p>
                                        <small className="text-[10px] text-gray-400 uppercase tracking-wide">{date}</small>
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
}