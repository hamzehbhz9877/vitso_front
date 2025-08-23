import React from 'react';
import {copyToClipboard} from "@/lib/utils";
import {showToast} from "@/components/react-toastify/react-toastify";
import {IoCopyOutline} from "react-icons/io5";
import Tags from "@/app/(main)/course/_components/tags";

const CourseLinks = ({tagList,categorySlug,shortLink,categoryName }:Pick<Course, 'categoryName'|'shortLink'|'tagList'|'categorySlug'>) => {
    return (
        <div>
            <div>
                <h3 className={"title-dore font-bold"}>لینک کوتاه دوره آموزشی</h3>


                <div className="link-kootah relative mt-2">
                    <button className={"text-center flex items-center bg-primary" +
                        " absolute top-1/2 -translate-y-1/2 justify-center left-1"} onClick={() => {
                        copyToClipboard(shortLink)
                        showToast("success", "کپی شد")
                    }}><IoCopyOutline className={"text-white cursor-pointer"} size={20}/></button>
                    <input id="myInput" readOnly defaultValue={shortLink}/>
                </div>
            </div>

         <div className={"mt-5"}>
             <Tags  type={"tag"} title={"برچسب ها"} data={tagList}/>

             <hr className={"border-[#f2f6fc] my-[20px]"}/>

             <Tags type={"courses"}  title={"دسته بندی ها"} data={[{name:categoryName,slug:categorySlug}]}/>
         </div>
        </div>
    );
};

export default CourseLinks;