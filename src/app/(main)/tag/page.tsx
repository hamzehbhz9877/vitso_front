import React from 'react';
import {GetAllWithSubCategory} from "@/services/Category";
import Filters from "@/app/(main)/courses/_components/filters";
import {ArticleByCategory} from "@/services/Article";
import Courses from "@/app/(main)/_components/courses";
import Articles from "@/app/(main)/_components/articles";
import {FilterByTag} from "@/services/Tag";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const resolvedParams = await searchParams;

    const data = await FilterByTag(resolvedParams)

    return (
        <div className="tag-filter container mb-8 space-y-8 mt-10 mb-15">
            {data?.data?.courses.length>0?<Courses isFilter={true} title={"دوره های مرتبط"} data={data?.data?.courses}/>:""}
            {data?.data?.articles.length>0?<Articles  isFilter={true} title={"مقاله های مرتبط"} data={data?.data?.articles}/>:""}
        </div>
    );
};

