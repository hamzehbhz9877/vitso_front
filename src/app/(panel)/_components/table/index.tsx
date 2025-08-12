
import React from 'react'

// import './index.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Pagination from "@/components/pagination";
import {MakePagination} from "@/hooks/usePagination/makePagination";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown, Columns3, RefreshCcw, SearchIcon} from "lucide-react";
import {fuzzyFilter} from "@/lib/utils";


export default function ReactTable({
                                       data,
                                       columns,
                                       totalPages,
                                       currentPage,
                                       onPageChange,
                                       globalFilter,
                                       setGlobalFilter,
                                       isLoading,
                                       headerActions, // 👈 اضافه شده
                                       searchPlaceholder
                                   }: {
    data: any[]
    columns: ColumnDef<any>[]
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    globalFilter: string
    setGlobalFilter: (val: string) => void
    isLoading?: boolean
    headerActions?: React.ReactNode
    searchPlaceholder:string

}) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: currentPage,
        pageSize: 10,
    })
    const [searchQuery, setSearchQuery] = React.useState<string>();



    React.useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageIndex: currentPage
        }))
    }, [currentPage])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            fuzzy: (row, columnId, filterValue) => {
                return String(row.getValue(columnId)).toLowerCase().includes(String(filterValue).toLowerCase())
            }
        },
        globalFilterFn: fuzzyFilter,
    })

    const pages = MakePagination(
        currentPage + 1,
        totalPages,
        (page) => onPageChange(page - 1)
    )

    return (
        <div className="p-2">
            <div
                className={`flex gap-y-3 flex-col items-start lg:flex-row lg:items-center ${
                    headerActions ? 'lg:justify-between' : 'lg:justify-end'
                } mb-5`}
            >                {headerActions}
             <div className={"flex items-center gap-3  w-full sm:w-max"}>
                 <DebouncedInput
                     value={globalFilter}
                     onChange={value => setGlobalFilter(String(value))}
                     className="px-2 py-3 w-full sm:w-[300px]  text-[14px] shadow border border-block"
                     placeholder={searchPlaceholder??'جستجو کنید ...'}
                 />
                 <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="ml-auto">
                             <Columns3 /><span className={"hidden lg:block"}>نمایش ستون ها</span> <ChevronDown />
                         </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                         <div className="relative">
                             <Input
                                 value={searchQuery}
                                 onChange={(e) => setSearchQuery(e.target.value)}
                                 className="!pr-8"
                                 dir={"rtl"}
                                 placeholder="جستجو"
                                 onKeyDown={(e) => e.stopPropagation()}
                             />
                             <SearchIcon className="absolute inset-y-0 my-auto right-2 h-4 w-4" />
                         </div>
                         <DropdownMenuSeparator />
                         {table
                             .getAllColumns()
                             .filter((column) => column.getCanHide())
                             .map((column) => {
                                 if (
                                     searchQuery &&
                                     !column.id.toLowerCase().includes(searchQuery.toLowerCase())
                                 ) {
                                     return null;
                                 }

                                 return (
                                     <DropdownMenuCheckboxItem
                                         key={column.id}
                                         dir={"rtl"}
                                         className="capitalize"
                                         checked={column.getIsVisible()}
                                         onCheckedChange={(value) =>
                                             column.toggleVisibility(!!value)
                                         }
                                         onSelect={(e) => e.preventDefault()}
                                     >
                                         {column.id}
                                     </DropdownMenuCheckboxItem>
                                 );
                             })}
                         <DropdownMenuSeparator />
                         <DropdownMenuItem
                             onClick={() => {
                                 table.resetColumnVisibility();
                                 setSearchQuery("");
                             }}
                         >
                             <RefreshCcw /> بازنشانی
                         </DropdownMenuItem>
                     </DropdownMenuContent>
                 </DropdownMenu>
             </div>
            </div>


                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow  key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead className={"text-center bg-gray-200 text-black"}  key={header.id} colSpan={header.colSpan}>
                                    <div
                                        className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? isLoading ? (
                        <TableRow><TableCell  colSpan={columns.length}>در حال بارگذاری...</TableCell></TableRow>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell  key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ): (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                               نتایجی یافت نشد.
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>

            <div className="flex justify-center items-center gap-2 mt-4">

                <Pagination
                    total={totalPages}
                    pages={pages}
                    currentPage={currentPage + 1}
                    goTo={(page) => onPageChange(page - 1)}
                    nextPage={() => onPageChange(currentPage + 1)}
                    prevPage={() => onPageChange(currentPage - 1)}
                />
            </div>
        </div>
    )
}


// A typical debounced input react component
function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
            <div className={"relative w-full sm:w-max"}>
                <Input
                    {...props} className={`${props.className} text-sm w-full lg:!w-[300px] !pr-8`}

                    value={value} onChange={e => setValue(e.target.value)}
                />
                <SearchIcon className="absolute inset-y-0 my-auto right-2 h-4 w-4" />
            </div>
    )
}

