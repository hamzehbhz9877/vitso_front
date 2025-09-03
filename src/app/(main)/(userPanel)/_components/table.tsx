import React from 'react'
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
                                       headerActions,
                                       searchPlaceholder,
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
    searchPlaceholder: string
}) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: currentPage,
        pageSize: 10,
    })
    // const [searchQuery, setSearchQuery] = React.useState('')

    React.useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: currentPage,
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
            fuzzy: (row, columnId, filterValue) =>
                String(row.getValue(columnId))
                    .toLowerCase()
                    .includes(String(filterValue).toLowerCase()),
        },
        globalFilterFn: fuzzyFilter,
    })

    // تابع ساخت pagination ساده
    const MakePagination = (
        current: number,
        total: number,
        onClick: (page: number) => void
    ) => {
        const pages = []
        for (let i = 1; i <= total; i++) {
            pages.push(
                <button
                    key={i}
                    className={`btn btn-sm ${
                        i === current ? 'btn-primary' : 'btn-ghost'
                    }`}
                    onClick={() => onClick(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    const pages = MakePagination(currentPage + 1, totalPages, (page) =>
        onPageChange(page - 1)
    )

    // کنترل نمایش ستون‌ها (یک نسخه ساده و دم دستی با checkbox)
    const [showColumns, setShowColumns] = React.useState(
        table.getAllColumns().reduce((acc, col) => {
            acc[col.id] = col.getIsVisible()
            return acc
        }, {} as Record<string, boolean>)
    )

    // const toggleColumn = (id: string) => {
    //     const newVal = !showColumns[id]
    //     setShowColumns((prev) => ({ ...prev, [id]: newVal }))
    //     table-button.getColumn(id)?.toggleVisibility(newVal)
    // }

    return (
        <div className="p-2 rtl">
            <div
                className={`flex gap-y-3 flex-col items-start md:flex-row sm:items-center ${
                    headerActions ? 'sm:justify-between' : 'sm:justify-end'
                } mb-5`}
            >
                {headerActions}
                <div className="flex items-center gap-3">
                    <DebouncedInput
                        value={globalFilter}
                        onChange={(value) => setGlobalFilter(String(value))}
                        placeholder={searchPlaceholder ?? 'جستجو کنید ...'}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table   text-center table-zebra w-full ">
                    <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className={
                                        header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : ''
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows?.length ? (
                        isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center">
                                    در حال بارگذاری...
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className={"text-nowrap"}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center">
                                نتایجی یافت نشد.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
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

// کامپوننت ورودی با debounce ساده
function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & React.InputHTMLAttributes<HTMLInputElement>) {
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
        <label className="input">
            <svg className="h-[1.5em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input
                {...props}
                type="search"
                onChange={(e) => setValue(e.target.value)}
                className={`grow ${props.className}`}
                value={value}
                dir="rtl"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
        </label>

    )
}
