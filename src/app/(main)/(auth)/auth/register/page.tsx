import Image from "next/image";


import LoginPlaceHolder from "../../../../../public/images/placeholder.svg"
import {RegisterForm} from "@/components/register-form";
import {Suspense} from "react";
import AuthImg from "@/app/(main)/(auth)/_components/authImg";

export default function RegisterPage() {
    return (
        <div className={"container"}>
            <div
                className="register max-w-full sm:max-w-[480px] mx-auto bg-base-300 pb-6 pt-10 px-8 rounded-lg my-10">
                <Suspense fallback={<div>Loading...</div>}>
                    <RegisterForm/>
                </Suspense>
            </div>
        </div>

    )
}
