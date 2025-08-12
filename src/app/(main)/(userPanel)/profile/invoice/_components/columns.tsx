'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(main)/(userPanel)/_components/table";
import {GetAllForStudentInvoice} from "@/services/Invoice";
import {cn} from "@/lib/tiptap-utils";
import { FaEye} from "react-icons/fa";

import {useRouter} from "next/navigation";


export default function InvoiceTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => GetAllForStudentInvoice({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['invoices', pageIndex + 1, search],
    })


    const router = useRouter();
    const columns = React.useMemo<ColumnDef<Invoice>[]>(() => [
        {
            header: 'ردیف',
            accessorFn: (_row, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'مبلغ',
            accessorFn: row => row.price + " تومان",
            cell: info => info.getValue(),
        },
        {
            header: 'تعداد دوره',
            accessorFn: row => row.courseCount,
            cell: info => info.getValue(),
        },
        {
            header: 'تاریخ پرداخت',
            accessorFn: row => row.paymentDate??"--",
            cell: info => info.getValue(),
        }, {
            header: 'کد پیگیری',
            accessorFn: row => row.serial,
            cell: info => info.getValue(),
        },
        {
            header: 'وضعیت',
            accessorFn: row => row.status,
            cell: ({ row }) => {
                const status = row.original.status;
                let label = '';
                let badgeClass = '';

                switch (status) {
                    case 1:
                        label = 'پرداخت شده';
                        badgeClass = 'badge badge-success';
                        break;
                    case 0:
                        label = 'پرداخت نشده';
                        badgeClass = 'badge badge-error';
                        break;
                    default:
                        label = 'نامشخص';
                        badgeClass = 'badge badge-neutral';
                }

                return (
                    <h5 className="text-sm font-semibold">
                        <div
                            className={cn(badgeClass, " w-28  badge-outline dark:badge-soft !py-4 badge-sm")}>{label}</div>
                    </h5>
                );
            },
        },
        {
            header: 'عملیات',
            cell: ({row}) => {
                const invoice = row.original;

                return (
                    <div className="flex gap-3 justify-center">
                        <FaEye size={20} className={"cursor-pointer"}
                                onClick={() => router.push(`invoice/${invoice.id}`)}/>
                    </div>
                );
            },
        }
    ], []);
    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی فاکتور ..."
                data={usersData?.data.invoices || []}
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