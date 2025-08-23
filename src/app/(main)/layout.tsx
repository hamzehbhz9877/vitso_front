// app/layout.tsx یا RootLayout.tsx
import type { Metadata } from "next";
import "./globals.scss";
import "./config.css";
import "../../styles/_keyframe-animations.scss";
import "../../styles/_variables.scss";
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from "@/utils/get-query-client";
import ClientReactQueryProvider from "@/utils/reactQueryProvider-client";
import ToastProvider from "@/utils/react-toastify-client";
import ModalContext from "@/context/modal";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Auth from "@/context/authentication";

import localFont from "next/font/local";
import BodyScrollLock from "@/app/(main)/_components/overFlowScroll";
import * as React from "react";
import Providers from "@/utils/nprogress-client";

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


export const metadata: Metadata = {
    title: "ویتسو - آموزش برنامه نویسی",
    description: "ویتسو یک پلتفرم آموزشی تخصصی برای یادگیری برنامه‌نویسی از صفر تا پیشرفته است که با ارائه مقالات، دوره‌های ویدئویی و پروژه‌های عملی، به شما کمک می‌کند مهارت‌های لازم برای ورود به بازار کار برنامه‌نویسی را کسب کنید.",

    icons: {
        icon: [
            { url: '/logo.ico' }, // Path to your favicon.ico
            // { url: '/icon.png', type: 'image/png' }, // For other icon types
        ],
        // apple: [
        //     { url: '/apple-icon.png' }, // For Apple devices
        // ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
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
        <body className={`${bYekan.variable} rtl main font-sans`}>
        <ClientReactQueryProvider>
            <ToastProvider>
                <Auth>
                    <ModalContext>
                        <Providers>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <Header/>
                            {/*<BodyScrollLock/>*/}
                            <main>{children}</main>
                            <Footer/>
                        </HydrationBoundary>
                        </Providers>
                    </ModalContext>
                </Auth>
            </ToastProvider>
        </ClientReactQueryProvider>
        </body>
        </html>
    );
}
