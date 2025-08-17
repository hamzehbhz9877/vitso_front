import React from 'react';
import ArticleCard from "@/app/_components/articleCard";
import Link from "next/link";

const LastArticles = ({data}: { data:Article[] }) => {
    return (
        <div className={"mt-[70px] articles"}>
            <div className={"mb-8 flex justify-between items-center"}>
                <div className={"flex flex-col gap-y-2 w-max "}>
                    <h3 className={"text-xl font-bold "}>آخرین مقاله ها</h3>

                    <div className="h-[1px] bg-[#E4E4E4] w-full relative">
                        <div
                            className="h-[3px] rounded-[0.5rem]  bg-primary absolute w-1/3 right-[32%] top-[-1px]"></div>
                    </div>
                </div>
                <Link href={"/articles"} className={"btn btn-primary text-white"}>مشاهده همه</Link>
            </div>
            <div
                className="carousel w-full sm:w-auto sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[16px] mb-[20px] ">
                {data.map((d, index) => {
                    return <ArticleCard key={index} {...d}/>
                })}
            </div>

        </div>
    );
};

export default LastArticles;