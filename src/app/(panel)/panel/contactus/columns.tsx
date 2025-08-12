'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import { useQuery} from "@tanstack/react-query";
import {RequestContactUs} from "@/services/ContactUs";
import useModal from "@/context/modal/useModal";
import ShowContactUs from "@/app/(panel)/panel/contactus/_action/showContactUs";
import {FaEye} from "react-icons/fa";

export default function ContactUsTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: contactUsData, isLoading, refetch} = useQuery({
        queryFn: () => RequestContactUs({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['contactus', pageIndex + 1, search],
    })


    const columns = React.useMemo<ColumnDef<ContactUs>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row,index) => index+1,
            },
            {
                accessorKey: 'نام و نام خانوادگی',
                accessorFn: row => row.name,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },

            {
                accessorKey: 'موضوع',
                accessorFn: row => row.subject,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorKey: 'تاریخ ایجاد',
                accessorFn: row => row.createdAt,

                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
             {
                header: 'عملیات',
                cell: ({row}) => {
                    const contactUs = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEye size={20} className={"cursor-pointer"}
                                    onClick={() => openModal(<ShowContactUs id={contactUs.id}/>)}/>

                        </div>
                    );
                },
                footer: props => props.column.id,
            }

        ],
        []
    )

    const {openModal} = useModal()

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی کاربران ..."
                data={contactUsData?.data.contactUs || []}
                columns={columns}
                totalPages={contactUsData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
            />
        </>
    )
}