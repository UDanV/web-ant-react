import React, { useState } from 'react'
import logo from '../assets/logo.svg'

const Header: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <header
            className='w-full flex items-center justify-between bg-white shadow-md relative xl:px-80 transition-all sm:px-10 xs:px-5 duration-300'
        >
            <img src={logo} alt="Logo" />

            <ul className="hidden md:flex gap-6 font-bold list-none">
                <li><a className="text-black font-bold" href="/characters">Characters</a></li>
                <li><a className="text-black font-bold" href="/locations">Locations</a></li>
                <li><a className="text-black font-bold" href="/episodes">Episodes</a></li>
            </ul>

            {!mobileOpen && (
                <div className="md:hidden z-50">
                    <button
                        className="flex flex-col justify-around w-[30px] h-[25px] bg-transparent border-0 p-0 cursor-pointer"
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen(true)}
                    >
                        {[...Array(3)].map((_, i) => (
                            <span
                                key={i}
                                className="w-full h-[3px] bg-gray-800 rounded transition-all ease-in-out duration-300"
                            />
                        ))}
                    </button>
                </div>
            )}

            <ul className={`
        fixed top-0 left-0 w-screen h-screen bg-white pt-[60px] px-5 list-none
        flex flex-col justify-center items-center gap-4 transition-transform duration-300 z-40
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
                <button
                    className="absolute top-5 right-5 w-[30px] h-[30px] bg-transparent border-none cursor-pointer z-50"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                >
                    <span className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 rotate-45" />
                    <span className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -rotate-45" />
                </button>
                <li><a href="/characters" className="font-bold text-2xl text-gray-800 hover:text-blue-400">Characters</a></li>
                <li><a href="/locations" className="text-2xl text-gray-800 font-bold hover:text-blue-400">Locations</a></li>
                <li><a href="/episodes" className="text-2xl font-bold text-gray-800 hover:text-blue-400">Episodes</a></li>
            </ul>
        </header>
    )
}

export default Header