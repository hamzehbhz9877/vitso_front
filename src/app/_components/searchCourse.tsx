import React from 'react';
import {CiSearch} from "react-icons/ci";

const SearchCourse = () => {
    return (
        <div className="text-center py-[100px]  search-courses">
            <div className="relative z-10">
                <h1 className="mb-5 text-xl font-extrabold leading-none tracking-tight  md:text-3xl lg:text-4xl">
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">ویتسو</span>{" "}
                    اولین گام برنامه‌نویس شدن
                </h1>
                <p className="mb-6 text-sm font-normal text-base-content/70 lg:text-lg sm:px-16 xl:px-48">
                    در بین بیش از ۲۰,۰۰۰ ساعت آموزش ویدیویی جستجو کنید.
                </p>
                <label
                    className="flex items-center border rounded-md overflow-hidden max-w-xl w-full mx-auto relative">
                    <CiSearch
                        className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 z-10"/>

                    <input
                        type="search"
                        className="input input-bordered border-0 rounded-none grow h-12 px-3 pr-10 text-base focus:outline-none"
                        placeholder="جستجو در بین دوره های آموزشی..."
                    />
                    <button className="btn btn-primary text-white h-12 rounded-none px-5">بگرد
                    </button>
                </label>
            </div>
        </div>
    );
};

export default SearchCourse;