import React from 'react';
import Image from "next/image";
import { Clock4, RefreshCcw, UserRound } from "lucide-react";
import Link from "next/link";

const CourseCardRowStyle = ({
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
            className="card shadow-sm rounded-[10px] overflow-hidden bg-base-100
             flex flex-row items-stretch lg:flex-col max-w-full lg:max-w-[300px]"
        >
            <Link
                href={`/course/${slug}`}
                className="flex flex-row lg:flex-col w-full"
            >
                {/* تصویر */}
                <figure
                    className="relative w-[130px] h-auto lg:w-full lg:aspect-[16/9] flex-shrink-0 self-stretch bg-base-100"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 300px"
                        className="object-contain p-1"
                        priority={true}
                    />
                </figure>

                {/* محتوای کارت */}
                <div
                    className="card-body bg-base-300 py-2 px-3 flex flex-col justify-between flex-1 min-w-0 lg:py-[15px] lg:px-[12px]"
                >
                    <div>
                        <div className="gap-1 flex flex-wrap items-center text-[11px] lg:text-sm">
                            <div className="badge badge-soft badge-primary">{level}</div>
                            <div
                                className="badge badge-soft badge-primary tooltip px-1 flex"
                                data-tip={status}
                            >
                                {status === "در حال آماده سازی" ? (
                                    <svg
                                        className="w-[14px] h-[14px]"
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
                                    <RefreshCcw size={14}/>
                                )}
                            </div>
                        </div>

                        <h2 className="card-title text-[13px] line-clamp-1 relative pr-2 mt-1">
                            <span
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-[4px] h-[4px] bg-c-primary rounded-full"></span>
                            {title}
                        </h2>

                        <div className="card-actions justify-start mt-1 text-zinc-500 gap-2 text-[11px] lg:text-sm">
                            <div className="flex gap-1 items-center">
                                <UserRound size={13}/>
                                {author}
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-600 my-1"/>

                    <div className="card-actions justify-between items-center text-zinc-500 text-[11px] lg:text-sm">
                        {isFilterPage ? "" : (
                            <div className="hidden lg:flex gap-1 items-center">
                                <UserRound size={13}/>2451
                            </div>
                        )}

                        <div className="flex items-center gap-x-2 flex-wrap justify-end w-full">
                            {/* تاریخ - فقط موبایل */}
                            <div className="flex gap-1 items-center order-2 lg:order-1 lg:hidden">
                                <Clock4 size={13}/>
                                {time}
                            </div>

                            {/* قیمت */}
                            {discountPercentage ? (
                                <>
                                    <div className="text-[11px] p-1 rounded bg-c-primary text-white order-1 lg:order-2">
                                        {discountPercentage}%
                                    </div>
                                    <div className="flex flex-col order-3 lg:order-3">
                    <span className="text-[11px] text-slate-500 dark:text-white/70 line-through -mb-0.5">
                      {price}
                    </span>
                                        <span className="text-c-primary text-[13px] whitespace-nowrap">
                      {payablePrice} <span className="text-[11px]">تومان</span>
                    </span>
                                    </div>
                                </>
                            ) : (
                                <span className="text-c-primary text-[13px] whitespace-nowrap order-3">
                  {payablePrice} <span className="text-[11px]">تومان</span>
                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCardRowStyle;
