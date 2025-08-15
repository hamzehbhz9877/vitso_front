'use client'

import React, {useEffect, useRef, useState} from 'react';

import {keepPreviousData, useInfiniteQuery, useQuery, useSuspenseQuery} from "@tanstack/react-query";


import {useParams, useSearchParams} from "next/navigation";

import {CourseByCategory} from "@/services/Category";
import CategoryList from "@/app/(main)/courses/_components/categoryList";
import BreadCrumb from "@/components/breadcrumb/breadCrumb";
import CheckBoxFilter from "@/app/(main)/courses/_components/checkboxfilter";
import CourseCard from "@/app/_components/courseCard";
import SortFilter from "@/app/(main)/courses/_components/sortFilter";
import CourseCardRowStyle from "@/app/(main)/courses/_components/courseCardRowStyle";
import MobileSortFilter from "@/app/(main)/courses/_components/mobile/mobileSortFilter";
import {IoClose} from "react-icons/io5";
import {ArrowUpDown, Filter} from "lucide-react";
import {ArticleByCategory} from "@/services/Article";
import ArticleCard from "@/app/_components/articleCard";

const Course = ({type, categories, course, searchParams}: {
    categories: any,
    type?: string,
    course: Course[],
    searchParams: any
}) => {
    const params = useParams()
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
        if (!filterOpen) setSortOpen(false);
    };

    const toggleSort = () => {
        setSortOpen(!sortOpen);
        if (!sortOpen) setFilterOpen(false);
    };

    const closeMenus = () => {
        setFilterOpen(false);
        setSortOpen(false);
    };
    useEffect(() => {
        const preventScroll = (e: TouchEvent | WheelEvent) => {
            // اگر داخل فیلتر یا مدال هست، اجازه اسکرول بده
            if ((e.target as HTMLElement).closest('.filter-modal')) {
                return;
            }
            e.preventDefault();
        };

        if (filterOpen || sortOpen) {
            document.addEventListener("touchmove", preventScroll, { passive: false });
            document.addEventListener("wheel", preventScroll, { passive: false });
        } else {
            document.removeEventListener("touchmove", preventScroll);
            document.removeEventListener("wheel", preventScroll);
        }

        return () => {
            document.removeEventListener("touchmove", preventScroll);
            document.removeEventListener("wheel", preventScroll);
        };
    }, [filterOpen, sortOpen]);

    const {
        status,
        data,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isRefetching,
        isFetched,
        ...rest
    } = useInfiniteQuery({
        queryKey: [type === "course" ? 'course' : 'article', Object.values(searchParams).join(",")],
        queryFn: ({pageParam}) => {
            if (type === "course")
                return CourseByCategory(searchParams)
            else
                return ArticleByCategory(searchParams)
        },
        initialData: () => {
            const data: any = course as any
            if (data) {
                return {
                    pageParams: 1,
                    pages: [data]
                } as any
            }
        },
        staleTime: 0,
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        getPreviousPageParam: (firstPage) => {
            // return firstPage.CourseProductsModel?.HasPreviousPage ? firstPage.CourseProductsModel.PageNumber - 1 : undefined
            return undefined
        },
        getNextPageParam: (lastPage) => {
            // if (lastPage.CourseProductsModel?.HasNextPage && lastPage.CourseProductsModel.PageNumber + 1 <= 3) {
            //     return lastPage.CourseProductsModel.PageNumber + 1
            // } else {
            //     return undefined
            // }
            return undefined

        },
        // maxPages: 3,
    })

    const sortData = [
        {id: "1", name: "درحال آماده سازی", slug: "0"},
        {id: "2", name: "درحال برگذاری", slug: "1"},
        {id: "3", name: "پایان یافته", slug: "2"},
        {id: "4", name: "منسوخ شده", slug: "3"},
    ]
    const sort = Object.keys(searchParams).includes("sort");

    const filterCount = Object.keys(searchParams)
        .filter(k => k !== "page" && searchParams[k]) // حذف کلیدهای غیر فیلتر و خالی
        .length-(sort?1:0);


    const breakCrumb = [
        {
            url: type === "courses" ? "/courses" : "/articles",
            title: type === "courses" ? "دوره" : "مقاله"
        },
    ]

    return (
        <>
            <BreadCrumb
                data={
                    searchParams.slugCategory
                        ? [...breakCrumb, {url: "", title: searchParams.slugCategory.replace(/-/g, " ")}]
                        : breakCrumb
                }
            />

            <CategoryList type={type} categories={categories}/>


            <div className="flex flex-col lg:flex-row  gap-3">
                {/* فقط دسکتاپ: فیلتر کناری */}
                <div className="hidden lg:flex flex-col gap-2 w-[250px]">
                    <CheckBoxFilter
                        hasSearch={true}
                        searchPlaceholder={"جستجو دسته بندی"}
                        multiSelect
                        query={"slugCategory"}
                        title={"دسته بندی ها"}
                        data={categories}
                    />

                    {
                        type === "article" ? "" :


                            <CheckBoxFilter
                                hasSearch={false}
                                multiSelect
                                query={"status"}
                                title={"وضعیت دوره"}
                                data={[
                                    {id: "1", name: "درحال آماده سازی", slug: "0"},
                                    {id: "2", name: "درحال برگذاری", slug: "1"},
                                    {id: "3", name: "پایان یافته", slug: "2"},
                                    {id: "4", name: "منسوخ شده", slug: "3"},
                                ]}
                            />}
                </div>

                {/* موبایل: دکمه‌ها */}

                <div className="flex lg:hidden gap-2 mb-3 px-2">
                    <button
                        className="flex-1 text-sm flex items-center justify-center gap-2 rounded-xl bg-primary text-white shadow-md py-3 active:scale-95 transition"
                        onClick={toggleFilter}
                    >
                        <Filter size={18}/>
                        <span>فیلتر</span>
                        {filterCount > 0 && (
                            <span className="badge badge-error badge-sm text-white">
        {filterCount}
    </span>
                        )}
                    </button>

                    <button
                        className="flex-1 text-sm flex items-center justify-center gap-2 rounded-xl bg-base-200 text-base-content shadow-md py-3 active:scale-95 transition"
                        onClick={toggleSort}
                    >
                        <ArrowUpDown size={18}/>
                        <span>مرتب‌سازی</span>
                    </button>
                </div>


                {/* محتوا */}
                <div className="flex-1">
                    <SortFilter type={type} courseCount={course?.length}/>
                    {course?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-4 gap-3 mb-5">
                            {type === "article" ?
                                course?.map((article, index) => (
                                    <ArticleCard {...article} key={index}/>
                                ))
                                : course?.map((course, index) => (
                                    <CourseCard isFilterPage {...course} key={index}/>
                                ))}
                        </div>
                    ) : (
                        <div role="alert" className="alert alert-error alert-soft">
                            {type !== "article" ?
                                <span>دوره ای یافت نشد.</span>
                                : <span>مقاله ای یافت نشد.</span>}
                        </div>
                    )}
                </div>

                {/* بک‌دراپ */}
                {(filterOpen || sortOpen) && (
                    <div
                        onClick={closeMenus}
                        className="fixed inset-0 bg-black/40 dark:bg-gray-900/60 z-40"
                    ></div>
                )}

                {/* پنل فیلتر کشویی پایین */}
                <div
                    className={`fixed bottom-0 left-0 right-0 bg-base-100 dark:bg-base-300 z-50 p-4 border-t rounded-t-xl border-gray-300 dark:border-gray-700 transition-transform duration-300 max-h-[70vh] flex flex-col ${
                        filterOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    {/* هدر */}
                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                        <h3 className="text-lg font-semibold">فیلترها</h3>
                        <label className="btn btn-circle btn-primary btn-soft" onClick={closeMenus}>
                            <IoClose size={17}/>
                        </label>
                    </div>

                    {/* بخش اسکرول‌شونده */}
                    <div className="flex-grow overflow-y-auto flex flex-col gap-3 filter-modal">
                        <CheckBoxFilter
                            isOpen
                            hasSearch={true}
                            searchPlaceholder={"جستجو دسته بندی"}
                            multiSelect
                            query={"slugCategory"}
                            title={"دسته بندی ها"}
                            data={categories}
                        />

                        {type === "article" ? "" :
                            <CheckBoxFilter
                                hasSearch={false}
                                multiSelect
                                query={"status"}
                                title={"وضعیت دوره"}
                                data={sortData}
                            />}
                    </div>
                </div>


                {/* پنل مرتب سازی کشویی پایین */}
                <div
                    className={`fixed bottom-0 left-0 right-0 bg-base-100 dark:bg-base-300 z-50 p-4 rounded-t-xl border-t border-gray-300 dark:border-gray-700 transition-transform duration-300 ${
                        sortOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">مرتب سازی</h3>
                        <label className="btn btn-circle btn-primary btn-soft" onClick={closeMenus}>
                            <IoClose size={17}/>
                        </label>
                    </div>
                    <MobileSortFilter data={sortData} query="sort"/>
                </div>
            </div>
        </>
    )
        ;
};

export default Course;