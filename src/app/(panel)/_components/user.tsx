'use client'

import React from 'react';
import {NavUser} from "@/components/nav-user";
import useAuth from "@/context/authentication/useAuth";
import {getSidebarItems} from "@/layout/panel/sidebar-items";

const User = () => {
    const { user } = useAuth()
    const sidebarItems = getSidebarItems(user)
    return (
        <div className={"group/sidebar"}>
            <NavUser user={sidebarItems.user} inHeader/>
        </div>
    );
};

export default User;