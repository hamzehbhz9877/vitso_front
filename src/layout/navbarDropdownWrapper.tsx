'use client';
import React, {useState, useRef, useEffect, ReactNode} from 'react';
import NavbarDropDown from "@/app/_components/navbarDropDown";

interface NavbarDropdownWrapperProps {
    label: ReactNode; // متن یا آیکون دکمه
    type: 'articles' | 'courses';
    data: any[];
}

const NavbarDropdownWrapper = ({label, type, data}: NavbarDropdownWrapperProps) => {

    return (
        <div className="dropdown">
            <button
                className="btn dark:bg-base-200 m-1 flex items-center gap-2"
            >{label}
            </button>
   <NavbarDropDown
                    type={type}
                    data={data}
                />
        </div>
    );
};

export default NavbarDropdownWrapper;
