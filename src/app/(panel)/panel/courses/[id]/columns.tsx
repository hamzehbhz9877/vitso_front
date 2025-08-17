'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Button} from "@/components/ui/button";
import {FaEdit, FaEye} from "react-icons/fa";
import {RequestSeasons} from "@/services/Season";
import {useParams, useRouter} from "next/navigation";
import DeleteSeason from "@/app/(panel)/panel/courses/[id]/_action/deleteSeason";
import {BiTrash} from "react-icons/bi";
import AddSeason from "@/app/(panel)/panel/courses/[id]/_action/addSeason";
import EditSeason from "@/app/(panel)/panel/courses/[id]/_action/editSeason";
import {FaAngleRight} from "react-icons/fa6";
import {CirclePlus} from "lucide-react";

export default function SeasonsTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const params = useParams()
    const router = useRouter()

    const {data: seasonData, isLoading} = useQuery({
        queryFn: () => RequestSeasons({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
            courseId : params.id,
        }),
        queryKey: ['seasons',pageIndex + 1, search, params.id],
    })


    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'عنوان',
                accessorFn: row => row.title,

            },{
                accessorKey: 'ترتیب',
                accessorFn: row => row.order,

            },{
                header: 'عملیات',
                cell: ({row}) => {
                    const season = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEye size={20} className={"cursor-pointer "} onClick={() => router.push(`${params.id}/episode/${season.id}`)}/>

                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => openModal(<EditSeason id={season.id}/>)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteSeason name={season.title}
                                                                             id={season.id}/>)}/>
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
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight />
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">مدیریت فصل ها</h2>
            </div>
            <ReactTable
                searchPlaceholder="جستجوی فصل ..."
                data={seasonData?.data.seasons || []}
                columns={columns}
                totalPages={seasonData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button  onClick={() => openModal(<AddSeason/>)}
                    >
                        <CirclePlus/>
                        افزودن فصل
                    </Button>
                }
            />
        </>
    )
}