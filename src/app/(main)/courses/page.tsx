import React from 'react';
import {CourseByCategory, GetAllWithSubCategory} from "@/services/Category";
import Course from "@/app/(main)/courses/_components/course";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const resolvedParams = await searchParams;

    const course = await CourseByCategory(resolvedParams)
    const getCategoriesWithSub =await GetAllWithSubCategory(0)

    return (
        <div className="category-filter container mb-8">
            <Course searchParams={resolvedParams} course={course.data} categories={getCategoriesWithSub.data}/>
        </div>
    );
};

