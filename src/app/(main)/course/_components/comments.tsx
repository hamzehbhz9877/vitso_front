'use client'

import React, { useState } from 'react'
import { FaComment } from "react-icons/fa"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GetCommentsForArticle, GetCommentsForCourse, RegisterComments } from "@/services/Comment"
import AddCommentModal from "@/app/(main)/course/_components/modal/addCommentModal";
import ReplyModal from "@/app/(main)/course/_components/modal/replyCommentModal";
import CommentItem from "@/app/(main)/course/_components/commentItem";



type CommentsSectionProps = {
    id: string
    type: "article" | "course"
}

export default function CommentsSection({ id, type }: CommentsSectionProps) {
    const [pageIndex] = useState(0)
    const [replyTarget, setReplyTarget] = useState<CommentsUsers | null>(null)

    // توابع باز و بستن مودال پاسخ
    function openReplyModal(commentOrReply: CommentsUsers) {
        setReplyTarget(commentOrReply)
        const modal = document.getElementById('reply-modal') as HTMLDialogElement
        modal?.showModal()
    }
    function closeReplyModal() {
        setReplyTarget(null)
        const modal = document.getElementById('reply-modal') as HTMLDialogElement
        modal?.close()
    }

    // تابع گرفتن کامنت‌ها بسته به نوع (مقاله یا دوره)
    const fetchComments = () => {
        if (type === "article") {
            return GetCommentsForArticle({
                pageCurrent: pageIndex + 1,
                pageSize: 10,
                articleId: id,
            })
        }
        return GetCommentsForCourse({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            courseId: id,
        })
    }

    const { data: comments, isLoading, isError, error } = useQuery({
        queryFn: fetchComments,
        queryKey: [type === "article" ? "GetCommentsForArticle" : "GetCommentsForCourse", id, pageIndex + 1]
    })

    const { mutate, isPending } = useMutation({
        mutationFn: RegisterComments,
        onSettled: (_, error) => {
            if (!error) {
                const modal = document.getElementById('add-comment-modal') as HTMLDialogElement
                modal?.close()
                closeReplyModal()
            }
        }
    })

    // ارسال دیدگاه یا پاسخ
    async function submitComment(values: { message: string }, parentId?: string) {
        await mutate({
            message: values.message,
            parentId,
            ...(type === "article" ? { articleId: id } : { courseId: id }),
        })
    }

    return (
        <div className="mx-auto mt-2">
            <p className="alert alert-soft alert-info">
                نظرات شما برای ما ارزشمند است! لطفاً تجربه، سوال یا پیشنهادات خود را
                درباره {type === "article" ? "مقاله‌ها" : "دوره‌ها"} با ما در میان
                بگذارید تا بتوانیم خدمات بهتری ارائه کنیم.
            </p>

            {/* Title and add comment button */}
            <div className="flex flex-wrap justify-between items-center border-b pb-2 my-4">
                <h2 className="text-lg md:text-2xl font-extrabold mb-2 sm:mb-0">دیدگاه کاربران</h2>
                <button
                    className="btn btn-sm btn-primary flex items-center gap-2"
                    onClick={() => {
                        const dialog = document.getElementById('add-comment-modal') as HTMLDialogElement
                        dialog?.showModal()
                    }}
                >
                    <FaComment/>
                    ثبت نظر
                </button>
            </div>

            <AddCommentModal
                isPending={isPending}
                onClose={() =>{
                    const modal = document.getElementById('add-comment-modal') as HTMLDialogElement
                    modal?.close()
                    }}
                onSubmit={submitComment}
            />

            {replyTarget && (
                <ReplyModal
                    replyTarget={replyTarget}
                    isSubmitting={isPending}
                    onClose={closeReplyModal}
                    onSubmit={(values) => submitComment(values, replyTarget?.id)}
                />
            )}

            {/* کامنت‌ها */}
            <div className={"space-y-6"}>
                {isLoading && (
                    Array.from({length: 3}).map((_, index) => (
                        <div key={index} className="card bg-base-200 border border-base-300 shadow animate-pulse">
                            <div className="card-body p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="skeleton w-10 h-10 rounded-full"/>
                                    <div className="flex-1 space-y-2">
                                        <div className="skeleton h-4 w-1/3"/>
                                        <div className="skeleton h-3 w-full"/>
                                        <div className="skeleton h-3 w-5/6"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {isError && (
                    <div className="alert alert-soft alert-error">
                        <span>خطا در دریافت دیدگاه‌ها: {error?.message || 'لطفاً مجدداً تلاش کنید.'}</span>
                    </div>
                )}

                {!isLoading && !isError && comments?.data?.comments?.length === 0 && (
                    <div className="alert alert-soft alert-info">
                        <span>هیچ دیدگاهی برای این {type === "article" ? "مقاله" : "دوره"} ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</span>
                    </div>
                )}

                {comments?.data?.comments.map((comment: CommentsUsers) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        type={type}
                        onReplyClick={openReplyModal}
                    />
                ))}
            </div>
        </div>
    )
}
