"use client"
import { useEffect } from "react"
import ErrorPage from "@/app/(main)/_components/errorPage";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ErrorPage
            code="500"
            message="خطای سمت سرور"
            color="text-red-600"
            bg="from-background to-red-500/5"
            action={
                <button className="btn btn-primary" onClick={() => reset()}>
                    تلاش مجدد
                </button>
            }
        />
    )
}
