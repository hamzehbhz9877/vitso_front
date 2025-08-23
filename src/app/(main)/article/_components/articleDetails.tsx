'use client'

import {copyToClipboard} from "@/lib/utils";
import {showToast} from "@/components/react-toastify/react-toastify";
import {IoCopyOutline} from "react-icons/io5";
import "@/app/(main)/course/_components/index.css"
import {LuUserRound} from "react-icons/lu";
import {FaCalendar} from "react-icons/fa";
import Image from "next/image";


import CommentsSection from "@/app/(main)/course/_components/comments";
import AuthorProfile from "@/app/(main)/course/_components/authorProfile";
import React from "react";
import TipTapEditor from "@/components/tiptap/tiptapEditor";
import CourseTabs from "@/app/(main)/course/_components/courseTab";
import ArticleTabs from "@/app/(main)/article/_components/articleTab";
import Categories from "@/app/(main)/course/_components/tags";
import Tags from "@/app/(main)/course/_components/tags";

const ArticleDetails = ({
                            title, image, authorId, authorAvatar,
                            authorName, categoryName, publishedAt, content, tagList, shortLink, id,faqs,categorySlug
                        }: ArticleDetail & {faqs:Faq["listFaq"]}) => {

    return (
        <div className="course-details mt-6">
            <div className={"flex flex-col lg:flex-row gap-[20px]"}>
                <div className={"flex-1 mb-10"}>
                    <div
                        className={" rounded-lg px-0 py-[15px] lg:px-[24px] single-section course-details__content  before:bg-primary dark:bg-base-300 "}>
                        <div className={"mb-5"}>
                            <h3 className={"text-lg md:text-xl  font-bold"}>{title}</h3>

                            <div className={"flex items-center gap-4 my-4"}>
                                <div className={"flex items-center gap-1 text-sm text-gray-500"}>
                                    <LuUserRound/>
                                    <span>{authorName}</span>
                                </div>
                                <div className={"flex items-center gap-1 text-sm text-gray-500"}>
                                    <FaCalendar/>
                                    <span>{publishedAt.split(" ")[0]}</span>
                                </div>
                            </div>
                        </div>
                        <Image width={900} className={"mb-4 rounded-lg mx-auto"} height={400} src={image}
                               alt={"image"}/>
                        <TipTapEditor content={content}/>
                    </div>

                    <div
                        className="flex gap-[20px] my-[40px] single-section before:bg-primary px-[13px] py-[15px] lg:px-[24px] dark:bg-base-300 rounded-lg">
                        <ArticleTabs faqs={faqs} author={{authorName, authorAvatar, authorId}} id={id}/>
                    </div>
                </div>

                <div>
                    <div className={"w-[350px] hidden lg:block shadow dark:bg-base-300 p-4 rounded-lg"}>
                        <div>
                            <h3 className={"title-dore font-bold"}>اشتراک گذاری مطلب</h3>
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
                            <Tags type={"tag"} title={"برچسب ها"} data={tagList}/>

                            <hr className={"border-[#f2f6fc] my-[20px]"}/>

                            <Tags type={"articles"} title={"دسته بندی ها"} data={[{name:categoryName,slug:categorySlug}]}/>
                        </div>
                    </div>

                    <div className={"w-[350px] hidden lg:block shadow dark:bg-base-300 p-4 rounded-lg mt-4"}>
                        <AuthorProfile author={{authorName, authorAvatar, authorId, id}}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ArticleDetails
