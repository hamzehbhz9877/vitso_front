'use client'

import React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { CornerUpLeft } from 'lucide-react'
import ReplyItem from "@/app/(main)/course/_components/replyItem"

type CommentItemProps = {
    comment: CommentsUsers
    type?: "article" | "course"
    onReplyClick?: (comment: CommentsUsers) => void
}

export default function CommentItem({ comment, type, onReplyClick }: CommentItemProps) {
    return (
        <div className="card shadow-md bg-base-200 border border-base-300">
            <div className="card-body p-3 sm:p-4 space-y-3">

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">

                    {/* Avatar */}
                    <div className="avatar flex-shrink-0">
                        <div
                            className={clsx(
                                "w-8 sm:w-10 rounded-full",
                                comment?.isTeacher && "ring ring-info ring-offset-base-100 ring-offset-1 sm:ring-offset-2"
                            )}
                        >
                            <Image
                                width={100}
                                height={100}
                                src={comment?.avatar}
                                alt={comment?.fullName}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-1 mb-1">

                            {/* Name + Badges */}
                            <span className="font-semibold text-sm sm:text-base flex items-center gap-1 sm:gap-2">
                {comment?.fullName}
                                {comment?.isTeacher && (
                                    <span className="badge badge-info badge-xs sm:badge-sm">
                    {type === "article" ? "نویسنده" : "مدرس"}
                  </span>
                                )}
                                {!comment?.isTeacher && comment?.isStudent && type === "course" && (
                                    <span className="badge badge-success badge-xs sm:badge-sm">دانشجو</span>
                                )}
              </span>

                            {/* Date + Reply */}
                            {type && (
                                <div className="flex items-center gap-2  sm:text-gray-500 dark:text-gray-400">
                                    <span>{comment?.createdAt}</span>
                                    <span className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-600" />
                                    <div className="tooltip tooltip-left tooltip-xs sm:tooltip-sm" data-tip="پاسخ">
                                        <button
                                            onClick={() => onReplyClick?.(comment)}
                                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary/10 hover:shadow-md transition-all"
                                        >
                                            <CornerUpLeft className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={1.75} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Message */}
                        <p className="sm:text-sm leading-relaxed">{comment?.message}</p>
                    </div>
                </div>

                {/* Replies */}
                {comment?.replies?.length > 0 && (
                    <div className="border-t border-dashed border-base-300 pt-2 sm:pt-3 space-y-2 sm:space-y-3">
                        {comment?.replies.map(reply => (
                            <ReplyItem key={reply.id} reply={reply} type={type} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
