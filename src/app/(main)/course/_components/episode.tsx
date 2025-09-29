import React from 'react';
import {FaLock, FaPlay, FaUnlock} from "react-icons/fa";

const Episode = ({isFree, title, videoUrl, duration, index}: Episode & { index: number }) => {
    return (
        <ul className="list bg-base-300  shadow-md text-black dark:text-base-content">

            <li className="list-row items-center group hover:cursor-pointer">
                <div
                    className="rounded-[6px] gap-1 text-base-content bg-white dark:bg-base-200 w-9 h-8 flex px-2 justify-center items-center group-hover:text-white group-hover:bg-primary transition-colors duration-300">
                    {index + 1}
                </div>
                <div className={"group-hover:text-primary  transition-colors duration-300"}>
                    {title}
                </div>

                <div className={"list-col-grow"}></div>

                <div className="flex gap-2 items-center group-hover:text-primary transition-colors duration-300">
                    {!isFree ?
                        <div className={"flex gap-2 items-center"}>
                            <span className={"list-col-grow badge  py-4"}>{duration}</span>
                            <button
                                className={"btn h-8 btn-square text-sm  group-hover:text-primary transition-colors duration-300"}>

                                <FaLock/>
                            </button>
                        </div>
                        :
                        <div className={"flex items-center gap-3"}>
                            {/*<FaUnlock/>*/}
                            {/*<span>دسترسی رایگان</span>*/}
                            <span className={" badge  py-4"}>{duration}</span>
                            <button
                                className="btn h-8 btn-square group-hover:text-primary transition-colors duration-300">
                                <FaPlay/>
                            </button>
                        </div>
                    }
                </div>
            </li>


        </ul>
    );
};

export default Episode;