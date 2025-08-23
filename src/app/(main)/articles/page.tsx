import React from 'react';
import { GetAllWithSubCategory} from "@/services/Category";
import Filters from "@/app/(main)/courses/_components/filters";
import {ArticleByCategory} from "@/services/Article";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const resolvedParams = await searchParams;

    const article = await ArticleByCategory(resolvedParams)
    const getCategoriesWithSub =await GetAllWithSubCategory(1)

    return (
        <div className="category-filter container mb-8">
            <Filters searchParams={resolvedParams} type={"articles"} course={article.data} categories={getCategoriesWithSub.data}/>
        </div>
    );
};

