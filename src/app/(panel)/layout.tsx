import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import "../(main)/globals.scss"
import "./panel.scss"
import "../../styles/_keyframe-animations.scss"
import "../../styles/_variables.scss"
import {
    dehydrate,
    HydrationBoundary,
} from '@tanstack/react-query'
import {getQueryClient} from "@/utils/get-query-client";
import ClientReactQueryProvider from "@/utils/reactQueryProvider-client";
import ToastProvider from "@/utils/react-toastify-client";
import ModalContext from "@/context/modal";
import Auth from "@/context/authentication";
import localFont from "next/font/local";
const bYekan = localFont({
    src: [
        {
            path: "../../fonts/YekanBakhFaNum-Regular.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../fonts/YekanBakhFaNum-Bold.woff",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-bYekan",
    display: "swap",
});

export default function PanelLayout({children}: { children: React.ReactNode }) {
    const queryClient = getQueryClient()

    return (

        <html dir="rtl" lang="fa-IR" data-theme="mytheme">
        <body className={`${bYekan.variable} rtl main font-sans`} id={"my-app"}>

        <div className="flex min-h-screen">
            <ClientReactQueryProvider>
                <ToastProvider>
                    <Auth>
                        <ModalContext>
                            <HydrationBoundary state={dehydrate(queryClient)}>
                                <SidebarProvider>
                                    <AppSidebar/>
                                    <SidebarInset>
                                        <header
                                            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                            <div className="flex items-center gap-2 px-4">
                                                <SidebarTrigger className="-ml-1"/>
                                                {/*<Separator orientation="vertical" className="mr-2 h-4" />*/}
                                                {/*<BreadcrumbNav/>*/}
                                            </div>
                                        </header>
                                        <div className="gap-2 p-4  rounded-lg bg-neutral-100/50 ">

                                            {children}
                                        </div>
                                    </SidebarInset>
                                </SidebarProvider>
                            </HydrationBoundary>
                        </ModalContext>
                    </Auth>
                </ToastProvider>
            </ClientReactQueryProvider>
        </div>
        </body>
        </html>
    )
}