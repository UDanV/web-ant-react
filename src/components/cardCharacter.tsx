import React from 'react';
import type {Character} from '../types/character';
import {useNavigate} from "react-router-dom";

interface CharacterCardProps {
    character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/character/${character.id}`);
    };

    return (
        <div
            className="w-auto h-full flex flex-col justify-start items-start rounded-md bg-white shadow-[0_1px_5px_0_rgba(0,0,0,0.2),0_3px_4px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.14)] cursor-pointer transition-transform duration-300 hover:-translate-y-2.5"
            data-id={character.id.toString()}
            onClick={handleClick}
        >
            <div className="w-full">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full rounded-t-lg"
                />
            </div>
            <div className="p-3">
                <h2 className="m-0 text-xl font-medium leading-[30px] tracking-[0.15px] text-gray-900">
                    {character.name}
                </h2>
                <p className="m-0 text-sm font-normal leading-[21px] tracking-[0.25px] text-gray-600">
                    {character.species}
                </p>
            </div>
        </div>
    );
};