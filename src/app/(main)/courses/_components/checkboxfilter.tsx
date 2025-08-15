'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { RiSearchLine } from 'react-icons/ri'
import useQueryParams from '@/hooks/useQueryParams'
import "./filters.scss"
import { cn } from "@/lib/utils";

type Category = {
    id: string
    name: string
    slug?: string
    icon?: string | null
    subCategories?: Category[]
}

type CheckBoxFilterProps = {
    data: Category[]
    title: string
    isOpen?: boolean
    hasSearch?: boolean
    searchPlaceholder?: string
    query?: string
    multiSelect?: boolean
}

export default function CheckBoxFilter({
                                           data,
                                           title,
                                           hasSearch = false,
                                           searchPlaceholder,
                                           isOpen = false,
                                           query,
                                           multiSelect = false
                                       }: CheckBoxFilterProps) {
    const { addQueryParam, removeQueryParam } = useQueryParams()
    const search = useSearchParams()
    const [searchValue, setSearchValue] = useState('')
    const [open, setIsOpen] = useState(isOpen);

    const handleCheck = (value: string | undefined) => {
        if (!value) return;
        if (search.getAll(query ?? '').includes(value)) {
            removeQueryParam(query)
        } else {
            addQueryParam(query ?? '', value)
        }
    }

    const filteredData = hasSearch
        ? data
            .flatMap(d => {
                // اگر parent match شد، کل parent با زیرشاخه‌ها برگردد
                if (d.name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return [d]
                }

                // اگر parent match نشد، اما زیرشاخه‌ها match شدند، فقط زیرشاخه‌ها برگردند
                if (d.subCategories) {
                    return d.subCategories
                        .filter(sub => sub.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map(sub => ({ ...sub, subCategories: [] })) // فقط خود sub بدون sub-sub
                }

                // هیچ matchی نبود
                return []
            })
        : data

    return (
        <div
            className={cn(
                "collapse filter-collapse text-sm collapse-arrow bg-base-100 border border-base-300 min-h-max",
                { "collapse-open": open }
            )}
        >
            <input
                type="checkbox"
                className="peer"
                checked={open}
                onChange={() => setIsOpen(!open)}
            />

            <div className="collapse-title cursor-pointer" onClick={() => setIsOpen(!open)}>
                {title}
            </div>

            <div className="collapse-content">
                {hasSearch && (
                    <div className="mb-3 relative">
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="input input-bordered dark:text-white/80 focus:bg-transparent dark:caret-white focus:outline-none w-full pr-10 text-xs text-gray-800 placeholder-gray-400 focus:text-gray-900 focus:placeholder-gray-500"
                        />
                        <RiSearchLine
                            size={20}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:text-gray-500"
                        />
                    </div>
                )}

                <ul className="menu menu-sm bg-base-100 w-full rounded-box p-0">
                    {filteredData.map((cat) => (
                        <li key={cat.id}>
                            {cat.subCategories && cat.subCategories.length > 0 ? (
                                <details>
                                    <summary className="py-2 flex items-center justify-between cursor-pointer">
                                        <label htmlFor={`checkbox-${cat.id}`}
                                               className="flex items-center cursor-pointer"
                                               onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                id={`checkbox-${cat.id}`}
                                                type="checkbox"
                                                className="checkbox checkbox-sm checkbox-primary"
                                                checked={search.getAll(query ?? '').includes(cat.slug ?? '')}
                                                onChange={() => handleCheck(cat.slug)}
                                                onClick={e => e.stopPropagation()}
                                            />
                                            <span className="mr-2">{cat.name}</span>
                                        </label>
                                    </summary>
                                    <ul>
                                        {cat.subCategories.map((sub) => (
                                            <li key={sub.id}>
                                                {multiSelect ? (
                                                    <label className="label cursor-pointer flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-sm checkbox-primary"
                                                            checked={search.getAll(query ?? '').includes(sub.slug ?? '')}
                                                            onChange={() => handleCheck(sub.slug)}
                                                        />
                                                        <span className="label-text py-1 mr-2">{sub.name}</span>
                                                    </label>
                                                ) : (
                                                    <Link href={`/${sub.slug}`}>{sub.name}</Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ) : multiSelect ? (
                                <label className="label cursor-pointer flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-primary"
                                        checked={search.getAll(query ?? '').includes(cat.slug ?? '')}
                                        onChange={() => handleCheck(cat.slug)}
                                    />
                                    <span className="label-text py-1 mr-2">{cat.name}</span>
                                </label>
                            ) : (
                                <Link href={`/${cat.slug}`}>{cat.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
