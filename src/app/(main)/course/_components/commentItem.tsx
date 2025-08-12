'use client'

import React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { CornerUpLeft } from 'lucide-react'
import ReplyItem from "@/app/(main)/course/_components/replyItem";




type CommentItemProps = {
    comment: CommentsUsers
    type?: "article" | "course"
    onReplyClick?: (comment: CommentsUsers) => void
}

export default function CommentItem({ comment, type, onReplyClick }: CommentItemProps) {
    return (
        <div className="card shadow-md bg-base-200 border border-base-300">
            <div className="card-body p-4 space-y-3">
                <div className="flex items-start gap-3">
                    <div className="avatar">
                        <div
                            className={clsx(
                                "w-10 rounded-full",
                                comment?.isTeacher && "ring ring-info ring-offset-base-100 ring-offset-2"
                            )}
                        >
                            <Image width={100} height={100} src={comment?.avatar} alt={comment?.fullName} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
              <span className="font-semibold flex items-center gap-2">
                {comment?.fullName}
                  {comment?.isTeacher && <span className="badge badge-info badge-sm">{type === "article" ? "نویسنده" : "مدرس"}</span>}
                  {!comment?.isTeacher && comment?.isStudent && type === "course" && (
                      <span className="badge badge-success badge-sm">دانشجو</span>
                  )}
              </span>
                            {type?
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                <span>{comment?.createdAt}</span>
                                <span className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
                                <div className="tooltip tooltip-sm" data-tip="پاسخ">
                                    <button
                                        onClick={() => onReplyClick(comment)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-c-primary text-c-primary hover:bg-primary/10 hover:shadow-md transition-all"
                                    >
                                        <CornerUpLeft className="w-4 h-4" strokeWidth={1.75} />
                                    </button>
                                </div>
                            </div>:""}
                        </div>
                        <p className="text-sm leading-relaxed">{comment?.message}</p>
                    </div>
                </div>

                {/* Replies */}
                {comment?.replies?.length > 0 && (
                    <div className="border-t border-dashed border-base-300 pt-3 space-y-3">
                        {comment?.replies.map(reply => (
                            <ReplyItem key={reply.id} reply={reply} type={type} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
