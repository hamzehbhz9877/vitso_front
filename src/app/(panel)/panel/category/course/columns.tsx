'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import AddCategory from "@/app/(panel)/panel/category/course/_action/addCategory";
import {Button} from "@/components/ui/button";
import {FaEdit, FaEye} from "react-icons/fa";
import {RequestCategory} from "@/services/Category";
import { useRouter} from "next/navigation";
import EditCategory from "@/app/(panel)/panel/category/course/_action/editCategory";
import DeleteCategory from "@/app/(panel)/panel/category/course/_action/deleteCategory";
import {BiTrash} from "react-icons/bi";

export default function CategorysTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)


    const router = useRouter()

    const {data: categoryData, isLoading, refetch} = useQuery({
        queryFn: () => RequestCategory({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
            type:0
        }),
        queryKey: ['categories', pageIndex+1, search,0],
    })


    const columns = React.useMemo<ColumnDef<Category>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row,index) => index+1,
            },
            {
                accessorKey: 'نام دسته',
                accessorFn: row => row.name,

            },
            {
                accessorKey: 'تعداد زیر دسته ها',

                accessorFn: row => row.countSub,
            },
            // {
            //     accessorKey: 'دسته والد',
            //     accessorFn: row => row.parentName,
            //     id: 'parentName',
            // },
            {
                accessorKey: 'اولویت',
                accessorFn: row => row.priority,

            }, {
                header: 'عملیات',
                cell: ({row}) => {
                    const category = row.original;

                    return (
                        <div className="flex gap-3 justify-center">

                            <FaEye size={20} className={"cursor-pointer "} onClick={() => router.push(`course/${category.id}`)}/>
                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => openModal(<EditCategory id={category.id}/>)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteCategory name={category.name}
                                                                          id={category.id}/>)}/>
                        </div>
                    );
                },
            }

        ],
        []
    )

    const {openModal} = useModal()

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی دسته بندی ..."
                data={categoryData?.data.categories || []}
                columns={columns}
                totalPages={categoryData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button onClick={() => openModal(<AddCategory/>)}
                    >
                        افزودن دسته بندی
                    </Button>
                }
            />
        </>
    )
}