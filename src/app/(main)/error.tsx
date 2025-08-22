"use client"
import { useEffect, useState } from "react"
import ErrorPage from "@/app/(main)/_components/errorPage";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.error(error)
    }, [error])

    const handleRetry = async () => {
        setIsLoading(true)
        try {
            await reset() // اگه reset async باشه
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ErrorPage
            code="500"
            message="خطای سمت سرور"
            color="text-red-600"
            bg="from-background to-red-500/5"
            action={
                <button
                    className="btn btn-primary flex items-center gap-2"
                    onClick={handleRetry}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                    )}
                    تلاش مجدد
                </button>
            }
        />
    )
}
