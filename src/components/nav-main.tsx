"use client"

import {ChevronLeft} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
                          items,
                        }: {
  items: {
    title: string
    url: string
    icon?: any
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  const isItemActive = (item: {url?: string; items?: {url: string}[]}) => {
    if (item.items && item.items.length > 0) {
      return item.items.some(sub => pathname.startsWith(sub.url))
    }
    return item.url === pathname
  }
  
  const activeDropDown=(data:string)=>{
    console.log(data)
   return pathname.startsWith(data)
  }

  return (
      <SidebarGroup>
        <SidebarMenu>
          {items.map((item) =>
              item.items && item.items.length > 0 ? (
                  <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={isItemActive(item) || item.isActive}
                      className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            tooltip={item.title}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronLeft className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                      asChild
                                      className={activeDropDown(subItem.url) ? "bg-primary hover:bg-primary hover:text-white text-white" : ""}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
              ) : (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url}>
                      <SidebarMenuButton
                          tooltip={item.title}
                          className={ activeDropDown(item.url) ? "bg-primary hover:bg-primary hover:text-white text-white" : ""}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
              )
          )}
        </SidebarMenu>
      </SidebarGroup>
  )
}
