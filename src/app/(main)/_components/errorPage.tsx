import React from "react"
import Link from "next/link"

type ErrorPageProps = {
    code: string
    message: string
    color: string
    bg?: string
    action?: React.ReactNode
}

const ErrorPage = ({ code, message, color, bg, action }: ErrorPageProps) => {
    return (
        <div
            className={`py-10 flex-col w-full flex items-center justify-center bg-gradient-to-b ${bg ?? "from-background to-secondary/10"} border border-red-600/10`}
        >
            <div className="relative z-10 text-center">
                <div className={`${color} mb-4 text-8xl font-black tracking-tighter sm:text-9xl`}>
                    {code}
                </div>
                <div className="text-foreground text-xl font-medium sm:text-2xl">
                    {message}
                </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"></div>

            <div className="flex justify-center mt-10">{action}</div>
        </div>
    )
}

export default ErrorPage
