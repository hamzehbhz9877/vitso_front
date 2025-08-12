import React from 'react';
import Link from "next/link";
import {cn} from "@/lib/utils";

const BreadCrumb = ({data}:{data:{url:string,title:string}[]}) => {
    return (
        <div className="breadcrumbs text-sm my-3 bg-base-300 w-full px-4 py-3 rounded-lg">
            <ul>
                <li><Link href={"/"}>خانه</Link></li>
                {data.map((links, index) => (
                    <li key={index}>{data.length-1===index?<strong className={cn(data.length-1===index&&"opacity-50 !no-underline")}>{links.title}</strong>:<Link href={links.url}>{links.title}</Link>}</li>
                ))}
            </ul>
        </div>
    );
};

export default BreadCrumb;