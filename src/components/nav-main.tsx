"use client"

import {ChevronLeft} from "lucide-react"

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
import Link from "next/link";
import {usePathname} from "next/navigation";

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
  
  const pathname=usePathname()

  return (
    <SidebarGroup>
      {/*<SidebarGroupLabel>Platform</SidebarGroupLabel>*/}
      <SidebarMenu>
        {items.map((item) =>
            item.items?.length && item.items?.length>0?
            (<Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items.length>0 && item.items.map(d=>d.url.startsWith(pathname)).filter(d=>d).length>0 ?true: item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild >
                <SidebarMenuButton tooltip={item.title} >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronLeft className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ): <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton tooltip={item.title} >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>

                </SidebarMenuItem>)}
      </SidebarMenu>
    </SidebarGroup>
  )
}
