'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(panel)/_components/table";
import {cn} from "@/lib/utils";
import {GetAllDonation, GetAllForTeacherDonation, GetAllForUserDonation} from "@/services/Donation";
import useAuth from "@/context/authentication/useAuth";
import {TbReportMoney} from "react-icons/tb";
import {FaEdit, FaEye} from "react-icons/fa";
import {BiTrash} from "react-icons/bi";
import DeleteCourse from "@/app/(panel)/panel/courses/_action/deleteCourse";
import ShowDonationModal from "./_action/ShowDonationModal";
import useModal from "@/context/modal/useModal";


export default function DonationTable() {
    const {user}=useAuth()

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)
    const {openModal} = useModal()

    const apiFn = user?.roles.includes("مدیر") ? GetAllForTeacherDonation : GetAllDonation;

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => apiFn({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['donations', pageIndex + 1, search],
    })


    const columns = React.useMemo<ColumnDef<Donate>[]>(
        () => [
            {
                header: 'ردیف',
                accessorFn: (_row, index) => index + 1,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'کاربر',
                accessorFn: row => row.fromUser,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'مبلغ',
                accessorFn: row => row.amount,
                cell: ({row}) => {
                    const amount = row.original.amount;
                    return <span
                        className={cn("text-success", amount < 0 && "text-red-500")}>{amount.toLocaleString('fa-IR') + " " + "تومان"}</span>;
                },
                footer: props => props.column.id,
            },
            {
                header: 'تاریخ تراکنش',
                accessorFn: row => row.donationDate,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'دلیل',
                accessorFn: row => row.for,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'عملیات',
                cell: ({row}) => {
                    const donate = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEye size={20} className={"cursor-pointer "} onClick={() => openModal(<ShowDonationModal id={donate.id} />)}/>
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
                searchPlaceholder="جستجوی دونیت ..."
                data={usersData?.data.donations || []}
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