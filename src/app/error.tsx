'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import "./(main)/globals.scss";
import "./(main)/config.css";
import localFont from "next/font/local";

const bYekan = localFont({
    src: [
        { path: "../fonts/YekanBakhFaNum-Regular.woff", weight: "400", style: "normal" },
        { path: "../fonts/YekanBakhFaNum-Bold.woff", weight: "700", style: "normal" },
    ],
    variable: "--font-bYekan",
    display: "swap",
});
export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className={`${bYekan.variable} rtl font-sans `}>
            <div className={"from-background to-secondary/10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4"}>
                <div className={"w-full max-w-3xl space-y-8"}>
                    <div
                        className="relative flex  sm:h-80 items-center justify-center overflow-hidden rounded-lg border border-red-600/10 bg-red-500/5">
                        <div className="relative z-10 text-center">
                            <div className="mb-4 text-8xl sm:text-9xl font-black tracking-tighter text-red-600">500
                            </div>
                            <div className="text-xl sm:text-2xl font-medium text-foreground">خطای سرور</div>
                        </div>
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                    <div className={"text-center"}>
                        <button className="btn btn-primary"
                                onClick={
                                    // Attempt to recover by trying to re-render the segment
                                    () => reset()
                                }
                        >
                            مجدد تلاش کنید
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}
