'use client'

import React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'

type ReplyItemProps = {
    reply: CommentsUsers["replies"][0]
    type: "article" | "course"
}

export default function ReplyItem({ reply, type }: ReplyItemProps) {
    const { isTeacher, isStudent } = reply

    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 bg-base-100 rounded-lg p-2 sm:p-3">

            {/* Avatar */}
            <div className="avatar flex-shrink-0">
                <div
                    className={clsx(
                        "w-7 sm:w-9 rounded-full",
                        isTeacher && "ring ring-info ring-offset-base-100 ring-offset-1 sm:ring-offset-2"
                    )}
                >
                    <Image
                        width={100}
                        height={100}
                        src={reply.avatar}
                        alt={reply.fullName}
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-1 mb-0.5 sm:mb-1">
          <span
              className={clsx(
                  "text-sm font-semibold flex items-center gap-1 sm:gap-2",
                  isTeacher && "text-info"
              )}
          >
            {reply.fullName}
              {isTeacher && (
                  <span className="badge badge-info badge-sm">
                {type === "article" ? "نویسنده" : "مدرس"}
              </span>
              )}
              {isStudent && !isTeacher && type === "course" && (
                  <span className="badge badge-success badge-sm">دانشجو</span>
              )}
          </span>

                    {/* Date */}
                    <span className=" text-gray-500 dark:text-gray-400">
            {reply.createdAt}
          </span>
                </div>

                {/* Message */}
                <p className="text-xs sm:text-sm leading-relaxed">{reply.message}</p>
            </div>
        </div>
    )
}
