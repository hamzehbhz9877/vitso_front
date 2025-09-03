'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaAngleRight} from "react-icons/fa6";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GetFaqAdmin, AddFaq, EditFaq} from "@/services/Faq";
import {GetEntityNames, GetPosition} from "@/services/Position";
import {useFAQStore} from "@/state/faq";
import SimpleInput from "@/components/input/simple";
import SelectWithCustomDropdownIconDemo from "@/components/input/select";
import TextArea from "@/components/input/textArea";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import FaqsQuestions from "@/app/(panel)/panel/faq/_components/faqsQuestions";
import {Skeleton} from "@/components/ui/skeleton";

const validationSchema = Yup.object({
    question: Yup.string().required("سوال الزامی است"),
    answer: Yup.string().required("پاسخ الزامی است"),
    entityName: Yup.string().required("نوع محتوا الزامی است"),
    priority: Yup.number()
        .nullable()
        .typeError("اولویت باید عدد باشد")
        .required("اولویت الزامی است"),
});

const FaqForm = ({mode, entityName = "Home", isPending: Loading}: {
    isPending?: boolean,
    entityName?: 'Course' | 'Article' | 'Home',
    mode: "add" | "edit"
}) => {
    const router = useRouter();
    const params = useParams();
    const queryClient = useQueryClient();

    const {addFAQ, faqs, setFAQs} = useFAQStore();

    // واکشی entityNames
    const {data: entityNames} = useQuery({
        queryKey: ["GetEntityNames"],
        queryFn: GetEntityNames,
    });

    // فقط در حالت edit داده FAQ را از سرور می‌گیریم
    const {data: faq, isLoading: faqLoading} = useQuery({
        queryKey: ["GetFaqAdmin", params?.id],
        queryFn: () => GetFaqAdmin(params?.id),
        enabled: mode === "edit" && entityName === "Home" && !!params?.id,
    });

    useEffect(() => {
        if (mode === "edit" && entityName === "Home" && faq?.data) {
            setFAQs(faq.data.listFaq);
        }

        return ()=>{
            setFAQs([])
        }
    }, [faq, mode, setFAQs]);

    // نوع mutate بر اساس mode
    const mutationFn = mode === "edit" ? EditFaq : AddFaq;

    const {mutate, isPending} = useMutation({
        mutationFn,
        onSettled: (_, error) => {
            if (!error) {
                // queryClient.invalidateQueries({queryKey: ["faqs"]});
                // if (mode === "add") {
                //     setFAQs([]);
                // }
            }
        },
    });

    const initialValues = {
        entityName,
        question: "",
        answer: "",
        priority: null,
    };

    const handleSubmit = (values, formikHelpers) => {
        const {priority, question, answer} = values;
        addFAQ({priority, question, answer});
        formikHelpers.resetForm({
            values: {
                ...initialValues,
            },
        });
    };

    const handleSubmitValues = () => {
        const data = {
            entityName: entityName === "Home" ? 0 : entityName === "Article" ? 1 : 2,
            listFaq: faqs,
            ...(entityName !== "Home" && {entityId: params?.id}), // اگر لازمه id رو بفرستیم تو ویرایش
        };
        const withPosition=entityName==="Home"?{...data,position:0}:data
        mutate( withPosition);
    };

    return (
        <div className="container mx-auto">

            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight/>
                </Button>
                {
                    Loading ? <Skeleton className="h-9 w-1/4"/> :

                        <h2 className="text-xl font-bold lg:text-2xl">
                            {mode === "edit" ? "ویرایش سوالات متداول" : "افزودن سوالات متداول"}
                        </h2>}
            </div>
            {Loading || faqLoading ?
                <div className="space-y-4 container">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-[35%] space-y-4">
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-1/2"/>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-10 w-full"/>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex-[65%] min-w-0 space-y-3">
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-1/3"/>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-10 w-full"/>
                                    <Skeleton className="h-10 w-full"/>
                                    <Skeleton className="h-24 w-full"/>
                                    <div className="flex justify-center mt-5">
                                        <Skeleton className="h-10 w-32"/>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Card className="text-center mt-5">
                        <CardContent className="space-y-4 p-6">
                            <Skeleton className="h-6 w-1/2 mx-auto"/>
                            <Skeleton className="h-10 w-40 mx-auto"/>
                        </CardContent>
                    </Card>
                </div> :
                <>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true} // برای ریست مقدارها وقتی entityName تغییر کنه
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {(formikProps) => (
                            <Form className="space-y-4">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-[35%] space-y-4">
                                        <Card>
                                            <CardHeader>
                                                <h3 className="font-bold">موقعیت</h3>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <SelectWithCustomDropdownIconDemo
                                                    label="نوع محتوا"
                                                    disabled
                                                    value={formikProps.values.entityName}
                                                    formikProps={formikProps}
                                                    name="entityName"
                                                    options={
                                                        entityNames?.data
                                                            ? entityNames.data.map((d) => ({
                                                                value: d.name,
                                                                label: d.displayName,
                                                            }))
                                                            : []
                                                    }
                                                    onChange={(data) => {
                                                        formikProps.setFieldValue("entityName", data);
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="flex-[65%] min-w-0 space-y-3">
                                        <Card>
                                            <CardHeader>
                                                <h3 className="font-bold">محتوا</h3>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <SimpleInput type="number" label="اولویت" name="priority"/>
                                                    <SimpleInput type="text" label="سوال" name="question"/>
                                                    <TextArea rows={3} label="جواب" name="answer"/>
                                                </div>
                                                <div>
                                                    <div className="flex justify-center mt-5">
                                                        <Button
                                                            isPending={isPending}
                                                            type="submit"
                                                            disabled={isPending}
                                                            variant="default"
                                                        >
                                                            {mode === "edit" ? "افزودن" : "افزودن"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <Card className="text-center mt-5">
                        <CardHeader>
                            <h3 className="font-bold">سوالات</h3>
                        </CardHeader>
                        <CardContent>
                            {faqs.length > 0 ? (
                                <>
                                    <FaqsQuestions/>
                                    <div className="flex justify-center mt-5">
                                        <Button
                                            onClick={handleSubmitValues}
                                            isPending={isPending}
                                            type="button"
                                            disabled={isPending}
                                            variant="default"
                                        >
                                            {mode === "edit" ? "ویرایش اطلاعات" : "ثبت اطلاعات"}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 py-6">هیچ سوالی ثبت نشده است</p>
                            )}
                        </CardContent>
                    </Card>
                </>
            }
        </div>
    );
};

export default FaqForm;
