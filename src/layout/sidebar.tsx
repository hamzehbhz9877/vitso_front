import React from 'react';
import {IoClose} from "react-icons/io5";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className="drawer">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay" />
                    <div className="min-h-full w-72 bg-base-200 text-base-content p-0">

                        {/* === Sidebar Header === */}
                        <div className="flex items-center justify-between p-4">
                            <span className="text-xl font-bold">ویتسو</span>
                            <label htmlFor="sidebar" className="btn btn-circle btn-error btn-soft">
                                <IoClose size={17}/>
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="divider h-[1px] m-0 px-3" />

                        {/* === Sidebar Menu === */}
                        <ul className="menu p-4 gap-4 w-full">
                            <li><a href="/courses">اطلاعات دوره‌ها</a></li>
                            <li><a href="/articles">مقاله‌ها</a></li>
                            <li><a href="/about">درباره ما</a></li>
                            <li><a href="/contact">تماس با ما</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
