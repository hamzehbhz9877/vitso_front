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


export default function ArticleTabs({ id, author,faqs}: {
    id: string
    author: Pick<Course, "authorName" | 'authorAvatar' | 'authorId'>
    faqs: Faq["listFaq"];
}) {
    const [activeTab, setActiveTab] = useState<'comments' | 'author' | 'faq'>('comments')
    const [_, setHasOpenedComments] = useState(false)

    const handleTabChange = (tab: 'comments' | 'author' | 'faq') => {
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
                    checked={activeTab === 'comments'}
                    onChange={() => handleTabChange('comments')}
                />
                <LiaComments size={18}/>
                دیدگاه کاربران
            </label>
            {activeTab === 'comments' && (
                <div className="tab-content border-t-base-300 dark:border-t-white/30 py-6">
                    <CommentsSection type={"article"} id={id}/>
                </div>
            )}
            {faqs?.length>0?
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
                </>:""}


            <label
                className="tab flex md:hidden text-primary hover:text-primary bg-base-300 sm:!shadow-none sm:!bg-transparent  gap-2 cursor-pointer justify-start sm:justify-center  w-[calc(50%-4px)] sm:w-max">
                <input
                    type="radio"
                    name="course_tabs"
                    checked={activeTab === 'author'}
                    onChange={() => handleTabChange('author')}
                />
                <LiaUserTieSolid size={18}/>
                نویسنده
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
