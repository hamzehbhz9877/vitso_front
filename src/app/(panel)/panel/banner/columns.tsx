'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import ReactTable from "@/app/(panel)/_components/table";
import {cn} from "@/lib/utils";
import {GetAllBanner} from "@/services/Banner";

import {FaEdit, FaEye} from "react-icons/fa";
import {BiTrash} from "react-icons/bi";
import DeleteCourse from "@/app/(panel)/panel/courses/_action/deleteCourse";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import DeleteBanners from "@/app/(panel)/panel/banner/_actions/deleteBanner";
import useModal from "@/context/modal/useModal";
import {CirclePlus} from "lucide-react";


export default function BannerTable() {
    const {openModal} = useModal()

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading,} = useQuery({
        queryFn: () => GetAllBanner({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['banners', pageIndex + 1, search],
    })

    const router = useRouter()


    const columns = React.useMemo<ColumnDef<Banner>[]>(
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
                header: 'تعداد بنر ها',
                accessorFn: row => row.bannerCount,
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
                    const banner = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEdit size={20} className={"cursor-pointer "} onClick={() => router.push(`banner/edit/${banner.position}`)}/>
                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteBanners name={banner.position}
                                                                          id={banner.id}/>)}/>
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
                data={usersData?.data.banners || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button  onClick={() => router.push(`banner/add`)}
                    >
                        <CirclePlus/>
                        افزودن بنر
                    </Button>
                }
            />
        </>
    )
}