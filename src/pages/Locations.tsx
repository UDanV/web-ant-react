import React, {useEffect, useRef} from "react";
import Header from "../components/Header.tsx";
import locationsImg from '../assets/locations-img.png'
import {Select} from "../components/select.tsx";
import {Input} from "../components/input.tsx";
import type {SelectOption} from "../types/select.ts";
import type {Location} from "../types/location.ts";
import {Card} from "../components/card.tsx";
import {FilterMobileButton} from "../components/filterMobileButton.tsx";
import {Modal} from "../components/modal.tsx";
import loading from '../assets/loading.svg'
import {useInfiniteEntityQuery} from "../hooks/useInfiniteQuery.ts";

export const Locations: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('');
    // const [selectValue, setSelectValue] = React.useState('');

    const [dimension, setDimension] = React.useState('')
    const [type, setType] = React.useState('')

    const filters = { name: inputValue, type, dimension };
    const {
        data: infiniteData,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteEntityQuery<Location>('location', filters);

    const [draftName, setDraftName] = React.useState('');
    const [draftDimension, setDraftDimension] = React.useState('');
    const [draftType, setDraftType] = React.useState('');

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

    const dimensionOptions: SelectOption[] = [
        {value: 'Dimension C-137', label: 'Dimension C-137'},
        {value: 'Replacement Dimension', label: 'Replacement Dimension'},
        {value: 'Post-Apocalyptic Dimension', label: 'Post-Apocalyptic Dimension'},
    ];

    const typeOptions: SelectOption[] = [
        {value: 'Planet', label: 'Planet'},
        {value: 'Cluster', label: 'Cluster'},
        {value: 'Space station', label: 'Space station'},
    ];

    return (
        <div>
            <Header/>
            <img className="m-auto pt-4" src={locationsImg} alt=""/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="hidden md:flex items-center justify-between gap-4 w-full mx-auto py-4">
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Filter by name..."
                    />

                    <Select
                        options={typeOptions}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Type"
                    />

                    <Select
                        options={dimensionOptions}
                        value={dimension}
                        onChange={(e) => setDimension(e.target.value)}
                        placeholder="Dimension"
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
                                .map((location) => (
                                <Card key={location.id} location={location}/>
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
                        setType(draftType)
                        setDimension(draftDimension)
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

                    <Select
                        options={typeOptions}
                        value={draftType}
                        onChange={(e) => setDraftType(e.target.value)}
                        placeholder="Type"
                    />

                    <Select
                        options={dimensionOptions}
                        value={draftDimension}
                        onChange={(e) => setDraftDimension(e.target.value)}
                        placeholder="Dimension"
                    />
                </Modal>
            )}
        </div>
    );
};