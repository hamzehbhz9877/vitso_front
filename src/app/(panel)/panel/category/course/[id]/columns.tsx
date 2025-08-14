'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import AddCategory from "@/app/(panel)/panel/category/[id]/action/addCategory";
import EditCategory from "@/app/(panel)/panel/category/[id]/action/editCategory";
import DeleteCategory from "@/app/(panel)/panel/category/[id]/action/deleteCategory";
import {Button} from "@/components/ui/button";
import { FaEdit} from "react-icons/fa";
import { RequestSubCategory} from "@/services/Category";
import {useParams, useRouter} from "next/navigation";
import {BiTrash} from "react-icons/bi";
import {FaAngleRight} from "react-icons/fa6";

export default function CategorysTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)
    const params=useParams()

    const router=useRouter()

    const {data: categoryData, isLoading, refetch} = useQuery({
        queryFn: () => RequestSubCategory({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
            id:params.id,
        }),
        queryKey: ['subcategories', pageIndex+1, search,params.id],
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

            }, {
                accessorKey: 'دسته والد',
                accessorFn: row => row.parentName,
            },
            {
                accessorKey: 'نوع دسته',
                accessorFn: row => row.type,
            }, {
                accessorKey: 'اولویت',
                accessorFn: row => row.priority,

            }, {
                header: 'عملیات',
                cell: ({row}) => {
                    const category = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
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
            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline">
                    <FaAngleRight onClick={() => router.back()}/>
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">زیر دسته بندی دوره ها</h2>
            </div>
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
                    <Button variant={"outline"} onClick={() => openModal(<AddCategory/>)}
                    >
                        افزودن زیر دسته بندی
                    </Button>
                }
            />
        </>
    )
}