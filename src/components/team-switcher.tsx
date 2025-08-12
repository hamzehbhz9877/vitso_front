"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }
}) {


  return (
      <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <teams.logo className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {teams.name}
                </span>
          <span className="truncate text-xs">{teams.plan}</span>
        </div>
        <ChevronsUpDown className="ml-auto" />
      </SidebarMenuButton>
  )
}
