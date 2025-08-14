'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Category = ({ name, icon,type }: {type:string ,name: string; icon: string }) => {
    return (
        <div className="border border-gray-300 dark:border-gray-600 bg-base-300 text-center relative px-4 py-2 rounded-lg min-w-[140px]">
            <Link href={`/${type}?slugCategory=${name}`}>
                {icon?
                <Image
                    src={icon??null}
                    width={60}
                    height={60}
                    title={name}
                    alt={name}
                    className="mx-auto max-h-14 max-w-14"
                />:""}
                <h2 className="mt-2 text-xs font-semibold text-gray-700 dark:text-base-content leading-tight overflow-visible">
                    {name}
                </h2>
            </Link>
        </div>
    );
};

export default Category;
