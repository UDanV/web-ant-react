import React, {useEffect, useRef} from "react";
import Header from "../components/Header.tsx";
import episodesImg from '../assets/episodes-img.png'
import {Input} from "../components/input.tsx";
import {Card} from "../components/card.tsx";
import type {Episode} from "../types/episode.ts";
import {FilterMobileButton} from "../components/filterMobileButton.tsx";
import {Modal} from "../components/modal.tsx";
import {useInfiniteEntityQuery} from "../hooks/useInfiniteQuery.ts";
import loading from "../assets/loading.svg";

export const Episodes: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('');

    const [draftName, setDraftName] = React.useState('');

    const filters = { name: inputValue };
    const {
        data: infiniteData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteEntityQuery<Episode>('episode', filters);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div>
            <Header/>
            <img className="m-auto pt-4" src={episodesImg} alt=""/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                <div className="hidden md:flex items-center justify-between gap-4 w-full mx-auto py-4">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Filter by name..."
                    />
                </div>

                <FilterMobileButton onClick={() => setIsModalOpen(true)}/>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <img
                            src={loading}
                            alt="Loading..."
                            className="w-32 h-32 rounded-full animate-pulse shadow-lg"
                        />
                    </div>
                ) : (
                    <div className="font-roboto mt-8 mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {infiniteData?.pages
                                ?.flatMap((page) => page.results)
                                .map((episode) => (
                                    <Card key={episode.id} episode={episode}/>
                                ))}
                        </div>
                    </div>
                )}

                <div ref={loaderRef} className="h-16 mt-8 flex justify-center items-center">
                    {isFetchingNextPage && (
                        <img src={loading} alt="Loading..." className="w-10 h-10 animate-spin"/>
                    )}
                </div>

            </div>

            {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onApply={() => {
                        setIsModalOpen(false)
                        setInputValue(draftName)
                    }
                    }
                >
                    <Input
                        type="text"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder="Filter by name..."
                    />
                </Modal>
            )}
        </div>
    );
};