import React from 'react';
import Image from "next/image";
import { Clock4, UserRound } from "lucide-react";
import { diffDays } from "@/lib/utils";
import Link from "next/link";

const ArticleCard = ({
                         title,
                         image,
                         author,
                         categoryName,
                         publishDate,
                         slug,
                         shortDescription,
                         isFilterPage=false
                     }: Article & { isFilterPage?: boolean }) => {

    return (
        <div
            className={`card carousel-item  shadow-sm ${!isFilterPage ? "w-[270px] sm:w-auto" : 'w-auto'}   overflow-hidden  rounded-[10px]`}>
            <figure className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 50vw,
       (max-width: 1280px) 33vw,
       (max-width: 1536px) 25vw,
       20vw"
                    style={{objectFit: "cover"}}
                    priority={true}
                />
            </figure>
            <Link href={`/article/${slug}`} className={"flex-1"}>
                <div className="card-body bg-base-200 py-[15px] px-[12px] rounded-b-[10px] h-full">
                    <div className="badge badge-soft badge-primary text-sm">
                        {categoryName ?? "دسته بندی"}
                    </div>

                    <h2 className="card-title text-sm line-clamp-2 relative pr-3">
                        <span
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-primary rounded-full"></span>
                        {title}
                    </h2>

                    <p className="line-clamp-3  text-sm mt-2">
                        {shortDescription}
                    </p>

                    <div className="card-actions justify-between text-zinc-500 mt-auto pt-3">
                        <div className="flex gap-1 text-sm items-center">
                            <UserRound size={15}/>
                            {author}
                        </div>
                        <div className="flex gap-1 text-sm items-center">
                            <Clock4 size={15}/>
                            {diffDays(publishDate) === "امروز" ? "امروز" : diffDays(publishDate) + " پیش"}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ArticleCard;
