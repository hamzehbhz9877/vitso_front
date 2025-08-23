import React from 'react';
import CourseCard from "@/app/_components/courseCard";
import Link from "next/link";
import {cn} from "@/lib/utils";

const Courses = ({data,title,isFilter=false}: { title:string,isFilter?:boolean,data:Course[] }) => {
    return (
        <div className={"courses"}>
            <div className={"mb-8 flex justify-between items-center"}>
                <div className={"flex flex-col gap-y-2 w-max "}>
                    <h3 className={"text-xl font-bold "}>{title}</h3>

                    <div className="h-[1px] bg-[#E4E4E4] w-full relative">
                        <div
                            className="h-[3px] rounded-[0.5rem]  bg-primary absolute w-1/3 right-[32%] top-[-1px]"></div>
                    </div>
                </div>
                {isFilter?"":<Link href={"/courses"}  className={"btn btn-primary text-white"}>مشاهده همه</Link>}
            </div>
            <div
                className={cn(" w-full" +
                    " sm:w-auto sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 " +
                    "gap-[16px] mb-[20px] ",!isFilter&&"carousel")}>
                {data.map((d, index) => {
                    return <CourseCard  key={index} {...d}/>
                })}
            </div>
        </div>

    );
};

export default Courses;