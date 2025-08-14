'use client'

import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { getSidebarItems } from "@/layout/panel/sidebar-items"
import useAuth from "@/context/authentication/useAuth";

export default function BreadcrumbNav() {
    const pathname = usePathname()
    const { user } = useAuth()
    const sidebarItems = getSidebarItems(user)
    if (!Array.isArray(sidebarItems.navMain)) return null

    const activeMain = sidebarItems.navMain.find((main) => {
        if (main.url && main.url !== '#' && pathname.startsWith(main.url)) {
            return true
        }
        if (Array.isArray(main.items)) {
            return main.items.some((item) => pathname.startsWith(item.url))
        }
        return false
    })

    const activeSub = activeMain?.items?.find((item) =>
        pathname.startsWith(item.url)
    )

    // ❗ اگر مسیر دقیقاً خود داشبورد بود، فقط همون آیتم رو نشون بده
    const isDashboard = pathname === '/panel/dashboard'

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/(panel)/panel.css/dashboard">داشبورد</BreadcrumbLink>
                </BreadcrumbItem>

                {!isDashboard && activeMain && (
                    <>
                        <BreadcrumbSeparator />
                        {!activeSub ? (
                            <BreadcrumbItem>
                                <BreadcrumbPage>{activeMain.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={activeSub.url}>
                                        {activeMain.title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{activeSub.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
