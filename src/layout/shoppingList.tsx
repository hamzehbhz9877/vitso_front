'use client'

import React, {useState, useRef, useEffect} from 'react';
import {ShoppingBag, ShoppingCart} from "lucide-react";
import Image from "next/image";
import {useMutation, useQuery} from "@tanstack/react-query";
import {RequestShoppingCart, RequestShoppingCartDeleteItem} from "@/services/ShoppingCart";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {IoClose} from "react-icons/io5";

const ShoppingList = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {data, refetch} = useQuery<ApiResponse<ShoppingCart>>({
        queryFn: RequestShoppingCart,
        queryKey: ["shoppingCart"],
    });

    const {mutate, isPending} = useMutation({
        mutationFn: RequestShoppingCartDeleteItem,
        onSettled: (_, error) => {
            if (!error) refetch();
        }
    });

    // بستن منو وقتی بیرون کلیک شد
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // تابع واحد برای بستن منو و اجرای اکشن
    const handleItemClick = (callback?: () => void) => {
        setOpen(false); // بستن منو
        callback?.();   // اجرای اکشن بعد از بستن
    };

    return (
        <div ref={dropdownRef}
             className={cn("dropdown dropdown-end dropdown-full static sm:relative", {"dropdown-open": open})}>
            <div tabIndex={0}>
                <button aria-label={"shopping-list"}
                        className="btn btn-circle btn-primary btn-soft relative"
                        onClick={() => setOpen(!open)}
                >
                    <ShoppingBag/>
                    <span
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                        {data?.data.count ?? 0}
                    </span>
                </button>
            </div>

            <div
                tabIndex={0}
                className="dropdown-content mt-[20px] card card-sm bg-base-300 z-10 w-[91%] flex justify-center mx-[20px] sm:w-96 shadow-md"
            >
                <div className="card-body text-sm p-0">
                    {/* Header */}
                    <div className="header-carter bg-primary rounded-t-lg py-1.5 px-2 flex justify-between">
                        <span>تعداد دوره‌ها</span>
                        <span className="em-plus cart-counter">{data?.data.count}</span>
                    </div>

                    {/* Items */}
                    {data?.data.items.length > 0 ? (
                        <div className="p-2">
                            {data?.data.items.map((item, index) => (
                                <div key={index}>
                                    <div className="flex gap-2">
                                        {/* Image + Remove */}
                                        <div className="relative">
                                            <Image
                                                className="rounded-xl w-30 h-20 sm:w-[130px] aspect-auto object-cover"
                                                src={item.image}
                                                alt={item.name}
                                                width={130}
                                                height={130}
                                            />
                                            <IoClose
                                                className={cn(
                                                    "absolute -top-1 -right-1 border border-red-500 bg-white rounded-full text-red-500 cursor-pointer",
                                                    isPending && "opacity-20"
                                                )}
                                                size={21}
                                                onClick={() => !isPending && handleItemClick(() => mutate(item.itemId))}
                                            />
                                        </div>

                                        {/* Text */}
                                        <div
                                            className="flex flex-col gap-1 text-xs sm:gap-2 justify-between flex-1">
                                            <span className="line-clamp-2 leading-5">{item.name}</span>
                                            <div className="flex gap-2 text-base-content">
                                                <div className="flex items-center gap-x-2.5">
                                                    {+item.price === 0 ? <span
                                                            className="text-primary text-base sm:text-lg">رایگان</span> :
                                                        <>
                                                            {
                                                                item.discountPercentage>0 && (
                                                                    <div
                                                                        className="text-xs p-1 rounded bg-primary text-white">
                                                                        {item.discountPercentage}%
                                                                    </div>
                                                                )}
                                                            {item.discountPercentage>0 ? (
                                                                <div className="flex flex-col">
                                                            <span
                                                                className="text-xs text-slate-500 dark:text-white/70 line-through">
                                                                {item.price}
                                                            </span>
                                                                    <span className="text-primary text-sm">
                                                                {item.payablePrice} <span
                                                                        className="text-xs">تومان</span>
                                                            </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-primary text-sm">
                                                            {item.payablePrice} <span className="text-xs">تومان</span>
                                                        </span>
                                                            )
                                                            }
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {index !== data.data.items.length - 1 && (
                                        <hr className="border-[#ABAFB320] my-2 sm:my-[10px]"/>
                                    )}
                                </div>
                            ))}

                            {/* Footer */}
                            <>
                                <hr className="border-[#ABAFB31] my-2 sm:my-[10px]"/>
                                <div className="p-2 sm:p-4">
                                    <div className="flex gap-2 items-center justify-between">
                                        <span>مبلغ قابل پرداخت</span>
                                        <div>
                                            <span className="font-bold">{data?.data.payablePrice}</span>
                                            <span className="mr-1">تومان</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            (document.activeElement as HTMLElement)?.blur(); // بستن dropdown
                                            router.push("/cart"); // رفتن به صفحه سبد خرید
                                        }} className="btn btn-primary mx-auto mt-3 w-full"
                                    >
                                        مشاهده سبد خرید
                                    </button>
                                </div>
                            </>
                        </div>
                    ) : (
                        <div className="p-6 flex flex-col items-center text-center">
                            <div
                                className="w-20 h-20 flex items-center justify-center rounded-full bg-base-200 text-base-content">
                                <ShoppingCart size={36} strokeWidth={1.5}/>
                            </div>
                            <p className="mt-3 text-sm">هیچ دوره ای در سبد خرید نیست.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;
