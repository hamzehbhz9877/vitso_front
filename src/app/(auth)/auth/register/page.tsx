import Image from "next/image";


import LoginPlaceHolder from "../../../../../public/images/placeholder.svg"
import {RegisterForm} from "@/components/register-form";
import {Suspense} from "react";

export default function RegisterPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                {/*<div className="flex justify-center gap-2 md:justify-start">*/}
                {/*  <a href="#" className="flex items-center gap-2 font-medium">*/}
                {/*    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">*/}
                {/*      <GalleryVerticalEnd className="size-4" />*/}
                {/*    </div>*/}
                {/*    Acme Inc.*/}
                {/*  </a>*/}
                {/*</div>*/}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <Suspense fallback={<div>Loading...</div>}>
                        <RegisterForm/>
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-neutral-100 lg:block dark:bg-neutral-800">
                <Image
                    width="400"
                    height="400"
                    src={LoginPlaceHolder}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
