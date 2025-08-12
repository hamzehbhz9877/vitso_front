'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(main)/(userPanel)/_components/table";
import {cn} from "@/lib/tiptap-utils";
import {GetAllCourseForStudentCourse} from "@/services/Course";
import Link from "next/link";
import Image from "next/image";


export default function CourseTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => GetAllCourseForStudentCourse({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['studentCourse', pageIndex + 1, search],
    })


    const columns = React.useMemo<ColumnDef<StudentCourse>[]>(() => [
        {
            header: 'ردیف',
            accessorFn: (_row, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'تصویر دوره',
            accessorFn: row => row.title,
            cell: ({row}) => {
                const slug = row.original.slug;
                const image = row.original.image;
                const title = row.original.title;
                return (
                    <Link href={`/course/${slug}`} className="text-blue-600">
                        <Image src={image} alt={title} width={150} height={150} className="rounded-lg"/>
                    </Link>
                );
            },
        }, {
            header: 'دوره',
            accessorFn: row => row.title,
            cell: ({row}) => {
                const slug = row.original.slug;
                const title = row.original.title;
                return (
                    <Link href={`/course/${slug}`} className="text-blue-600">
                        {title}
                    </Link>
                );
            },
        },
        {
            header: 'درصد پیشرفت',
            accessorFn: row => row.completionPercent+"%",
            cell: info => info.getValue(),
        },
        {
            header: 'وضعیت',
            accessorFn: row => row.status,
            cell: ({ row }) => {
                const status = row.original.status as Status;
                let badgeClass = '';

                switch (status) {
                    case "در حال آماده سازی":
                        badgeClass = 'badge badge-warning';
                        break;
                    case "منتشر شده":
                        badgeClass = 'badge badge-success';
                        break;
                    case "تکمیل شده":
                        badgeClass = 'badge badge-info';
                        break;
                    default:
                        badgeClass = 'badge badge-neutral';
                }

                return (
                    <div className="text-sm font-semibold">
                        <div
                            className={cn(
                                badgeClass,
                                'w-32 badge-outline dark:badge-soft !py-4 badge-sm text-center'
                            )}
                        >
                            {status}
                        </div>
                    </div>
                );
            },
        }
    ], []);
    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی دوره ..."
                data={usersData?.data.courses || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
            />
        </>
    )
}