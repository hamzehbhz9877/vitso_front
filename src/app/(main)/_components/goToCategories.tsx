'use client'

import React from 'react';
import {HiArrowLeft} from "react-icons/hi2";
import {scrolltoHash} from "@/lib/utils";

const GoToCategories = () => {
    const handleGoToCategories=()=>scrolltoHash("search-course",60)

    return (
        <div>
            <button onClick={handleGoToCategories}
                    className="btn btn-primary text-sm sm:text-base transition">
                شروع یادگیری
                <HiArrowLeft className="inline-block mr-2 text-lg"/>
            </button>
        </div>
    );
};

export default GoToCategories;