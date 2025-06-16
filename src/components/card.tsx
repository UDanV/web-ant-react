import React from 'react';
import type { Location } from "../types/location.ts";
import type { Episode } from "../types/episode.ts";
import { useNavigate } from "react-router-dom";

interface CardProps {
    location?: Location;
    episode?: Episode;
}

export const Card: React.FC<CardProps> = ({ location, episode }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (location) {
            navigate(`/location/${location.id}`);
        } else if (episode) {
            navigate(`/episode/${episode.id}`);
        }
    };

    return (
        <div
            className="w-auto h-full flex flex-col text-center py-5 rounded-md bg-gray-50 shadow-[0_1px_5px_0_rgba(0,0,0,0.2),0_3px_4px_0_rgba(0,0,0,0.12),0_2px_4px_0_rgba(0,0,0,0.14)] cursor-pointer transition-transform duration-300 hover:-translate-y-2.5"
            data-id={location?.id?.toString() ?? episode?.id?.toString()}
            onClick={handleClick}
        >
            <div className="p-3">
                <h2 className="m-0 text-xl font-medium leading-[30px] tracking-[0.15px] text-gray-900">
                    {location?.name || episode?.name || 'Нет имени'}
                </h2>

                {episode?.air_date && (
                    <p className="m-0 text-sm font-normal leading-[21px] tracking-[0.25px] text-gray-600">
                        {episode.air_date}
                    </p>
                )}

                {(location?.type || episode?.episode) && (
                    <p className="m-0 text-sm font-normal leading-[21px] tracking-[0.25px] text-gray-600">
                        {location?.type ?? episode?.episode}
                    </p>
                )}
            </div>
        </div>
    );
};