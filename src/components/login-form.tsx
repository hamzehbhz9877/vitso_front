'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, Form, Formik } from "formik"
import { initialValues, validationSchema } from "@/app/(auth)/auth/login/validation"
import SimpleInput from "@/components/input/simple"
import { FiUser } from "react-icons/fi"
import { HiOutlineKey } from "react-icons/hi"
import { TfiReload } from "react-icons/tfi"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"
import { GetCaptcha } from "@/services/Captcha"
import { RequestLogin } from "@/services/Account"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import useAuth from "@/context/authentication/useAuth"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [captcha, setCaptcha] = useState<string>("")
    const { setUserCookie } = useAuth()
    const router = useRouter()

    const { refetch, isRefetching } = useQuery({
        queryFn: async () => {
            const res:any = await GetCaptcha()
            // blob URL بساز
            const blobUrl = URL.createObjectURL(res)
            // قبلی رو آزاد کن
            setCaptcha((prev) => {
                if (prev) URL.revokeObjectURL(prev)
                return blobUrl
            })
            return res
        },
        queryKey: ['captcha'],
        placeholderData: keepPreviousData,
    })

    // Cleanup وقتی کامپوننت آن‌مونت می‌شود
    useEffect(() => {
        return () => {
            if (captcha) {
                URL.revokeObjectURL(captcha)
            }
        }
    }, [captcha])

    const { mutate, isPending,error } = useMutation({
        mutationFn: RequestLogin,
        onSettled: async (data, error) => {
            const {image,...rest} = data.data
            if (!error) {
                setUserCookie({avatar:image,...rest})

                if (data.data.roles.includes("مدیر")) router.replace("/")
                else router.push("/")
            }
            if (error) refetch()

        },
    })

    useEffect(()=>{
        if(error)
            refetch()
    },[error])

    const handleSubmit = (values: LoginRequest) => mutate({ ...values })

    return (
        <div>
            <div className="flex flex-col items-center gap-2 mb-6 text-center">
                <h1 className="text-2xl font-bold">ورود به حساب کاربری</h1>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                {() => {
                    return (
                        <Form className={cn("", className)} {...props}>
                            <>
                                <div className={"grid gap-[20px]"}>
                                    <SimpleInput icon={<FiUser />} name={"userName"} type={"text"} />
                                    <SimpleInput icon={<HiOutlineKey />} name={"password"} type={"password"} />
                                </div>

                                <div className="flex items-center justify-between gap-3 mt-5">
                                    <SimpleInput
                                        className={"!text-[12px]"}
                                        showError={false}
                                        placeholder={"کد امنیتی را وارد کنید"}
                                        name={"captcha"}
                                        type={"text"}
                                    />
                                    <div className={"flex items-center gap-2"}>
                                        <TfiReload className={"shrink-0"} size={17} cursor={"pointer"} onClick={() => refetch()} />
                                        {captcha ? (
                                            <Image
                                                width={100}
                                                height={40}
                                                className={`${isRefetching ? "opacity-50" : ""} w-[100px] h-[40px]`}
                                                src={captcha}
                                                alt={"captcha"}
                                            />
                                        ) : (
                                            <div className={"w-[100px] bg-[#f0f0f1] animate-pulse h-[40px]"}></div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center mb-4 mt-4">
                                    <Field name="rememberMe">
                                        {({ field, form, meta }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    className={"w-4 h-4"}
                                                    id="rememberMe"
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        form.setFieldValue(field.name, checked)
                                                    }}
                                                />
                                                <label htmlFor="rememberMe" className="text-sm">
                                                    مرا به خاطر بسپار
                                                </label>
                                                {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <button  type={"submit"} className="w-full btn btn-primary" disabled={isPending}>
                                    ورود
                                </button>

                                <p className={"text-center text-sm mt-2"}>
                                    حساب کاربری ندارید؟{" "}
                                    <Link href={"/auth/register"} className={"font-bold text-primary"}>
                                        ثبت نام کنید
                                    </Link>
                                </p>

                                <div className={"text-center pt-1"}>
                                    <small>نسخه: 0.2.0</small>
                                </div>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
