'use client';
import React, { useRef, useEffect } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

interface NavbarDropDownProps {
    data: any[];
    type: 'articles' | 'courses';
    closeDropdown: () => void; // تابع برای بستن منو
}

const NavbarDropDown = ({ data, type, closeDropdown }: NavbarDropDownProps) => {
    const dropdownRef = useRef<HTMLUListElement>(null);

    // جلوگیری از بسته شدن وقتی روی خود منو کلیک می‌کنیم
    useEffect(() => {
        const handleClickInside = (event: MouseEvent) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
                event.stopPropagation();
            }
        };
        dropdownRef.current?.addEventListener('click', handleClickInside);
        return () => dropdownRef.current?.removeEventListener('click', handleClickInside);
    }, []);

    return (
        <ul
            ref={dropdownRef}
            tabIndex={0}
            className="dropdown-content menu relative p-0 bg-white dark:bg-base-200 top-2 z-[1] w-52 text-sm rounded-l hover:rounded-l-none rounded-r shadow"
        >
            {data.map((d) => (
                <li key={d.id} className={`static group ${d.subCategories.length > 0 ? "has-submenu" : ""}`}>
                    <Link
                        href={`/${type}?slugCategory=${d.slug}`}
                        onClick={closeDropdown}
                        className="flex items-center justify-between py-2.5 pr-3 pl-2.5 border-r-2 border-r-transparent bg-transparent text-base-content group-hover:bg-blue-100 dark:group-hover:bg-[#0a97d41a] group-hover:text-primary group-hover:border-r-primary transition-all"
                    >
                        <span className="flex gap-2 items-center">
                            {d.icon && <Image src={d.icon} alt={d.name} width={20} height={20} />}
                            {d.name}
                        </span>
                        {d.subCategories.length > 0 && <FaAngleLeft size={12} color="#777" />}
                    </Link>

                    {d.subCategories.length > 0 && (
                        <ul className="absolute submenu h-full rounded-l-[6px] border-r bg-white dark:bg-base-200 right-[calc(100%-16px)] top-0 p-0 hidden group-hover:block w-48 z-10 shadow">
                            {d.subCategories.map((sub) => (
                                <li key={sub.id} className="hover:text-primary">
                                    <Link
                                        href={`/${type}?slugCategory=${sub.slug}`}
                                        onClick={closeDropdown}
                                        className="bg-transparent shadow-none"
                                    >
                                        {sub.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavbarDropDown;
