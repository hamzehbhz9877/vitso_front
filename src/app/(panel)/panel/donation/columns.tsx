'use client'

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import ReactTable from "@/app/(panel)/_components/table";
import { cn } from "@/lib/utils";
import { GetAllDonation, GetAllForTeacherDonation } from "@/services/Donation";
import useAuth from "@/context/authentication/useAuth";
import { FaEye } from "react-icons/fa";
import ShowDonationModal from "./_action/ShowDonationModal";
import useModal from "@/context/modal/useModal";

export default function DonationTable() {
    const { user } = useAuth();
    const { openModal } = useModal();

    const [search, setSearch] = React.useState('');
    const [pageIndex, setPageIndex] = React.useState(0);

    // انتخاب API بر اساس نقش کاربر
    const apiFn = React.useMemo(() => {
        if (!user) return null;
        return user.roles.includes("مدیر") ?  GetAllDonation:  GetAllForTeacherDonation;
    }, [user]);

    // query فقط وقتی user آماده است اجرا می‌شود
    const { data: usersData, isLoading } = useQuery({
        queryFn: () => apiFn!({ pageCurrent: pageIndex + 1, pageSize: 10, search }),
        queryKey: ['donationsAdmin', pageIndex + 1, search],
        enabled: !!apiFn,
    });

    const columns = React.useMemo<ColumnDef<Donate>[]>(() => [
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
            cell: ({ row }) => {
                const amount = row.original.amount;
                return <span
                    className={cn("text-success", amount < 0 && "text-red-500")}>
          {amount.toLocaleString('fa-IR') + " " + "تومان"}
        </span>;
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
            cell: ({ row }) => {
                const donate = row.original;
                return (
                    <div className="flex gap-3 justify-center">
                        <FaEye size={20} className="cursor-pointer"
                               onClick={() => openModal(<ShowDonationModal id={donate.id} />)}
                        />
                    </div>
                );
            },
        }
    ], [openModal]);

    // // نمایش loading تا زمانی که user آماده شود
    // if (!user) {
    //     return <div className="text-center py-20">در حال بارگذاری...</div>;
    // }

    return (
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
    );
}
