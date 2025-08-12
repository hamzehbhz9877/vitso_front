'use client'

import React from 'react';
import useQueryParams from "@/hooks/useQueryParams";
import {useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";


const SortFilter = ({courseCount,type}:{type:string,courseCount:number}) => {

    const {addQueryParam}=useQueryParams()
    const search = useSearchParams()

    return (
        <div className={"sort-filter mb-4 hidden lg:block"}>
            <div className="flex items-center justify-between bg-base-300 p-2 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 4h18M6 8h12M9 12h6m-3 4h0"/>
                        </svg>
                        <span>مرتب سازی بر اساس:</span>

                    </div>
                    <div className="flex gap-2">
                        <button className={cn("btn btn-xs",+search.get('sort')===0?"btn-primary":"btn-ghost")} onClick={()=>addQueryParam("sort",0)}>جدید ترین</button>
                        {type!=="article"?<button className={cn("btn btn-xs",+search.get('sort')===1?"btn-primary":"btn-ghost")} onClick={()=>addQueryParam("sort",1)}>ارزان ترین</button>:""}
                        {type!=="article"?<button className={cn("btn btn-xs",+search.get('sort')===2?"btn-primary":"btn-ghost")} onClick={()=>addQueryParam("sort",2)}>گرانترین</button>:""}
                        <button className={cn("btn btn-xs",+search.get('sort')===3?"btn-primary":"btn-ghost")} onClick={()=>addQueryParam("sort",3)}>پربازدید ترین</button>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="font-medium">{(courseCount??0)+" "+(type==="article"?"مقاله" :"دوره")} </span>
                </div>
            </div>

        </div>
    );
};

export default SortFilter;