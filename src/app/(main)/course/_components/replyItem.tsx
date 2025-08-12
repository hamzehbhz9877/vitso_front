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
        <div className="flex items-start gap-3 bg-base-100 rounded-lg p-3">
            <div className="avatar">
                <div
                    className={clsx(
                        "w-9 rounded-full",
                        isTeacher && "ring ring-info ring-offset-base-100 ring-offset-2"
                    )}
                >
                    <Image width={100} height={100} src={reply.avatar} alt={reply.fullName} />
                </div>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
          <span className={clsx("text-sm font-semibold flex items-center gap-2", isTeacher && "text-info")}>
            {reply.fullName}
              {isTeacher && <span className="badge badge-info badge-sm">{type === "article" ? "نویسنده" : "مدرس"}</span>}
              {isStudent && !isTeacher && type === "course" && (
                  <span className="badge badge-success badge-sm">دانشجو</span>
              )}
          </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{reply.createdAt}</span>
                </div>
                <p className="text-sm">{reply.message}</p>
            </div>
        </div>
    )
}
