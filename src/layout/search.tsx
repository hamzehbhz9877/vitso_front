'use client'

import React from 'react';
import {CiSearch} from "react-icons/ci";
import {usePathname} from "next/navigation";

const Search = () => {

    const pathname = usePathname();
    if (pathname === "/") return null
    else
        return (
            <a className="btn btn-circle relative" onClick={() => {

                const dialog = document.getElementById('my_modal_2') as HTMLDialogElement
                dialog?.showModal()
            }}>
                <CiSearch size={25}/>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box modal-top sm:modal-middle w-11/12 max-w-5xl shadow-none bg-transparent">
                        <label className="input input-lg w-full md:max-w-[500px]">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" autoFocus className="grow" placeholder="جستجو"/>
                            <kbd className="kbd kbd-sm">⌘</kbd>
                            <kbd className="kbd kbd-sm">K</kbd>
                        </label>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </a>
        );
};

export default Search;