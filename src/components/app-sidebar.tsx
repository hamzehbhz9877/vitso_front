"use client"

import * as React from "react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {getSidebarItems} from "@/layout/panel/sidebar-items";
import useAuth from "@/context/authentication/useAuth";



export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

    const { user } = useAuth()
    const sidebarItems = getSidebarItems(user)
    return (
        <Sidebar collapsible="icon"  {...props} side={"right"}>
            <SidebarHeader>
                <NavUser user={sidebarItems.user}/>

                {/*<TeamSwitcher teams={sidebarItems.teams}/>*/}
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarItems.navMain}/>
                {/*<NavProjects projects={data.projects} />*/}
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
