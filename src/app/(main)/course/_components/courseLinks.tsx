import React from 'react';
import {copyToClipboard} from "@/lib/utils";
import {showToast} from "@/components/react-toastify/react-toastify";
import {IoCopyOutline} from "react-icons/io5";

const CourseLinks = ({tagList,categoryName,shortLink }:Pick<Course, 'shortLink'|'tagList'|'categoryName'>) => {
    return (
        <div>
            <div>
                <h3 className={"title-dore font-bold"}>لینک کوتاه دوره آموزشی</h3>


                <div className="link-kootah relative mt-2">
                    <button className={"text-center flex items-center" +
                        " absolute top-1/2 -translate-y-1/2 justify-center left-1"} onClick={() => {
                        copyToClipboard(shortLink)
                        showToast("success", "کپی شد")
                    }}><IoCopyOutline className={"text-white"} size={20}/></button>
                    <input id="myInput" readOnly defaultValue={shortLink}/>
                </div>
            </div>

            <div className={"mt-5"}>
                <h3 className={"title-dore font-bold"}>برچسب ها</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {tagList.map(tag => (
                        <div key={tag}
                             className="bagde bg-base-300 rounded-box grid px-3 py-2  text-[14px]  place-items-center dark:bg-base-200">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <hr className={"border-[#f2f6fc] my-[20px]"}/>

            <div>
                <h3 className={"title-dore font-bold"}>دسته بندی ها </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    <div
                        className="bagde bg-base-300 rounded-box grid px-3 py-2  text-[14px]  place-items-center dark:bg-base-200">
                        {categoryName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseLinks;