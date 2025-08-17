'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Button} from "@/components/ui/button";
import {FaDollarSign, FaEdit, FaEye} from "react-icons/fa";
import {RequestCourses} from "@/services/Course";
import {useRouter} from "next/navigation";
import DeleteCourse from "@/app/(panel)/panel/courses/_action/deleteCourse";
import {BiTrash} from "react-icons/bi";
import {TbReportMoney} from "react-icons/tb";
import {PiSealQuestionFill} from "react-icons/pi";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CirclePlus} from "lucide-react";

export default function CoursesTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)


    const router = useRouter()

    const {data: courseData, isLoading} = useQuery({
        queryFn: () => RequestCourses({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['courses', pageIndex+1, search],
    })



    const columns = React.useMemo<ColumnDef<Course>[]>(
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
                    const course = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <FaDollarSign   size={20} className={"cursor-pointer "} onClick={() => router.push(`courses/${course.id}/price`)}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>لیست قیمت ها</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PiSealQuestionFill   size={20} className={"cursor-pointer "} onClick={() => router.push(`courses/${course.id}/faq`)}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>سوالات متداول</p>
                                </TooltipContent>
                            </Tooltip>
                            <FaEye size={20} className={"cursor-pointer "} onClick={() => router.push(`courses/${course.id}`)}/>

                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => router.push(`courses/edit/${course.id}`)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteCourse name={course.title}
                                                                            id={course.id}/>)}/>
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
                searchPlaceholder="جستجوی دوره ..."
                data={courseData?.data.courses || []}
                columns={columns}
                totalPages={courseData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button variant={"outline"}  onClick={() => router.push(`courses/add`)}
                    >
                        <CirclePlus/>
                        افزودن دوره
                    </Button>
                }
            />
        </>
    )
}