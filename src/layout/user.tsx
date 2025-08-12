'use client';

import React, { useEffect, useState } from 'react';
import useAuth from '@/context/authentication/useAuth';
import { CiLogin, CiUser } from 'react-icons/ci';
import Link from 'next/link';
import { FaAngleDown, FaUser, FaUserTie } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import { RequestLogout } from '@/services/Account';
import { LogOut } from 'lucide-react';
import Cookie from 'universal-cookie';
import {cn} from "@/lib/utils";

const User = () => {
    const { user, resetUserCookie } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { mutate, isPending } = useMutation({
        mutationFn: RequestLogout,
        onSettled: (_, error) => {
            if (!error) {
                resetUserCookie();
            }
        },
    });

    const baseButtonClass =
        'btn rounded-full lg:rounded-lg px-0 w-10 h-10 lg:w-40 md:h-10 btn-primary';

    if (loading) {
        return <div className={`skeleton rounded-full  md:rounded-lg ${baseButtonClass}`} />;
    }

    if (user?.fullName) {
        return (
            <div>
                <button
                    className={cn(baseButtonClass,)}
                    popoverTarget="popover-1"
                    disabled={isPending}
                    style={{ anchorName: '--anchor-1' } as React.CSSProperties}
                >
          <span className="md:hidden">
            <CiUser size={20} />
          </span>
                    <span className="hidden md:flex items-center gap-2">
            <CiUser size={20} />
            <span className="hidden lg:block max-w-[7rem] truncate">
              {user?.fullName}
            </span>
            <FaAngleDown className={"hidden lg:block"} />
          </span>
                </button>

                <ul
                    className="dropdown menu w-48 rounded-box bg-white dark:bg-base-200 shadow-md mt-2"
                    popover="auto"
                    id="popover-1"
                    style={{ positionAnchor: '--anchor-1' } as React.CSSProperties}
                >
                    {user?.roles?.includes('مدیر') && (
                        <li>
                            <Link href="/panel/users" className="text-xs">
                                <FaUserTie size={13} />
                                ورود به پنل ادمین
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href="/profile" className="text-xs">
                            <FaUser size={13} />
                            ورود به حساب کاربری
                        </Link>
                    </li>
                    <li>
                        <button
                            className="text-xs flex items-center gap-1 w-full"
                            onClick={() => mutate()}
                            disabled={isPending}
                        >
                            <LogOut size={13} />
                            خروج از حساب
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <Link href="/auth/login" className={baseButtonClass}>
      <span className="md:hidden">
        <CiLogin size={20} />
      </span>
            <span className="hidden md:flex items-center gap-2">
        <CiLogin size={20} />
        <span className="hidden lg:block">ورود/عضویت</span>
      </span>
        </Link>
    );
};

export default User;
