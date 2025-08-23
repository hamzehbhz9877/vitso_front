import React from 'react';
import Link from "next/link";

const Tags = ({data, type, title}: { type: string, data: Array<{ name:string,slug:string }>, title: string }) => {
    return (
        <div>
            <h3 className={"title-dore font-bold"}>{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {data.map((tag) => (
                    <Link key={tag.slug} href={type==="articles"||type==="courses"?`/${type}?slugCategory=${tag.slug}`:`/${type}?slug=${tag.slug}`}>
                        <div
                            className="bagde bg-base-300 rounded-box grid px-3 py-2 text-[14px]  place-items-center dark:bg-base-200">
                            {tag.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tags;