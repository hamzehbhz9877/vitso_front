'use client'

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useMutation, useQuery} from "@tanstack/react-query";
import useModal from "@/context/modal/useModal";
import {Switch} from "@/components/ui/switch";
import {ChangeStatusComments, GetAllComments} from "@/services/Comment";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

export default function CommentsTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading, refetch} = useQuery({
        queryFn: () => GetAllComments({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['commentsPanel', pageIndex + 1, search],
    })

    // const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})
    //
    // const handleToggle = (userId: string, checked: boolean) => {
    //     setSwitchStates(prev => ({ ...prev, [userId]: checked }))
    //     if (!isPending)
    //         mutate(userId)
    // }

    const {mutate,isPending} = useMutation({
        mutationFn: ChangeStatusComments,
        onSettled: (_, error) => {
            if (!error)
                refetch();

        }
    })

    const handleStatusToggle = async (id: string, approved: boolean) => {
        if (!isPending)
        await mutate({commentId:id,status:approved ? 1 : 2})
    };

    const columns = React.useMemo<ColumnDef<Comments>[]>(
        () => [
            {
                accessorKey: '#',
                header: '#',
                accessorFn: (_row, index) => index + 1,
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'fullName',
                header: 'نام و نام خانوادگی',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'for',
                header: 'برای',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'message',
                header: 'متن پیام',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'createdAt',
                header: 'تاریخ ارسال',
                cell: info => info.getValue(),
            },
            {
                accessorKey: 'statusFa',
                header: 'وضعیت',
                cell: info => {
                    const status = info.getValue() as string;
                    let colorClass = 'text-gray-600';

                    if (status === 'تایید شده') colorClass = 'bg-green-600 text-white hover:bg-green-700 ';
                    else if (status === 'رد شده') colorClass = 'bg-red-600 text-white hover:bg-red-700 ';
                    else if (status === 'در انتظار') colorClass = 'bg-yellow-600 text-white hover:bg-yellow-700 ';

                    return <Badge className={cn(colorClass,"font-semibold rounded-full w-24 py-1.5 justify-center")}>{status}</Badge>;
                },
            },
            {
                header: 'عملیات',
                cell: ({ row }) => {
                    const comment = row.original;
                    const isApproved = +(comment.status) === 1; // فرض بر اینکه 1 یعنی تایید شده

                    return (
                            <Switch
                                checked={isApproved}
                                onCheckedChange={() => handleStatusToggle(comment.id, !isApproved)}
                                color={"primary"}
                                className="bg-gray-200  data-[state=checked]:bg-indigo-500"
                            />
                    );
                },
            },
        ],
        []
    );


    const {openModal} = useModal()

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی نظرات ..."
                data={usersData?.data.comments || []}
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