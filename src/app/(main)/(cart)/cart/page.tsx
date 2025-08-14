'use client'

import React from 'react';
import "./index.scss"
import Link from "next/link";
import {useMutation, useQuery} from "@tanstack/react-query";
import {RequestShoppingCart, RequestShoppingCartDeleteItem, RequestShoppingCartPay} from "@/services/ShoppingCart";
import Image from "next/image";
import {calculateDiscountPercentage, cn} from "@/lib/utils";
import {FiTrash2} from "react-icons/fi";
import { Wallet} from "@/services/Wallet";
import useAuth from "@/context/authentication/useAuth";

const Page = () => {

    const {data, refetch} = useQuery<ApiResponse<ShoppingCart>>({
        queryFn: RequestShoppingCart,
        queryKey: ["shoppingCart"],
    });

    const {mutate, isPending} = useMutation({
        mutationFn: RequestShoppingCartDeleteItem,
        onSettled: async (_, error) => {
            if (!error) {
                refetch()
            }
        }
    });

    const {mutate: mutatePay, isPending: isPendingPay} = useMutation({
        mutationFn: RequestShoppingCartPay, onSettled: async (data, error) => {
            if (!error) {
                window.location = data.data
            }
        }
    });

    const {user}=useAuth()

    const {data:UserWallet}=useQuery({
        queryFn:Wallet,
        queryKey:["wallet"],
        enabled:!!user
    });

    return (
        <div className={"cart-page container my-10"}>

            {data?.data.items.length === 0 ?
                <div className=" card w-full bg-base-100 card-md">
                    <div className="cart-empty-icon"></div>
                    <div className="card-body pt-0 text-center cart-empty-description flex-1">
                        <div className="">
                            <p className={"text-lg"}>
                                سبد خرید شما در حال حاضر خالی است.
                            </p>
                        </div>
                        <p>با جستجو در فروشگاه میتوانید محصولات مورد علاقه خود را به سبد خرید خود اضافه کنید.</p>
                        <p className={"mt-3"}>
                            <Link className="btn btn-primary" href="/">
                                بازگشت به فروشگاه </Link>
                        </p>
                    </div>
                </div> :
                <div className="flex flex-col md:flex-row items-start gap-3 px-3 xl:px-16">
                    <div className={"card w-full bg-base-100 card-md shadow-md border   p-3"}>
                        {data?.data.items.map((item, index) => (
                            <div key={index}>
                                <div className={"flex flex-col min-[550px]:flex-row gap-3"}>
                                    <Image
                                        className="rounded-xl w-full min-[550px]:w-[170px] h-auto object-contain"
                                        src={item.image}
                                        alt={item.name}
                                        width={170}
                                        height={170}
                                    />

                                    <div
                                        className={"flex flex-col gap-3 h-[-webkit-fill-available] flex-1 justify-between"}>
                                        <span className={"line-clamp-2 text-sm"}>{item.name}</span>
                                        <div className={"flex gap-2 text-base-content"}>
                                            <div className="flex w-full gap-1 justify-between items-center">
                                                <div className="flex items-center gap-2.5 text-nowrap">

                                                    {item.discountPercentage ?
                                                        <div className="text-xs p-1 rounded bg-primary text-white">
                                                            {item.discountPercentage}%
                                                        </div> : ""}
                                                    {item.discountPercentage ? <div className="flex flex-col">
                                        <span
                                            className="text-xs text-slate-500 dark:text-white/70 -mb-1.5 line-through">{item.price}</span>
                                                        <span className="text-primary">
                            {item.payablePrice} <span className=" text-xs">تومان</span>
                                        </span>
                                                    </div> : <span className="text-primary">
                            {item.payablePrice} <span className="text-xs">تومان</span>
                                        </span>}
                                                </div>
                                                <FiTrash2
                                                    className={cn("cursor-pointer", isPending && "opacity-20")}
                                                    size={19}
                                                    onClick={() => isPending ? () => {
                                                    } : mutate(item.itemId)}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {index === data.data.items.length - 1 ? "" :
                                    <hr className={"border-[#ABAFB320] my-[10px]"}/>}
                            </div>
                        ))}
                    </div>
                    <div className="card bg-base-100 card-md shadow-md border  p-3 w-full mx-auto min-[400px]:w-[330px]  lg:w-[480px]">
                        <div className="text-sm card-body p-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span>مبلغ کل</span>
                                <div>
                                    <span className="font-bold">{data?.data.payablePrice}</span>
                                    <span className="mr-1">تومان</span>
                                </div>
                            </div>

                            {+(data?.data.price.replaceAll("٬", "")) - +(data?.data.payablePrice.replaceAll("٬", "")) > 0 && (
                                <div className="flex text-red-500 items-center justify-between">
                                    <span>تخفیف</span>
                                    <div>
          <span className="font-bold">
            ({calculateDiscountPercentage(data?.data.price, data?.data.payablePrice)}%){" "}
              {(+(data?.data.price.replaceAll("٬", "")) -
                  +(data?.data.payablePrice.replaceAll("٬", ""))).toLocaleString("fa-IR")}
          </span>
                                        <span className="mr-1">تومان</span>
                                    </div>
                                </div>
                            )}

                            {user && (
                                <div className="flex items-center justify-between">
                                    <span>موجودی کیف پول</span>
                                    <div>
                                        <span className="font-bold">{UserWallet?.data.balance}</span>
                                        <span className="mr-1">تومان</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <hr className="border-[#ABAFB31] my-[10px]" />

                        {user ? (
                            <>
                                <div className="flex gap-2 items-center justify-between">
                                    <span>مجموع پرداختی:</span>
                                    <div>
          <span className="font-bold">
            {Math.max(
                0,
                +(data?.data.payablePrice.replaceAll("٬", "") || 0) -
                +(UserWallet?.data.balance.replaceAll("٬", "") || 0)
            ).toLocaleString("fa-IR")}
          </span>
                                        <span className="mr-1 text-sm">تومان</span>
                                    </div>
                                </div>
                                <button
                                    disabled={isPendingPay}
                                    className="btn btn-primary mt-4 w-full"
                                    onClick={() => mutatePay()}
                                >
                                    ادامه و پرداخت
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-sm mb-3">برای پرداخت از کیف پول ابتدا وارد حساب کاربری خود شوید.</p>
                                <Link href="/auth/login">
                                    <button className="btn btn-primary w-full">ورود به حساب کاربری</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>}
        </div>
    );
};

export default Page;