'use client'

import React from 'react';
import CommentItem from "@/app/(main)/course/_components/commentItem";
import {useQuery} from "@tanstack/react-query";
import {GetCommentsForStudentDetail} from "@/services/Comment";

const ShowNodeMessage = ({id}:Comments) => {


    const {data:comments,isLoading,isError,error} = useQuery({
        queryFn: () => GetCommentsForStudentDetail(id),
        queryKey: ["user-node-message", id],
        enabled:!!id
    })


    return (
        <div className={"node-comment"}>
            <dialog id="showNodeMessage" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">نمایش دیدکاه</h3>

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

                            <CommentItem
                                comment={comments?.data}
                            />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ShowNodeMessage;