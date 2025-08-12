import {GetCoursesAndArticles, GetHomepageCategory, GetHomeStatInfo} from "@/services/Home";
import LastCourse from "@/app/(main)/_components/lastCourse";
import LastArticles from "@/app/(main)/_components/lastArticles";
import Categories from "@/app/_components/categories";
import React from "react";
import Code from "@/app/(main)/_components/code";
import {HiBookOpen, HiDocumentText, HiUserGroup} from "react-icons/hi";
import {HiArrowLeft, HiPlayCircle} from "react-icons/hi2";

import {BsCheckCircle} from "react-icons/bs";
import {GetAllWithSubCategory} from "@/services/Category";
import Link from "next/link";
import {scrolltoHash} from "@/lib/utils";
import GoToCategories from "@/app/(main)/_components/goToCategories";

// export const revalidate = 86400 // 60 * 60 * 24 = 86400 (24 ساعت)

export default async function Home() {
    const homepageCategory = await GetHomepageCategory();
    const coursesAndArticles = await GetCoursesAndArticles();
    const homeStatInfo = await GetHomeStatInfo();
    const courseCategories = homepageCategory?.data?.categoriesForCourse || [];


    return (
        <div className={"main"}>


            <div className={"search-courses overflow-x-hidden"}>
                <div className="background-image" aria-hidden="true"></div>

                <div className={"container content "}>


                    <div
                        className="flex flex-col md:flex-row items-center justify-between">


                        {/* سمت راست: اطلاعات سایت آموزشی */}
                        <div className="w-full mt-6 mb-12 lg:my-14 xl:w-1/2 flex flex-col gap-5 text-base-content">


                            <div className="mx-auto">
                                {/* عنوان اصلی */}
                                <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold leading-relaxed sm:leading-snug">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-c-primary to-c-primary">
      ویتسو،
    </span>{" "}
                                    اولین گام مطمئن به‌سوی آینده برنامه‌نویسی 🎓
                                </h1>

                                {/* متن معرفی */}
                                <p className="text-base sm:text-lg text-base-content/80 mt-4 leading-8">
                                    {/*در ویتسو، با <span className="font-semibold text-c-primary">۱۲۰۰+ دانشجوی فعال</span> و*/}
                                    {/*<span className="font-semibold text-c-primary"> ۵۰+ دوره تخصصی</span>، مسیری هدفمند برای یادگیری توسعه وب، بک‌اند، فرانت‌اند و علوم داده ایجاد کرده‌ایم.*/}
                                    <span className="hidden sm:block pt-3"/>
                                    آموزش‌ها از مفاهیم پایه تا پروژه‌های واقعی طراحی شده‌اند تا شما را برای بازار
                                    کار آماده کنند.

                                </p>

                                {/* مزایای سریع (badge style) */}
                                <div
                                    className="flex flex-wrap items-center  gap-3 mt-6 text-sm sm:text-base">
                                    <div className="flex items-center gap-2 bg-base-200 rounded-full py-1 px-4">
                                        <BsCheckCircle className="text-c-primary text-lg"/>
                                        پروژه‌محور
                                    </div>
                                    <div className="flex items-center gap-2 bg-base-200 rounded-full py-1 px-4">
                                        <BsCheckCircle className="text-c-primary text-lg"/>
                                        پشتیبانی فنی اختصاصی
                                    </div>
                                    <div className="flex items-center gap-2 bg-base-200 rounded-full py-1 px-4">
                                        <BsCheckCircle className="text-c-primary text-lg"/>
                                        سرفصل‌های به‌روز
                                    </div>
                                </div>

                                {/* دکمه‌ها */}
                                <div className="flex  items-center justify-start md:justify-center gap-8 lg:gap-4 mt-8">
                                    <GoToCategories/>
                                    <Link href={"/courses"}
                                          className={"flex items-center gap-2 text-c-primary hover:underline text-sm sm:text-base"}>

                                        <HiPlayCircle className="text-2xl"/>
                                        ‌نمایش دوره‌ها
                                    </Link>
                                </div>
                            </div>


                            <div
                                className="flex items-center justify-between md:justify-center  gap-0 mt-3 md:mt-6 px-3 md:px-0">

                                {/* کارت اول */}
                                <div
                                    className="flex flex-col md:flex-row items-center justify-between px-1 md:px-6 py-2 md:py-4 min-w-max lg:min-w-[140px]">
                                    <HiBookOpen className="w-6 h-6 md:w-8 md:h-8 text-c-primary"/>
                                    <div className="flex flex-col text-center md:text-right mr-0 md:mr-4">
                                            <span
                                                className="text-lg md:text-xl font-extrabold leading-tight text-c-primary">{homeStatInfo?.data.courseCount}+</span>
                                        <span
                                            className="text-xs md:text-sm text-base-content/70 mt-1">دوره آموزشی</span>
                                    </div>
                                </div>

                                {/* جداکننده */}
                                <div className="w-px h-6 md:h-10 bg-gray-300 mx-1 md:mx-2"/>

                                {/* کارت دوم */}
                                <div
                                    className="flex flex-col md:flex-row items-center justify-between px-1 md:px-6 py-2 md:py-4 min-w-max lg:min-w-[140px]">
                                    <HiUserGroup className="w-6 h-6 md:w-8 md:h-8 text-c-primary"/>
                                    <div className="flex flex-col text-center md:text-right mr-0 md:mr-4">
                                            <span
                                                className="text-lg md:text-xl font-extrabold leading-tight text-c-primary">{homeStatInfo?.data.userCount}+</span>
                                        <span
                                            className="text-xs md:text-sm text-base-content/70 mt-1">دانشجو فعال</span>
                                    </div>
                                </div>

                                {/* جداکننده */}
                                <div className="w-px h-6 md:h-10 bg-gray-300 mx-1 md:mx-2"/>

                                {/* کارت سوم */}
                                <div
                                    className="flex flex-col md:flex-row items-center justify-between px-1 md:px-6 py-2 md:py-4 min-w-max lg:min-w-[140px]">
                                    <HiDocumentText className="w-6 h-6 md:w-8 md:h-8 text-c-primary"/>
                                    <div className="flex flex-col text-center md:text-right mr-0 md:mr-4">
                                        <span
                                            className="text-lg md:text-xl font-extrabold leading-tight text-c-primary">{homeStatInfo?.data.articleCount}</span>
                                        <span
                                            className="text-xs md:text-sm text-base-content/70 mt-1">مقاله آموزشی</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="hidden xl:block w-full md:w-1/2">
                            <Code/>
                        </div>
                    </div>

                </div>

                {/*<SearchCourse/>*/}
            </div>


            <div className={"container"}>
                <Categories data={courseCategories}/>

                <LastCourse data={coursesAndArticles?.data?.courses}/>

                <LastArticles data={coursesAndArticles?.data?.articles}/>
            </div>
        </div>
    );
}
