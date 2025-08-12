'use client'

import React from 'react';
import {HiArrowLeft} from "react-icons/hi2";
import {scrolltoHash} from "@/lib/utils";

const GoToCategories = () => {
    const handleGoToCategories=()=>scrolltoHash("search-course",60)

    return (
        <div>
            <button onClick={handleGoToCategories}
                    className="bg-c-primary text-white font-bold py-3 px-6 rounded-xl text-sm sm:text-base shadow-md hover:bg-c-primary/90 transition">
                شروع یادگیری
                <HiArrowLeft className="inline-block mr-2 text-xl"/>
            </button>
        </div>
    );
};

export default GoToCategories;