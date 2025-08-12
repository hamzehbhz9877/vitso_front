'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(panel)/_components/table";
import {RequestInvoice} from "@/services/Invoice";
import { FaEye} from "react-icons/fa";

import {useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";


export default function InvoiceTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => RequestInvoice({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['invoicesPanel', pageIndex + 1, search],
    })


    const router = useRouter();
    const columns = React.useMemo<ColumnDef<Invoice>[]>(() => [
        {
            header: 'ردیف',
            accessorFn: (_row, index) => index + 1,
            cell: info => info.getValue(),
        },
        {
            header: 'نام و نام خانوادگی',
            accessorFn: row => row.fullName,
            cell: info => info.getValue(),
        }, {
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
                let badge;

                switch (status) {
                    case 1:
                        label = 'پرداخت شده';
                        badge = (
                            <Badge className="bg-green-600 text-white hover:bg-green-700 w-24 py-1.5 justify-center rounded-full">
                                {label}
                            </Badge>
                        );
                        break;
                    case 0:
                        label = 'پرداخت نشده';
                        badge = (
                            <Badge className="bg-red-600 text-white hover:bg-red-700 w-24 py-1.5 justify-center rounded-full">
                                {label}
                            </Badge>
                        );
                        break;
                    default:
                        label = 'نامشخص';
                        badge = (
                            <Badge variant="secondary" className="w-24 py-1.5 justify-center rounded-full">
                                {label}
                            </Badge>
                        );
                }

                return (
                    <div className="flex justify-center">
                        {badge}
                    </div>
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