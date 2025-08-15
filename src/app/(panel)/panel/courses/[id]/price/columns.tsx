'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Button} from "@/components/ui/button";
import {GetAllPriceWithPagination} from "@/services/Course";
import {useParams, useRouter} from "next/navigation";
import AddPrice from "@/app/(panel)/panel/courses/[id]/price/_action/addPrice";
import {FaAngleRight} from "react-icons/fa6";

export default function PricesTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const params = useParams()
    const router = useRouter()

    const {data: seasonData, isLoading} = useQuery({
        queryFn: () => GetAllPriceWithPagination({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
            courseId : params.id,
        }),
        queryKey: ['prices',pageIndex + 1, search, params.id],
    })


    const columns = React.useMemo<ColumnDef<CoursePrice>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'مقدار',
                accessorFn: row => row.amount.toLocaleString('fa-IR')+" "+"تومان",

            },{
                accessorKey: 'درصد تخفیف',
                accessorFn: row => row.discountPercentage,

            },{
                accessorKey: 'تاریخ ایجاد',
                accessorFn: row => row.createdAt,
            },{
                accessorKey: 'تاریخ اتمام',
                accessorFn: row => row.endDateDiscount?row.endDateDiscount?.split(" ")[0]:"-",
            }
        ],
        []
    )

    const {openModal} = useModal()

    return (
        <>

            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight />
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">مدیریت قیمت دوره</h2>
            </div>
            <ReactTable
                searchPlaceholder="جستجوی قیمت ..."
                data={seasonData?.data.prices || []}
                columns={columns}
                totalPages={seasonData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button variant={"outline"} onClick={() => openModal(<AddPrice/>)}
                    >
                        افزودن قیمت جدید
                    </Button>
                }
            />
        </>
    )
}