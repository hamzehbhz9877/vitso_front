'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(main)/(userPanel)/_components/table";
import {cn} from "@/lib/tiptap-utils";
import {GetAllCourseForStudentCourse} from "@/services/Course";
import Link from "next/link";
import Image from "next/image";
import {GetCommentsForStudent} from "@/services/Comment";
import {FaEye} from "react-icons/fa";
import ShowNodeMessage from "@/app/(main)/(userPanel)/profile/comments/_components/showNodeMessage";


export default function CommentTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => GetCommentsForStudent({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
        }),
        queryKey: ['studentComment', pageIndex + 1],
    })

    const [comment, setComment] = React.useState<Comments>()


    const columns = React.useMemo<ColumnDef<Comments>[]>(() => [
        {
            header: 'ردیف',
            accessorFn: (_row, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'دوره',
            accessorKey: 'for',
            cell: info => (
                <div className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    {info.getValue<string>()}
                </div>
            ),
        },
        {
            header: 'پیام',
            accessorKey: 'message',
            cell: info => (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    {info.getValue<string>()}
                </div>
            ),
        },
        {
            header: 'وضعیت',
            accessorKey: 'statusFa',
            cell: info => (
                <div className="badge badge-success w-24 badge-outline dark:badge-soft text-center">
                    {info.getValue<string>()}
                </div>
            ),
        },
        {
            header: 'تاریخ',
            accessorKey: 'createdAt',
            cell: info => (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {info.getValue<string>()}
                </div>
            ),
        },
        {
            header: 'عملیات',
            cell: ({row}) => {
                const comment = row.original;

                return (
                    <div className="flex gap-3 justify-center">

                        <FaEye size={20} className={"cursor-pointer"} onClick={() => {
                            const show = document.getElementById('showNodeMessage') as HTMLDialogElement
                            show?.showModal()
                            setComment(comment)
                        }}/>
                    </div>
                );
            },
        }
    ], []);
    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی کامنت ..."
                data={usersData?.data.comments || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
            />
            <ShowNodeMessage {...comment}/>
        </>
    )
}