import React, {useEffect, useRef} from "react";
import Header from "../components/Header.tsx";
import charactersImg from '../assets/characters-img.png';
import {Select} from "../components/select.tsx";
import {Input} from "../components/input.tsx";
import type {SelectOption} from "../types/select.ts";
import {CharacterCard} from "../components/cardCharacter.tsx";
import {FilterMobileButton} from "../components/filterMobileButton.tsx";
import {Modal} from "../components/modal.tsx";
import loading from '../assets/loading.svg'
import {useInfiniteEntityQuery} from "../hooks/useInfiniteQuery.ts";
import type {Character} from "../types/character.ts";

export const Characters: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('');
    // const [selectValue, setSelectValue] = React.useState('');

    const [species, setSpecies] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [status, setStatus] = React.useState('');

    const filters = { name: inputValue, species, gender, status };
    const {
        data: infiniteData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteEntityQuery<Character>('character', filters);

    const [draftName, setDraftName] = React.useState('');
    const [draftStatus, setDraftStatus] = React.useState('');
    const [draftSpecies, setDraftSpecies] = React.useState('');
    const [draftGender, setDraftGender] = React.useState('');

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

    const statusOptions: SelectOption[] = [
        {value: 'alive', label: 'Alive'},
        {value: 'dead', label: 'Dead'},
        {value: 'unknown', label: 'Unknown'},
    ];

    const speciesOptions: SelectOption[] = [
        {value: 'human', label: 'Human'},
        {value: 'robot', label: 'Robot'},
        {value: 'alien', label: 'Alien'},
    ];

    const genderOptions: SelectOption[] = [
        {value: 'male', label: 'Male'},
        {value: 'female', label: 'Female'},
        {value: 'unknown', label: 'Unknown'},
    ];

    return (
        <div>
            <Header/>
            <img className="m-auto pt-4" src={charactersImg}/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="hidden md:flex items-center justify-between gap-4 w-full my-6">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Filter by name..."
                    />

                    <Select
                        options={speciesOptions}
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder="Species"
                    />

                    <Select
                        options={genderOptions}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Gender"
                    />

                    <Select
                        options={statusOptions}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Status"
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
                                .map((character) => (
                                    <CharacterCard key={character.id} character={character}/>
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
                        setInputValue(draftName);
                        setStatus(draftStatus);
                        setSpecies(draftSpecies);
                        setGender(draftGender);
                        }
                    }
                >
                    <Input
                        type="text"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder="Filter by name..."
                    />

                    <Select
                        options={speciesOptions}
                        value={draftSpecies}
                        onChange={(e) => setDraftSpecies(e.target.value)}
                        placeholder="Species"
                    />

                    <Select
                        options={genderOptions}
                        value={draftGender}
                        onChange={(e) => setDraftGender(e.target.value)}
                        placeholder="Gender"
                    />

                    <Select
                        options={statusOptions}
                        value={draftStatus}
                        onChange={(e) => setDraftStatus(e.target.value)}
                        placeholder="Status"
                    />
                </Modal>
            )}
        </div>
    );
};