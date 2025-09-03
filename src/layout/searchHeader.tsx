'use client'

import React, { useState, useRef } from "react";
import {CiSearch} from "react-icons/ci";

export default function SearchInput() {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const clearInput = () => {
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <>
            <button className="btn btn-circle btn-primary btn-soft relative" popoverTarget="popover-search" aria-label="search"
               style={{anchorName: "--anchor-search"}  as React.CSSProperties }>
                <CiSearch size={25}/>
            </button>


            <ul className="dropdown dropdown-center top-14 sm:top-0 dropdown-full menu static w-[92%] mx-auto sm:mx-0  sm:w-max rounded-box bg-base-100 shadow-sm mt-3"
                popover="auto" id="popover-search" style={{positionAnchor: "--anchor-search"} as React.CSSProperties}>
                <label
                    className="relative input input-md items-center w-full sm:w-[280px] rounded-md border border-primary bg-gray-50 text-primary dark:bg-base-200 dark:text-gray-200 dark:border-gray-600 focus-within:outline-none"
                >
                    {/* آیکن سرچ */}
                    <svg
                        className="h-[1.7em] text-primary opacity-50 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.3-4.3"></path>
                    </svg>

                    {/* اینپوت */}
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus
                        className="grow bg-transparent pl-2 focus:outline-none placeholder:text-primary/40 dark:placeholder:text-gray-400"
                        placeholder="جستجو..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    {/* آیکن ضربدر */}
                    {value && (
                        <button
                            type="button"
                            onClick={clearInput}
                            className="absolute left-2 text-primary opacity-50 hover:opacity-80 transition-opacity dark:text-gray-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    )}
                </label>
            </ul>
        </>

    );
}
