'use client'

import {copyToClipboard} from "@/lib/utils";
import {showToast} from "@/components/react-toastify/react-toastify";
import {IoCopyOutline} from "react-icons/io5";
import parse from "html-react-parser";
import "@/app/(main)/course/_components/index.css"
import {LuUserRound} from "react-icons/lu";
import {FaCalendar} from "react-icons/fa";
import Image from "next/image";

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import CommentsSection from "@/app/(main)/course/_components/comments";
import AuthorProfile from "@/app/(main)/course/_components/authorProfile";
import React from "react";

const ArticleDetails = ({
                           title,image,authorId,authorAvatar,
                            authorName,categoryName,publishedAt,content,tagList,shortLink,id
                       }: ArticleDetail) => {

    return (
        <div className="course-details mt-6">
            <div className={"flex flex-col lg:flex-row gap-[20px]"}>
                <div className={"flex-1 mb-10"}>
                    <div className={" rounded-lg px-[18px] py-[15px] lg:px-[24px] single-course before:bg-primary dark:bg-base-300"}>
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
                        <Image width={900} className={"mb-4 rounded-lg"} height={400} src={image} alt={"image"}/>
                        <div className={"tiptap ProseMirror"}>
                            {parse(content)}
                        </div>
                    </div>
                    <div className={"mt-5"}>
                        <CommentsSection type={"article"}  id={id} />
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
                            <h3 className={"title-dore font-bold"}>برچسب ها</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tagList.map(tag => (
                                    <div key={tag}
                                         className="bagde bg-base-300 rounded-box grid px-3 py-2  text-[14px]  place-items-center dark:bg-base-200">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr className={"border-[#f2f6fc] my-[20px]"}/>

                        <div>
                            <h3 className={"title-dore font-bold"}>دسته بندی ها </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div
                                    className="bagde bg-base-300 rounded-box grid px-3 py-2  text-[14px]  place-items-center dark:bg-base-200">
                                    {categoryName}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"w-[350px] hidden lg:block shadow dark:bg-base-300 p-4 rounded-lg mt-4"}>
                        <AuthorProfile author={{authorName,authorAvatar,authorId}} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ArticleDetails
