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
import {sidebarItems} from "@/layout/panel/sidebar-items";



export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} side={"right"}>
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
