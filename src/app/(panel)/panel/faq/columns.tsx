'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(panel)/_components/table";
import {cn} from "@/lib/utils";
import {GetAllFaq} from "@/services/Faq";
import useAuth from "@/context/authentication/useAuth";
import {TbReportMoney} from "react-icons/tb";
import {FaEdit, FaEye} from "react-icons/fa";
import {BiTrash} from "react-icons/bi";
import DeleteCourse from "@/app/(panel)/panel/courses/_action/deleteCourse";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import DeleteCategory from "@/app/(panel)/panel/category/article/_action/deleteCategory";
import DeleteFaqs from "@/app/(panel)/panel/faq/_action/deleteFaq";
import useModal from "@/context/modal/useModal";
import {CirclePlus} from "lucide-react";


export default function FaqTable() {
    const {user} = useAuth()
    const {openModal} = useModal()

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const apiFn = user?.roles.includes("مدیر") ? GetAllFaq : GetAllFaq;

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => apiFn({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['faqs', pageIndex + 1, search],
    })

    const router = useRouter()


    const columns = React.useMemo<ColumnDef<Faq>[]>(
        () => [
            {
                header: 'ردیف',
                accessorFn: (_row, index) => index + 1,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'موقعیت',
                accessorFn: row => row.position,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'بخش',
                accessorFn: row => row.entityName,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            }, {
                header: 'تعداد سوالات',
                accessorFn: row => row.questionCount,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'تاریخ ایجاد',
                accessorFn: row => row.createdAt,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'عملیات',
                cell: ({row}) => {
                    const faq = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEdit size={20} className={"cursor-pointer "} onClick={() => router.push(`faq/edit/${faq.position}`)}/>
                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteFaqs name={faq.positionFa}
                                                                          id={faq.position}/>)}/>
                        </div>
                    );
                },
            }
        ],
        []
    );

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجو ..."
                data={usersData?.data.faqs || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button  onClick={() => router.push(`faq/add`)}
                    >
                        <CirclePlus/>
                        افزودن سوالات
                    </Button>
                }
            />
        </>
    )
}