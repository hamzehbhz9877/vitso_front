'use client'

import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import SimpleInput from '@/components/input/simple'
import InputDemo from '@/components/input-12'
import {useMutation, useQuery} from '@tanstack/react-query'
import {ChangeProfileTeacher, ProfileTeacher} from '@/services/Teacher'
import {objectToFormData} from "@/lib/utils"
import useAuth from "@/context/authentication/useAuth"
import {MdEdit, MdOutlineEditOff} from "react-icons/md";
import UploadImageCard from "@/components/input-daisy";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import TextArea from "@/components/input/textArea";
import {Button} from "@/components/ui/button";

const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('نام الزامی است'),
    LastName: Yup.string().required('نام خانوادگی الزامی است'),
    UserName: Yup.string().required('نام کاربری الزامی است'),
})

const Profile = () => {
    const {setUserCookie, user} = useAuth()

    const {mutate, isPending} = useMutation({
        mutationFn: ChangeProfileTeacher,
        onSettled: (data, error) => {
            const {firstName,lastName,avatar,userName} = data.data
            if (!error) {
                setUserCookie({...user,fullName:firstName+" "+lastName,avatar,userName})
            }
        },
    })


    const {data:initialData}=useQuery({
        queryFn:ProfileTeacher,
        queryKey:["ProfileTeacher"]
    })

    const handleSubmit = (values) => {
        const data = objectToFormData(values)
        mutate(data)
    }

    return (
        <div className="user-account ">
                <Formik
                    initialValues={{
                        FirstName: initialData?.data.firstName ?? '',
                        LastName: initialData?.data.lastName ?? '',
                        UserName: initialData?.data.userName ?? '',
                        Phone: initialData?.data.phone ?? '',
                        Avatar: null,
                        Skill: initialData?.data.skill,
                        Degree:initialData?.data.degree,
                        AboutMe:initialData?.data.aboutMe,
                    }}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => (
                        <Form>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className={"flex-[35%] "}>
                                    <InputDemo
                                        defaultData={initialData?.data.avatar}
                                        name="Avatar"
                                        title={"تصویر مدرس"}
                                        onChange={(file) =>
                                            formikProps.setFieldValue('Avatar', file)
                                        }
                                    />
                                </div>

                                <div className={"flex-[65%] "}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                اطلاعات مدرس
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className={"space-y-4"}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                <SimpleInput label={
                                                    <p className={"flex items-center gap-2"}>
                                                        <span>مدرک تحصیلی</span>
                                                        <MdEdit size={20} className={"text-primary"}/>
                                                    </p>
                                                } name="Degree" type="text"/>
                                                <SimpleInput label={
                                                    <p className={"flex items-center gap-2"}>
                                                        <span>تخصص</span>
                                                        <MdEdit size={20} className={"text-primary"}/>
                                                    </p>
                                                } name="Skill" type="text"/>

                                                <SimpleInput readOnly disabled label={
                                                    <p className={"flex items-center gap-2"}>
                                                        <span>شماره همراه</span>
                                                        <MdOutlineEditOff size={20} className={"text-red-500"}/>
                                                    </p>
                                                } name="Phone" type="text"/>
                                            </div>
                                            <TextArea label={
                                                <p className={"flex items-center gap-2"}>
                                                    <span>درباره من</span>
                                                    <MdEdit size={20} className={"text-primary"}/>
                                                </p>
                                            } name="AboutMe"/>
                                           <div className={"text-center mt-5"}>
                                               <Button
                                                   type="submit"
                                                   disabled={isPending}
                                               >
                                                   ذخیره تغییرات
                                               </Button>
                                           </div>
                                        </CardContent>

                                    </Card>
                                </div>
                                </div>
                        </Form>
                    )}
                </Formik>
        </div>
    )
}

export default Profile
