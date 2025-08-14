'use client'

import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import SimpleInput from '@/components/input/simple'
import InputDemo from '@/components/input-12'
import {useMutation, useQuery} from '@tanstack/react-query'
import {ChangeProfileStudent, ProfileStudent} from '@/services/User'
import {objectToFormData} from "@/lib/utils"
import useAuth from "@/context/authentication/useAuth"
import {MdEdit, MdOutlineEditOff} from "react-icons/md";
import UploadImageCard from "@/components/input-daisy";

const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('نام الزامی است'),
    LastName: Yup.string().required('نام خانوادگی الزامی است'),
    UserName: Yup.string().required('نام کاربری الزامی است'),
})

const Page = () => {
    const {setUserCookie, user} = useAuth()

    const {mutate, isPending} = useMutation({
        mutationFn: ChangeProfileStudent,
        onSettled: (data, error) => {
            const {firstName,lastName,avatar,userName} = data.data
            if (!error) {
                setUserCookie({...user,fullName:firstName+" "+lastName,avatar,userName})
            }
        },
    })


    const {data:initialData}=useQuery({
        queryFn:ProfileStudent,
        queryKey:["ProfileStudent"]
    })

    const handleSubmit = (values) => {
        const data = objectToFormData(values)
        mutate(data)
    }

    return (
        <div className="user-account">
            <h2 className="text-xl font-bold mb-4 px-2">حساب کاربری</h2>

            {!initialData ? (
                // Skeleton while loading
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"/>
                </div>
            ) : (
                <Formik
                    initialValues={{
                        FirstName: initialData?.data.firstName ?? '',
                        LastName: initialData?.data.lastName ?? '',
                        UserName: initialData?.data.userName ?? '',
                        Phone: initialData?.data.phone ?? '',
                        Avatar: null,
                    }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => (
                        <Form>
                            <div className="flex gap-3 flex-col lg:flex-row">
                                <UploadImageCard
                                    defaultData={initialData?.data.avatar}
                                    name="Avatar"
                                    title={"تصویر کاربر"}
                                    onChange={(file) =>
                                        formikProps.setFieldValue('Avatar', file)
                                    }
                                />

                                <div className={"card bg-base-100 shadow-lg flex-1"}>
                                    <div className={"card-body"}>
                                        <h2 className="card-title">اطلاعات کاربر</h2>
                                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <SimpleInput label={
                                                <p className={"flex items-center gap-2"}>
                                                    <span>نام</span>
                                                    <MdEdit size={20} className={"text-primary"}/>
                                                </p>
                                            } name="FirstName" type="text"/>
                                            <SimpleInput label={
                                                <p className={"flex items-center gap-2"}>
                                                    <span>نام خانواگی</span>
                                                    <MdEdit size={20} className={"text-primary"}/>
                                                </p>
                                            } name="LastName" type="text"/>
                                            <SimpleInput label={
                                                <p className={"flex items-center gap-2"}>
                                                    <span>نام کاربری</span>
                                                    <MdEdit size={20} className={"text-primary"}/>
                                                </p>
                                            } name="UserName" type="text"/>
                                            <SimpleInput readOnly disabled label={
                                                <p className={"flex items-center gap-2"}>
                                                    <span>شماره همراه</span>
                                                    <MdOutlineEditOff size={20} className={"text-red-500"}/>
                                                </p>
                                            } name="Phone" type="text"/>
                                        </div>
                                        <div className={"card-footer"}>
                                            <div className="pt-9 text-center">
                                                <button
                                                    className="btn btn-primary"
                                                    type="submit"
                                                    disabled={isPending}
                                                >
                                                    ذخیره تغییرات
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>


                        </Form>
                    )}
                </Formik>
            )}
        </div>
    )
}

export default Page
