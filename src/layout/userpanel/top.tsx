'use client';

import React, {useEffect, useState} from 'react';


import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {Wallet} from "@/services/Wallet";
import useAuth from "@/context/authentication/useAuth";

const SideBarTop = () => {


    const {data} = useQuery({
        queryFn: Wallet,
        queryKey: ["wallet"]
    });

    const {user} = useAuth()


    return (
        <div className="sideBar__top bg-base-300">
            <div className="user">
                <div className="profile">
                    {!user ? (
                        <div className="skeleton w-24 h-24 shrink-0 rounded-full"></div>
                    ) : (
                        <Image
                            src={user?.avatar ? `${user.avatar}?t=${Date.now()}` : null}
                            alt="userAvatar"
                            width={88}
                            height={88}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    )}
                    <div className={"w-full"}>
                        {!user ?
                            <div className={"flex flex-col gap-[10px]"}>
                                <div className={"h-[16px] w-[70%] skeleton bg-base-100 rounded-[20px]"}></div>
                                <div className={"h-[16px] w-[50%] skeleton bg-base-100 rounded-[20px]"}></div>
                            </div> :
                            <>
                                <h3 className={"user__name"}>{user?.fullName}</h3>
                                <span className={"user__phone"}>{user?.userName}</span>
                            </>
                        }
                    </div>
                </div>
                <div className="user__wallet">
                    <span>موجودی کیف پول</span>
                    {<span
                        className={"px-[18px] py-[7px] bg-base-100 dark:bg-base-200 rounded-[20px]"}>{data?.data.balance ?? 0} تومان</span>}
                </div>
            </div>
            {/*<Link href={"/profile/info"} className={"text-base-content flex justify-end p-3 gap-1 text-sm mt-2 items-center"}>*/}
            {/*    پروفایل*/}
            {/*    <VscEye/>*/}
            {/*</Link>*/}
        </div>
    );
};

export default SideBarTop;