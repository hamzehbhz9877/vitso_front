'use client';

import React from 'react';
import Link from "next/link";
import {MdInsertChartOutlined, MdOutlineOndemandVideo} from "react-icons/md";
import {LuWallet} from "react-icons/lu";
import {TfiAngleLeft} from "react-icons/tfi";
import {usePathname} from "next/navigation";
import {FaRegCircleUser} from "react-icons/fa6";
import {RxExit} from "react-icons/rx";
import {LiaComments} from "react-icons/lia";
import {RiTodoLine} from "react-icons/ri";
import {FaDonate} from "react-icons/fa";
import {BiDonateHeart} from "react-icons/bi";


const SidebarBottom = () => {
    const items = [
        {
            title: 'داشبورد',
            url: "/profile",
            icon: <MdInsertChartOutlined size={21} color={"text-base-content"}/>
        },
        {
            title: 'حساب کاربری',
            url: "/profile/info",
            icon: <FaRegCircleUser size={21} color={"text-base-content"}/>
        },
        {
            title: 'دوره های من',
            url: "/profile/courses",
            icon: <MdOutlineOndemandVideo  size={21} color={"text-base-content"}/>
        },
        {
            title: 'فاکتور ها',
            url: "/profile/invoice",
            icon: <RiTodoLine size={21} color={"text-base-content"}/>
        },
        {
            title: 'کیف پول',
            url: "/profile/wallet",
            icon: <LuWallet size={21} color={"text-base-content"}/>
        },  {
            title: 'دونیت',
            url: "/profile/donation",
            icon: <BiDonateHeart  size={21} color={"text-base-content"}/>
        },
        {
            title: 'نظرات',
            url: "/profile/comments",
            icon: <LiaComments  size={21} color={"text-base-content"}/>
        },
        {
            title: 'خروج از حساب کاربری',
            url: "logout",
            icon: <RxExit size={21} color={"text-base-content"}/>
        }
    ]

    const pathname = usePathname()

    return (
        <div className="sideBar__bottom bg-base-300 rounded-xl">
            <ul>
                {items.map((item, index) => (
                    <Link key={item.title} href={item.url === "logout" ? "#" : item.url}
                          onClick={item.url === "logout" ? null : () => {
                          }}
                    >
                        <li
                            className={`${(index === 0 && pathname === "/profile") || (index > 0 && pathname.startsWith(item.url)) ? "active" : ""}`}>
                            <div className={"flex items-center gap-4"}>
                                <div className={`w-[16px] lg:w-[20px] !mr-[-23px] icon`}>
                                    {item.icon}
                                </div>

                               <div className={"title"}>{item.title}</div>
                            </div>
                            <TfiAngleLeft className={"icon font-[13px] lg:font-[14px]"}  color={pathname === "/" + item.url ? "#F04438" : "text-base-content"}/>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default SidebarBottom;