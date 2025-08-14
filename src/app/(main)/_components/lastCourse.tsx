import React from 'react';
import CourseCard from "@/app/_components/courseCard";
import Link from "next/link";

const LastCourse = ({data}: { data:Course[] }) => {
    return (
        <div className={"mt-[70px] courses"}>
            <div className={"mb-8 flex justify-between items-center"}>
                <div className={"flex flex-col gap-y-2 w-max "}>
                    <h3 className={"text-xl font-bold "}>آخرین دوره ها</h3>

                    <div className="h-[1px] bg-[#E4E4E4] w-full relative">
                        <div
                            className="h-[3px] rounded-[0.5rem]  bg-primary absolute w-1/3 right-[32%] top-[-1px]"></div>
                    </div>
                </div>
                <Link href={"/courses"}  className={"btn btn-primary text-white"}>مشاهده همه</Link>
            </div>
            <div
                className="carousel sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] mb-[20px] ">
                {data.map((d, index) => {
                    return <CourseCard  key={index} {...d}/>
                })}
            </div>
        </div>

    );
};

export default LastCourse;