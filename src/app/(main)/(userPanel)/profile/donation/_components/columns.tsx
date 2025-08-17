'use client'

import React, {useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import {Transactions} from "@/services/Wallet";
import ReactTable from "@/app/(main)/(userPanel)/_components/table";
import {cn} from "@/lib/utils";
import {GetAllForUserDonation} from "@/services/Donation";
import {FaEdit, FaEye} from "react-icons/fa";

import ShowDonationModal from "@/app/(main)/(userPanel)/profile/donation/_action/showModal";


export default function DonationTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)
    const [id, setId] = useState('')
    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => GetAllForUserDonation({
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
                            <FaEye size={20} className={"cursor-pointer "} onClick={() => {
                                const show = document.getElementById('donationModal') as HTMLDialogElement
                                show?.showModal()
                                setId(donate.id)
                            }}/>
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
            <ShowDonationModal id={id}/>
        </>
    )
}