import React from 'react';
import Image from "next/image";
import NavbarDropDown from "@/app/_components/navbarDropDown";
import {AlignJustify, GraduationCap, Newspaper} from "lucide-react";
import {GetHomepageCategory} from "@/services/Home";
import ThemeToggle from "@/app/_components/theme";
import Search from "@/layout/search";

import "./index.scss"
import ShoppingList from "@/layout/shoppingList";
import User from "@/layout/user";
import Link from "next/link";
import Sidebar from "@/layout/sidebar";
import SearchInput from "@/layout/searchHeader";

const Header = async () => {

    const homepageCategory = await GetHomepageCategory();

    const courseCategories = homepageCategory?.data?.categoriesForCourse || [];
    const articleCategories = homepageCategory?.data?.categoriesForArticle || [];


    return (
        <div className="header relative py-[10px] z-10">

            <div className="container">
                <div className="navbar p-0 ">

                    <div className={"flex-1  lg:hidden flex items-center"}>
                        <Sidebar>
                            <label htmlFor="sidebar" className="drawer-button">
                                <a className={"btn btn-primary btn-soft btn-circle ml-2"}>
                                    <AlignJustify/>
                                </a>
                            </label>
                        </Sidebar>


                        {/*<a className={"btn btn-link px-0 "}>*/}
                            {/*<Image alt={"logo"} src={Logo} width={130} height={130}/>*/}
                        {/*</a>*/}
                    </div>
                    <div className="flex-1 hidden lg:block">
                    {/*<a className={"btn btn-link px-0 "}>*/}
                            {/*<Image alt={"logo"} src={Logo} width={130} height={130}/>*/}
                        {/*</a>*/}

                        <div className="dropdown dropdown-bottom dropdown-start">
                            <div tabIndex={0} role="button" className="btn  dark:bg-base-200 m-1">
                                <GraduationCap size={23}/>
                                دسته بندی دوره ها
                            </div>
                            <NavbarDropDown type={"courses"} data={courseCategories}/>
                        </div>

                        <div className="dropdown dropdown-bottom dropdown-start">
                            <div tabIndex={0} role="button" className="btn  dark:bg-base-200 m-1">
                                <Newspaper size={20}/>
                                دسته بندی مقاله ها
                            </div>
                            <NavbarDropDown  type={"articles"} data={articleCategories}/>
                        </div>

                        <a className="btn btn-link">درباره ما</a>

                        <Link href={"/contact-us"} className="btn btn-link mr-1">تماس با ما</Link>
                    </div>

                    <div className="flex-none flex items-center gap-4">
                        <SearchInput/>
                        <ThemeToggle/>
                        <ShoppingList/>
                        <User/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;