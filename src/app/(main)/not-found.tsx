import { FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import ErrorPage from "@/app/(main)/_components/errorPage";

export default function NotFound() {
    return (
        <ErrorPage
            code="404"
            message="صفحه مورد نظر یافت نشد."
            color="text-primary"
            action={
                <Link href="/" className="btn btn-primary">
                    بازگشت به صفحه اصلی
                    <FaArrowLeft />
                </Link>
            }
        />
    )
}
