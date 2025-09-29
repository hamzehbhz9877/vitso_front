'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import useQueryParams from "@/hooks/useQueryParams";

const Category = ({ name, icon,type,slug }: {type:string ,slug:string,name: string; icon: string }) => {
    const {addQueryParam}=useQueryParams()

    return (
        <div className="border  border-gray-300 dark:border-gray-800 bg-base-300 text-center relative px-2 py-2 rounded-lg min-w-[120px] md:min-w-[130px]">
            <div onClick={()=>addQueryParam('slugCategory',slug)} className={"h-full flex flex-col cursor-pointer"}>
                {icon?
                <Image
                    src={icon??null}
                    width={60}
                    height={60}
                    title={name}
                    alt={name}
                    className="mx-auto max-h-10 max-w-10"
                />:""}
                <h2 className="mt-auto pt-2 text-xs font-semibold text-gray-700 dark:text-base-content leading-tight overflow-visible">
                    {name}
                </h2>
            </div>
        </div>
    );
};

export default Category;
