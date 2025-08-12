'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { useQuery} from "@tanstack/react-query";
import {Transactions} from "@/services/Wallet";
import ReactTable from "@/app/(main)/(userPanel)/_components/table";
import {GiWallet} from "react-icons/gi";
import AddDeposit from "@/app/(main)/(userPanel)/profile/wallet/_action/addDeposit";
import {cn} from "@/lib/utils";


export default function WalletTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => Transactions({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['transactions', pageIndex + 1, search],
    })

    const columns = React.useMemo<ColumnDef<Transaction>[]>(
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
                    return <span className={cn("text-success",amount < 0 && "text-red-500")}>{amount.toLocaleString('fa-IR') + " " + "تومان"}</span>;
                },
                footer: props => props.column.id,
            },
            {
                header: 'دلیل',
                accessorFn: row => row.reason,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'وضعیت',
                accessorFn: row => row.status, // عدد خام (1, 2, 3)
                cell: ({row}) => {
                    const data = row.original;
                    let label = '';
                    let badgeClass = '';


                    switch (data.status) {
                        case 1:
                            label = 'پرداخت موفق';
                            badgeClass = 'badge badge-success';
                            break;
                        case 2:
                            label = 'ناموفق';
                            badgeClass = 'badge badge-error';
                            break;
                        case 0:
                            label = 'در انتظار پرداخت';
                            badgeClass = 'badge badge-warning';
                            break;
                        default:
                            label = 'پرداخت نامشخص';
                            badgeClass = 'badge badge-neutral';
                    }

                    return <h5 className="text-sm font-semibold">
                        <div
                            className={cn(badgeClass, " w-28  badge-outline dark:badge-soft !py-4 badge-sm")}>{label}</div>
                    </h5>
                        ;
                },
                footer: props => props.column.id,
            },
            {
                header: 'تاریخ تراکنش',
                accessorFn: row => row.createdAt,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'توضیحات',
                accessorFn: row => row.description,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'کد پیگیری',
                accessorFn: row => row.referenceCode ?? '---',
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'سریال',
                accessorFn: row => row.serial,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
        ],
        []
    );

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی تراکنش ..."
                data={usersData?.data.transactions || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <button className={"btn  btn-primary"}
                            onClick={() => {
                                const dialog = document.getElementById('addDeposit') as HTMLDialogElement
                                dialog?.showModal()
                            }}>
                        <GiWallet/>
                        افزایش اعتبار
                    </button>
                }
            />
            <AddDeposit/>
        </>
    )
}