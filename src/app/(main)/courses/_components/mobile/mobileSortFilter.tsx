'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import useQueryParams from '@/hooks/useQueryParams'
import { useSearchParams } from 'next/navigation'

type SortItem = {
    id: string
    name: string
    slug: string
}

type SortFilterProps = {
    data: SortItem[]
    query: string,
    closeSortFilter:()=>void
}

export default function SortFilter({ data, query , closeSortFilter}: SortFilterProps) {
    const { addQueryParam, removeQueryParam } = useQueryParams()
    const search = useSearchParams()

    const selectedValues = search.getAll(query)

    const handleClick = (slug: string) => {
        closeSortFilter()
        if (selectedValues.includes(slug)) {
            removeQueryParam(query)
        } else {
            addQueryParam(query, slug)
        }
    }

    return (
        <div className="flex flex-col">
            {data.map(({ id, name, slug }, index) => {
                const isActive = selectedValues.includes(slug)
                const isLast = index === data.length - 1
                return (
                    <div
                        key={id}
                        onClick={() => handleClick(slug)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleClick(slug)
                            }
                        }}
                        className={cn(
                            "w-full text-sm text-right py-4  cursor-pointer select-none transition-colors duration-200",
                            // همیشه بوردر پایین نازک و خاکستری، مگر آیتم آخر
                            !isLast ? "border-b border-gray-300 dark:border-gray-600" : "",
                            // رنگ متن در حالت عادی خاکستری روشن
                            "text-gray-800 dark:text-gray-200",
                            // اگر اکتیو بود فقط رنگ متن primary شود
                            isActive && "!text-primary font-semibold"
                        )}
                    >
                        {name}
                    </div>
                )
            })}
        </div>
    )
}
