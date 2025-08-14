'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Button} from "@/components/ui/button";
import {FaEdit} from "react-icons/fa";
import {RequestArticles} from "@/services/Article";
import {useRouter} from "next/navigation";
import DeleteArticle from "@/app/(panel)/panel/article/_action/deleteArticle";
import {BiTrash} from "react-icons/bi";

export default function ArticlesTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)


    const router = useRouter()

    const {data: articleData, isLoading} = useQuery({
        queryFn: () => RequestArticles({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['articles', pageIndex+1, search],
    })



    const columns = React.useMemo<ColumnDef<Article>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row,index) => index+1,
            },
            {
                accessorKey: 'عنوان',
                accessorFn: row => row.title,

            },
            {
                accessorKey: 'نام دسته بندی',

                accessorFn: row => row.categoryName,
            },
            {
                accessorKey: 'زمان انتشار',
                accessorFn: row => row.publishedAt.split(" ")[0],
            }, {
                accessorKey: 'تعداد بازدید',
                accessorFn: row => row.viewCount,

            }, {
                header: 'عملیات',
                cell: ({row}) => {
                    const article = row.original;

                    return (
                        <div className="flex gap-3 justify-center">

                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => router.push(`article/edit/${article.id}`)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteArticle name={article.title}
                                                                              id={article.id}/>)}/>
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
                searchPlaceholder="جستجوی مقاله ..."
                data={articleData?.data.articles || []}
                columns={columns}
                totalPages={articleData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button variant={"outline"}  onClick={() => router.push(`article/add`)}
                    >
                        افزودن مقاله
                    </Button>
                }
            />
        </>
    )
}