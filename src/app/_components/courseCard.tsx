import React from 'react';
import Image from "next/image";
import { Clock4, RefreshCcw, UserRound } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CourseCard = ({
                        title,
                        image,
                        discountPercentage,
                        payablePrice,
                        level,
                        price,
                        time,
                        author,
                        slug,
                        status,
                        isFilterPage
                    }: Course & { isFilterPage?: boolean }) => {
    return (
        <div
            className={cn(
                "card carousel-item shadow-sm  overflow-hidden rounded-[10px]",
                isFilterPage ? "w-full" : "w-[270px] sm:w-auto"
            )}
        >
            <Link href={`/course/${slug}`}>
                <figure className="relative w-full aspect-[3/2] overflow-hidden">
                    <Image
                        src={image}
                        className="object-cover w-full h-full"
                        alt={title}
                        fill
                        priority
                    />
                </figure>
                <div className="card-body bg-base-300 py-[15px] px-[12px]">
                    <div className="gap-2 flex">
                        <div className="badge badge-soft badge-primary text-sm">{level}</div>
                        <div
                            className="badge badge-soft badge-primary tooltip px-[5px] flex"
                            data-tip={status}
                        >
                            {status === "در حال آماده سازی" ? (
                                <svg
                                    className="w-[18px] h-[18px]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                            ) : (
                                <RefreshCcw size={18}/>
                            )}
                        </div>
                    </div>

                    <h2 className="card-title text-sm line-clamp-1 relative pr-3">
                        <span
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-primary rounded-full"></span>
                        {title}
                    </h2>

                    <div className="card-actions justify-between mt-2 text-zinc-500">
                        <div className="flex gap-1 text-sm items-center">
                            <UserRound size={15}/>
                            {author}
                        </div>
                        <div className="flex gap-1 text-sm items-center">
                            <Clock4 size={15}/>
                            {time}
                        </div>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-600 my-[0px]"/>

                    <div className="card-actions justify-between items-center mt-2 text-zinc-500">
                        <div className="flex gap-1 text-sm">
                            <UserRound size={15}/>2451
                        </div>
                        <div className="flex gap-1 text-sm items-center">
                            <div className="flex items-center gap-x-2.5">
                                {discountPercentage ? (
                                    <>
                                        <div className="text-sm p-1 rounded bg-primary text-white">
                                            {discountPercentage}%
                                        </div>
                                        <div className="flex flex-col">
                      <span className="text-sm text-slate-500 dark:text-white/70 -mb-1.5 line-through">
                        {price}
                      </span>
                                            <span className="text-primary text-base sm:text-lg">
                        {payablePrice}{" "}
                                                <span className="text-sm sm:text-base">تومان</span>
                      </span>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-primary text-base sm:text-lg">
                    {payablePrice} <span className="text-sm sm:text-base">تومان</span>
                  </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;
