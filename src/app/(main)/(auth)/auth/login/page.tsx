import {LoginForm} from "@/components/login-form"
import Image from "next/image";


import LoginPlaceHolder from "../../../../../public/images/placeholder.svg"
import AuthImg from "@/app/(main)/(auth)/_components/authImg";

export default function LoginPage() {
    return (
        <div className={"container"}>
            <div className="login  max-w-full sm:max-w-[400px] mx-auto bg-base-300 pb-6 pt-10 px-8 rounded-lg my-10">
                <LoginForm/>
            </div>
        </div>
    )
}
