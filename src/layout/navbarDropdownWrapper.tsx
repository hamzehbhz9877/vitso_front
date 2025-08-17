// NavbarDropdownWrapper.tsx
'use client';
import React from 'react';
import NavbarDropDown from "@/app/_components/navbarDropDown";
import { cn } from "@/lib/utils";

interface NavbarDropdownWrapperProps {
    label: React.ReactNode;
    type: 'articles' | 'courses';
    data: any[];
}

const NavbarDropdownWrapper = ({ label, type, data }: NavbarDropdownWrapperProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className={cn("dropdown", open ? "dropdown-open" : "dropdown-closed")}>
            <button
                onClick={() => setOpen(!open)}
                className="btn dark:bg-base-200 m-1 flex items-center gap-2"
            >
                {label}
            </button>
            <NavbarDropDown
                closeMenu={() => setOpen(false)}
                type={type}
                data={data}
                isOpen={open}  // اضافه کردن prop برای کنترل نمایش
            />
        </div>

    );
};

export default NavbarDropdownWrapper;
