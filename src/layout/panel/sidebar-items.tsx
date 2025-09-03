import {
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
} from "lucide-react"
import {FaChalkboardTeacher, FaRegImages, FaUsers, FaUserTie} from "react-icons/fa";
import {TbCategory} from "react-icons/tb";
import {MdOutlineArticle, MdOutlineContactPhone, MdOutlineSpaceDashboard} from "react-icons/md";
import {RiTodoLine} from "react-icons/ri";
import {LiaComments} from "react-icons/lia";
import {BiDonateHeart} from "react-icons/bi";
import {PiSealQuestionFill} from "react-icons/pi";
import {BsInfoCircleFill} from "react-icons/bs";

export interface SidebarUser {
    fullName: string;
    userName: string;
    avatar?: string;
}

export function getSidebarItems(user: SidebarUser) {
    return {
        user: {
            name: user?.fullName,
            email: user?.userName,
            avatar: user?.avatar ?? "/avatars/shadcn.jpg",
        },
        teams: {
            name: "ویتسو",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        navMain: [
            {
                title: "داشبورد",
                url: "/panel/dashboard",
                icon: MdOutlineSpaceDashboard,
                isActive: false,
                roles:["مدیر"],
                items: []
            },
            {
                title: "حساب کابری",
                url: "/panel/info",
                icon: FaUserTie ,
                roles: ["مدرس","پشتیبان","نویسنده","مدیر"],
                isActive: false,
                items: []
            },
            {
                title: "کاربران",
                url: "/panel/users",
                icon: FaUsers,
                isActive: false,
                roles:["مدیر"],
                items: []
            },
            {
                title: "دسته بندی ها",
                url: "/panel/dashboard",
                icon: TbCategory,
                roles:["مدیر"],
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
                icon: MdOutlineArticle,
                isActive: false,
                roles:["نویسنده","مدرس","مدیر"],
                items: []
            },
            {
                title: "دوره ها",
                url: "/panel/courses",
                roles:["مدرس","مدیر"],
                icon: FaChalkboardTeacher,
                isActive: false,
                items: []
            },
            {
                title: "نظرات",
                url: "/panel/comments",
                icon: LiaComments,
                roles:["مدیر","پشتیبان"],
                isActive: false,
                items: []
            },
            {
                title: "سوالات متداول",
                url: "/panel/faq",
                icon: PiSealQuestionFill,
                isActive: false,
                roles:["مدیر"],
                items: []
            }, {
                title: "بنر ها",
                url: "/panel/banner",
                icon: FaRegImages,
                isActive: false,
                roles:["مدیر"],
                items: []
            },
            {
                title: "دونیت",
                url: "/panel/donation",
                icon: BiDonateHeart,
                isActive: false,
                roles:["مدیر","مدرس"],
                items: []
            },
            {
                title: "فاکتور ها",
                url: "/panel/invoice",
                icon: RiTodoLine,
                roles:["مدیر","مدرس"],
                isActive: false,
                items: []
            },
            {
                title: "ارتباط با ما",
                url: "/panel/contactus",
                roles:["مدیر"],
                icon: MdOutlineContactPhone,
                isActive: false,
                items: []
            },
            {
                title: "درباره ما",
                url: "/panel/about-us",
                icon: BsInfoCircleFill,
                roles:["مدیر"],
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
}
