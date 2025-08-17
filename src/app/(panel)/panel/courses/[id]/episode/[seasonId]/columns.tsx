'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Button} from "@/components/ui/button";
import {FaEdit} from "react-icons/fa";
import {RequestEpisodes} from "@/services/Episode";
import {useParams, useRouter} from "next/navigation";
import DeleteSeason from "@/app/(panel)/panel/courses/[id]/episode/[seasonId]/_action/deleteEpisode";
import {BiTrash} from "react-icons/bi";
import AddEpisode from "@/app/(panel)/panel/courses/[id]/episode/[seasonId]/_action/addEpisode";
import EditEpisode from "@/app/(panel)/panel/courses/[id]/episode/[seasonId]/_action/editEpisode";
import {FaAngleRight} from "react-icons/fa6";
import {CirclePlus} from "lucide-react";

export default function EpisodesTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const params = useParams()
    const router = useRouter()

    const {data: episodeData, isLoading} = useQuery({
        queryFn: () => RequestEpisodes(params.seasonId),
        queryKey: ["episodes", params.seasonId],
    })


    const columns = React.useMemo<ColumnDef<Episode>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'عنوان',
                accessorFn: row => row.title,

            },
            {
                accessorKey: 'زمان',

                accessorFn: row => row.duration,
            },
            {
                accessorKey: 'زمان انتشار',
                accessorFn: row => row.publishedAt.split(" ")[0],
            }, {
                accessorKey: 'آدرس ویدیو',
                accessorFn: row => new URL(row.videoUrl).origin ,
            }, {
                accessorKey: 'وضعیت دسترسی',
                accessorFn: row => row.isFree,
            }, {
                header: 'عملیات',
                cell: ({row}) => {
                    const episode = row.original;

                    return (
                        <div className="flex gap-3 justify-center">

                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => openModal(<EditEpisode id={episode.id}/>)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteSeason name={episode.title}
                                                                            id={episode.id}/>)}/>
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
                <h2 className="text-xl font-bold lg:text-2xl">مدیریت جلسات</h2>
            </div>
            <ReactTable
                searchPlaceholder="جستجوی جلسه ..."
                data={episodeData?.data || []}
                columns={columns}
                totalPages={episodeData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button  onClick={() => openModal(<AddEpisode/>)}
                    >
                        <CirclePlus/>
                        افزودن جلسه
                    </Button>
                }
            />
        </>
    )
}