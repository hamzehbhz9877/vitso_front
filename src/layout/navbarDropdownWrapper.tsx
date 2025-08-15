'use client';
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import NavbarDropDown from "@/app/_components/navbarDropDown";

interface NavbarDropdownWrapperProps {
    label: ReactNode; // متن یا آیکون دکمه
    type: 'articles' | 'courses';
    data: any[];
}

const NavbarDropdownWrapper = ({ label, type, data }: NavbarDropdownWrapperProps) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // بستن منو وقتی کاربر خارج از آن کلیک می‌کند
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setOpen(prev => !prev);

    return (
        <div ref={wrapperRef} className="relative inline-block">
            <button
                className="btn dark:bg-base-200 m-1 flex items-center gap-2"
                onClick={toggleDropdown}
            >
                {label}
            </button>

            <div className={`${open ? 'block' : 'hidden'} absolute z-50`}>
                <NavbarDropDown
                    type={type}
                    data={data}
                    closeDropdown={() => setOpen(false)}
                />
            </div>
        </div>
    );
};

export default NavbarDropdownWrapper;
