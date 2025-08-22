"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles, User2,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {useMutation} from "@tanstack/react-query";
import {RequestLogout} from "@/services/Account";
import {useRouter} from "next/navigation";
import useAuth from "@/context/authentication/useAuth";

export function NavUser({
                            user,
                            inHeader=false,
                        }: {
    user: {
        name: string
        email: string
        avatar: string
    },
    inHeader?: boolean,
}) {
    const {isMobile} = useSidebar()


    const {resetUserCookie}=useAuth()
    const router = useRouter()


    const {mutate, isPending} = useMutation({
        mutationFn: RequestLogout,
        onSettled: async (_, error) => {
            if (!error) {
                resetUserCookie()
                router.replace("/auth/login")
            }
        }
    })

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {inHeader ? <Avatar className="h-8 w-8 rounded-full">
                                <AvatarImage src={`${user.avatar}?t=${Date.now()}` } alt={user.name}/>
                                <AvatarFallback className="rounded-full">CN</AvatarFallback>
                            </Avatar>:
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage src={`${user.avatar}?t=${Date.now()}` } alt={user.name}/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>


                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4"/>
                            </SidebarMenuButton>}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        style={{direction:"rtl"}}
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg "
                        side={isMobile || inHeader ? "bottom" : "right"}
                        align={inHeader?"start":"end"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarImage src={`${user.avatar}?t=${Date.now()}` } alt={user.name}/>
                                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-right text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup onClick={()=>router.push("/")}>
                            <DropdownMenuItem>
                                <Sparkles/>
                                ورود به صفحه اصلی
                            </DropdownMenuItem>
                        </DropdownMenuGroup> <DropdownMenuGroup onClick={()=>router.push("/profile")}>
                            <DropdownMenuItem>
                                <User2/>
                                ورود به صفحه پنل کاربری
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            {/*<DropdownMenuItem>*/}
                            {/*    <BadgeCheck/>*/}
                            {/*    Account*/}
                            {/*</DropdownMenuItem>*/}
                            {/*<DropdownMenuItem>*/}
                            {/*    <CreditCard/>*/}
                            {/*    Billing*/}
                            {/*</DropdownMenuItem>*/}
                            <DropdownMenuItem>
                                <Bell/>
                                اعلانات
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => mutate()} disabled={isPending}>
                            <LogOut/>
                            خروج از حساب کاربری
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
