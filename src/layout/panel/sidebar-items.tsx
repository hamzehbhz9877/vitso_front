'use client'

import {
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
} from "lucide-react"
import {FaChalkboardTeacher, FaUsers} from "react-icons/fa";
import {TbCategory} from "react-icons/tb";
import {MdOutlineArticle, MdOutlineContactPhone, MdOutlineSpaceDashboard} from "react-icons/md";
import {RiTodoLine} from "react-icons/ri";
import {LiaComments} from "react-icons/lia";
export const sidebarItems = {
    user: {
        name: "حمزه بهرامی",
        email: "hamzeh7798@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams:
        {
            name: "ویتسو",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        }
    ,
    navMain: [
        {
            title: "داشبورد",
            url: "/panel/dashboard",
            icon: MdOutlineSpaceDashboard,
            isActive: false,
            items: []
        },
        {
            title: "کاربران",
            url: "/panel/users",
            icon: FaUsers,
            isActive: false,
            items: []
        },
        {
            title: "دسته بندی ها",
            url: "/panel/dashboard",
            icon: TbCategory ,
            items: [
                {
                    title: "مقاله",
                    url: "/panel/category/article",
                },
                {
                    title: "ویدیو های آموزشی",
                    url: "/panel/category/course",
                },
            ],
        },
        {
            title: "مقاله ها",
            url: "/panel/article",
            icon: MdOutlineArticle ,
            isActive: false,
            items: []
        },   {
            title: "دوره ها",
            url: "/panel/courses",
            icon: FaChalkboardTeacher ,
            isActive: false,
            items: []
        }, {
            title: "نظرات",
            url: "/panel/comments",
            icon: LiaComments ,
            isActive: false,
            items: []
        }, {
            title: "فاکتور ها",
            url: "/panel/invoice",
            icon: RiTodoLine ,
            isActive: false,
            items: []
        }, {
            title: "ارتباط با ما",
            url: "/panel/contactus",
            icon: MdOutlineContactPhone  ,
            isActive: false,
            items: []
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}
