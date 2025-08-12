'use client'

import React, {useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import ReactTable from "@/app/(panel)/_components/table";
import {useMutation, useQuery} from "@tanstack/react-query";
import {ChangeStatusUsers, RequestUsers} from "@/services/User";
import useModal from "@/context/modal/useModal";
import AddUser from "@/app/(panel)/panel/users/_action/addUser";
import EditUser from "@/app/(panel)/panel/users/_action/editUser";
import DeleteUser from "@/app/(panel)/panel/users/_action/deleteUser";
import {Button} from "@/components/ui/button";
import {FaEdit} from "react-icons/fa";
import {Switch} from "@/components/ui/switch";
import {BiTrash} from "react-icons/bi";

export default function UsersTable() {

    const [search, setSearch] = React.useState('')
    const [pageIndex, setPageIndex] = React.useState(0)

    const {data: usersData, isLoading, refetch} = useQuery({
        queryFn: () => RequestUsers({
            pageCurrent: pageIndex + 1,
            pageSize: 10,
            search: search,
        }),
        queryKey: ['users', pageIndex + 1, search],
    })

    const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({})

    const handleToggle = (userId: string, checked: boolean) => {
        setSwitchStates(prev => ({ ...prev, [userId]: checked }))
        if (!isPending)
        mutate(userId)
    }
    const {mutate,isPending} = useMutation({
        mutationFn: ChangeStatusUsers,
        onSettled: (_, error) => {
            if (!error)
                refetch();

        }
    })


    const columns = React.useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: '#',
                accessorFn: (row,index) => index+1,
            },
            {
                accessorKey: 'نام و نام خانوادگی',
                accessorFn: row => row.firstName + " " + row.lastName,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorKey: 'نام کاربری',
                accessorFn: row => row.userName,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorKey: 'شماره همراه',
                accessorFn: row => row.phone,

                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorKey: 'نقش ها',
                accessorFn: row => row.roles,
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                header: 'وضعیت',
                cell: ({row}) => {
                    const user = row.original;

                    return (

                        <Switch
                            checked={switchStates[user.id] ?? (user.status === "فعال")}
                            onCheckedChange={(checked) => handleToggle(user.id, checked)}
                            className="data-[state=checked]:bg-indigo-500"
                        />

                    );
                },
                footer: props => props.column.id,
            }, {
                header: 'عملیات',
                cell: ({row}) => {
                    const user = row.original;

                    return (
                        <div className="flex gap-3 justify-center">
                            <FaEdit size={20} className={"cursor-pointer"}
                                    onClick={() => openModal(<EditUser id={user.id}/>)}/>

                            <BiTrash size={20} className={"cursor-pointer"}
                                     onClick={() => openModal(<DeleteUser name={user.firstName + " " + user.lastName}
                                                                          id={user.id}/>)}/>
                        </div>
                    );
                },
                footer: props => props.column.id,
            }

        ],
        []
    )

    const {openModal} = useModal()

    return (
        <>
            <ReactTable
                searchPlaceholder="جستجوی کاربران ..."
                data={usersData?.data.users || []}
                columns={columns}
                totalPages={usersData?.data.totalPage ?? 1}
                currentPage={pageIndex}
                onPageChange={setPageIndex}
                globalFilter={search}
                setGlobalFilter={setSearch}
                isLoading={isLoading}
                headerActions={
                    <Button onClick={() => openModal(<AddUser/>)}
                    >
                        افزودن کاربر
                    </Button>
                }
            />
        </>
    )
}