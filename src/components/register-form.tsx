'use client'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import { Form, Formik, useFormikContext} from "formik";
import {initialValues, validationSchema} from "@/app/(main)/(auth)/auth/register/validation";
import SimpleInput from "@/components/input/simple";
import {FiPhone, FiUser} from "react-icons/fi";
import {HiOutlineKey} from "react-icons/hi";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { useMutation} from "@tanstack/react-query";
import {ConfirmPhone, RequestRegister} from "@/services/Account";
import Link from "next/link";
import {FaRegUserCircle} from "react-icons/fa";
import * as Yup from "yup";
const AutoSubmitToken = (): any => {
    const {values, submitForm}: any = useFormikContext();
    React.useEffect(() => {
        if (values.code?.toString().length === 6) {
            submitForm();
        }
    }, [values, submitForm]);
    return null;
};
export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentPropsWithoutRef<"form">) {

    const [code, setCode] = useState<boolean>(false)


    const router = useRouter()


    const query = useSearchParams()

    const {mutate:confirmPhoneMutate,isPending:confirmPhonePending} = useMutation({
        mutationFn: ConfirmPhone, onSettled: async (_, error) => {
            if (!error)
                router.replace("/")
        }
    });
    const {mutate, isPending} = useMutation({
        mutationFn: RequestRegister, onSettled: async (_, error, context) => {
            if (!error) {
                setCode(true)
                router.replace(`/auth/register?phone=${context?.phone}`)
            }
        }
    });


    const handleSubmit = (values: RegisterAccount) => mutate(values)

    const handleSubmitConfirmCode = (values: ConfirmCode) => confirmPhoneMutate({...values,code:values.code.toString()})

    return (
        <div>
            <div className="flex flex-col items-center gap-2 mb-6 text-center">


                {query.get("phone") || code ?
                    <div className="label w-full justify-between">
                        کد تایید را وارد کنید
                        <span className="phone-number" style={{direction: "ltr"}}>{
                            query.get("phone")?.slice(0, 4) + "***" + query.get("phone")?.slice(7)}</span>
                    </div> : <h1 className="text-2xl font-bold">ایجاد حساب کاربری</h1>}
            </div>
            {
                code || query.get("phone") ? <Formik
                        initialValues={{phone: query.get("phone"), code: ""}}
                        onSubmit={handleSubmitConfirmCode}
                        validationSchema={Yup.object({
                            code: Yup.string().min(5, "کد ارسالی 5 رقم میباشد").required("الزامی")
                    })}
                >
                    {() => {
                        return (
                            <Form>
                                <SimpleInput  onKeyPress={(e) => {
                                    const {value, maxLength}: any = e.target;
                                    if (String(value).length >= maxLength) {
                                        e.preventDefault();
                                        return;
                                    }
                                }} maxLength={6} className="text-center text-[18px] tracking-[11px]"
                                             placeholder={new Array(6).fill("-").join('')}
                                             type={'number'} label={''}
                                             name={"code"}/>
                                <AutoSubmitToken/>

                                <button  type={"submit"}
                                        className="w-full mt-4 btn btn-primary" disabled={confirmPhonePending}>
                                    ثبت نام
                                </button>
                            </Form>)
                    }}
                </Formik>:
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {() => {
                    return (
                        <Form className={cn("", className)} {...props}>
                            <>

                                <div
                                    className={"grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[20px] "}>
                                    <SimpleInput placeholder={"نام"} icon={<FiUser/>} name={"firstName"} type={"text"}/>
                                    <SimpleInput placeholder={"نام خانوادگی"} icon={<FiUser/>} name={"lastName"} type={"text"}/>
                                    <SimpleInput placeholder={"نام کاربری"} icon={<FaRegUserCircle/>} name={"userName"} type={"text"}/>
                                    <SimpleInput placeholder={"1232***0912"} icon={<FiPhone/>} name={"phone"} type={"text"}/>
                                    <SimpleInput placeholder={"پسورد"} icon={<HiOutlineKey/>} name={"password"} type={"password"}/>
                                    <SimpleInput placeholder={"تکرار پسورد"} icon={<HiOutlineKey/>} name={"confirmPassword"} type={"password"}/>
                                </div>

                                <button type={"submit"}
                                        className="w-full btn btn-primary" disabled={isPending}>
                                    دریافت کد
                                </button>

                                <p className={"text-center text-sm mt-2"}>حساب کاربری دارید؟ <Link href={"/auth/login"}
                                                                                              className={"font-bold text-primary"}>وارد
                                    شوید</Link></p>

                                <div className={"text-center pt-1"}>
                                    <small>
                                        نسخه: 0.2.0
                                    </small>
                                </div>
                            </>
                        </Form>
                    )
                }}
            </Formik>}
        </div>
    )
}
