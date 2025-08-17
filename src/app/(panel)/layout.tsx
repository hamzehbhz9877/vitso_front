// PanelLayout.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "../(main)/globals.scss";
import "./panel.css";
import "../../styles/_keyframe-animations.scss";
import "../../styles/_variables.scss";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/get-query-client";
import ClientReactQueryProvider from "@/utils/reactQueryProvider-client";
import ToastProvider from "@/utils/react-toastify-client";
import ModalContext from "@/context/modal";
import Auth from "@/context/authentication";
import localFont from "next/font/local";
import ToggleDarkMode from "@/app/(panel)/_components/toggleDarkMode";
import { Separator } from "@/components/ui/separator";
import { CommandDialogDemo } from "@/app/(panel)/_components/generalSearch";
import User from "@/app/(panel)/_components/user";
import * as React from "react";

const bYekan = localFont({
    src: [
        { path: "../../fonts/YekanBakhFaNum-Regular.woff", weight: "400", style: "normal" },
        { path: "../../fonts/YekanBakhFaNum-Bold.woff", weight: "700", style: "normal" },
    ],
    variable: "--font-bYekan",
    display: "swap",
});

export default function PanelLayout({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <html dir="rtl" lang="fa-IR" suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
        (function() {
          try {
            var COOKIE_KEY = "theme";
            function getCookieTheme() {
              var match = document.cookie.match(new RegExp("(^| )" + COOKIE_KEY + "=([^;]+)"));
              return match ? match[2] : null;
            }
            function getSystemTheme() {
              var hour = new Date().getHours();
              return (hour >= 20 || hour < 6) ? "dark" : "light";
            }
            var theme = getCookieTheme() || getSystemTheme();
            document.documentElement.classList.remove("light","dark");
            document.documentElement.classList.add(theme);
            document.documentElement.setAttribute("data-theme", theme);
          } catch(e) {}
        })();
      `,
                }}
            />
        </head>
        <body className={`${bYekan.variable} rtl main font-sans panel`}>
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
                                            className="bg-background/40 justify-between sticky top-0 z-50
                          flex h-(--header-height) shrink-0 items-center gap-2 px-3
                          border-b backdrop-blur-md transition-[width,height]
                          ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
                          md:rounded-tl-xl md:rounded-tr-xl"
                                        >
                                            <div className="flex items-center gap-2">
                                                <SidebarTrigger/>
                                                <Separator orientation="vertical" className="mx-2 h-4"/>
                                                <CommandDialogDemo/>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <ToggleDarkMode/>
                                                <Separator orientation="vertical" className="mx-2 h-4"/>
                                                <User/>
                                            </div>
                                        </header>
                                        <div className="gap-2 p-4 rounded-lg">{children}</div>
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
    );
}
