import React from 'react';
import Link from "next/link";
import "./(main)/globals.scss";
import "./(main)/config.css";
import localFont from "next/font/local";
import {FaArrowLeft} from "react-icons/fa";
const bYekan = localFont({
    src: [
        { path: "../fonts/YekanBakhFaNum-Regular.woff", weight: "400", style: "normal" },
        { path: "../fonts/YekanBakhFaNum-Bold.woff", weight: "700", style: "normal" },
    ],
    variable: "--font-bYekan",
    display: "swap",
});
const NotFound = () => {
    return (
        <div className={`${bYekan.variable} rtl font-sans`}>
            <div
                className=" from-background to-secondary/10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4">
                <div className="w-full max-w-3xl space-y-8">
                    <div
                        className="bg-primary/5 border-primary/10 relative flex h-64 sm:h-80 items-center justify-center overflow-hidden rounded-lg border">
                        <div className="relative z-10 text-center">
                            <div className="text-primary mb-4 text-8xl font-black tracking-tighter sm:text-9xl">404
                            </div>
                            <div className="text-foreground text-xl font-medium sm:text-2xl">صفحه مورد نظر یافت نشد.
                            </div>
                        </div>
                        <div
                            className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href="/"
                            className="btn btn-primary"
                        >
                            بازگشت به صفحه اصلی
                            <FaArrowLeft />

                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NotFound;
