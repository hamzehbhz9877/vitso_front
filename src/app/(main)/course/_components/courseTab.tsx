import React, {useState} from 'react'
import {LuListVideo} from 'react-icons/lu'
import {BiDetail} from 'react-icons/bi'
import {LiaComments, LiaUserTieSolid} from 'react-icons/lia'
import parse from 'html-react-parser'
import Season from "@/app/(main)/course/_components/season";
import CommentsSection from "@/app/(main)/course/_components/comments";
import AuthorProfile from "@/app/(main)/course/_components/authorProfile";
import {PiSealQuestionFill} from "react-icons/pi";
import FaqList from "@/components/faq/faqList";
import TipTapEditor from "@/components/tiptap/tiptapEditor";


export default function CourseTabs({seasons, description, id, author, faqs}: {
    seasons: any[]
    description: string
    id: string
    faqs: Faq["listFaq"]
    author: Pick<Course, "authorName" | 'authorAvatar' | 'authorId'>
}) {
    const [activeTab, setActiveTab] = useState<'seasons' | 'content' | 'comments' | 'author' | 'faq'>('seasons')
    const [_, setHasOpenedComments] = useState(false)

    const handleTabChange = (tab: 'seasons' | 'content' | 'comments' | 'author' | 'faq') => {
        setActiveTab(tab)
        if (tab === 'comments') setHasOpenedComments(true)
    }

    return (
        <div className="tabs gap-2 shadow-none sm:gap-0 tabs-box sm:tabs-border  flex-1 bg-transparent">

            <label
                className="tab text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  flex gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                <input
                    type="radio"
                    name="course_tabs"
                    checked={activeTab === 'seasons'}
                    onChange={() => handleTabChange('seasons')}
                />
                <LuListVideo size={18}/>
                سرفصل ها
            </label>
            {activeTab === 'seasons' && (
                <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6 space-y-3">
                    {seasons.map((season, index) => (
                        <Season key={season.id} {...season} index={index}/>
                    ))}
                </div>
            )}

            <label
                className="tab text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  flex gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                <input
                    type="radio"
                    name="course_tabs"
                    checked={activeTab === 'content'}
                    onChange={() => handleTabChange('content')}
                />
                <BiDetail size={18}/>
                محتوای دوره
            </label>
            {activeTab === 'content' && (
                <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6">
                    <TipTapEditor content={description}/>
                </div>
            )}

            {faqs?.length > 0 ?
                <>
                    <label
                        className="tab text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  flex gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                        <input
                            type="radio"
                            name="course_tabs"
                            checked={activeTab === 'faq'}
                            onChange={() => handleTabChange('faq')}
                        />
                        <PiSealQuestionFill size={18}/>
                        سوالات متداول
                    </label>
                    {activeTab === 'faq' && (
                        <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6">
                            <FaqList faqs={faqs} className={"pt-5"}/>
                        </div>
                    )}
                </> : ""}
            <label
                className="tab text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  flex gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                <input
                    type="radio"
                    name="course_tabs"
                    checked={activeTab === 'comments'}
                    onChange={() => handleTabChange('comments')}
                />
                <LiaComments size={18}/>
                دیدگاه کاربران
            </label>
            {activeTab === 'comments' && (
                <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6">
                    <CommentsSection type={"course"} id={id}/>
                </div>
            )}


            <label
                className="tab flex md:hidden text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                <input
                    type="radio"
                    name="course_tabs"
                    checked={activeTab === 'author'}
                    onChange={() => handleTabChange('author')}
                />
                <LiaUserTieSolid size={18}/>
                مدرس دوره
            </label>
            {activeTab === 'author' && (
                <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6">
                    <AuthorProfile author={{...author, id}}/>
                </div>
            )}

            {/* گزینه اختیاری: نگه‌داشتن کامنت بعد از اولین لود */}
            {/*
      {hasOpenedComments && !activeTab === 'comments' && (
        <div className="hidden"><Comments id={id} /></div>
      )}
      */}
        </div>
    )
}
