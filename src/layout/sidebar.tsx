import React from 'react';
import {IoClose} from "react-icons/io5";
import Link from "next/link";

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
                            <label htmlFor="sidebar" className="btn btn-circle btn-primary btn-soft">
                                <IoClose size={17}/>
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="divider h-[1px] m-0 px-3" />

                        {/* === Sidebar Menu === */}
                        <ul className="menu p-4 gap-4 w-full">
                            <li><Link href="/courses"> دوره‌ها</Link></li>
                            <li><Link href="/articles">مقاله‌ها</Link></li>
                            <li><Link href="/about">درباره ما</Link></li>
                            <li><Link href="/contact-us">تماس با ما</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
