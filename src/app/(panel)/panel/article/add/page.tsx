'use client'

import React, {useMemo} from 'react';
import {ErrorMessage, Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {Button} from "@/components/ui/button";
import {GetAllTagForSelect} from "@/services/Tag";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RegisterArticles} from "@/services/Article";
import InputDemo from "@/components/input-12";
import TextArea from "@/components/input/textArea";
import {GetAllForSelectCategory} from "@/services/Category";
import dynamic from "next/dynamic";
import {CalendarHijriInput} from "@/app/(panel)/_components/datepicker";
import {initialValues, validationSchema} from "@/app/(panel)/panel/article/validation";
import {convertDateToJalaliString, formatDate, objectToFormData, parseJalaliDateToDate} from "@/lib/utils";
import CustomCreatableSelect from "@/components/input/creatableSelect";
import MultiSelect from "@/components/input/multiSelect";
import {Card, CardHeader, CardContent, CardTitle} from "@/components/ui/card";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import useModal from "@/context/modal/useModal";

const Editor = dynamic(() => import('@/components/editor'), {ssr: false});

const Page = () => {
    const {closeModal} = useModal()
    const queryClient = useQueryClient();
    const today = useMemo(() => new Date(), []);

    const {mutate, isPending} = useMutation({
        mutationFn: RegisterArticles,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["articles"]});
                closeModal();
            }
        }
    });

    const router = useRouter();

    const handleSubmit = (values) => {
        const data = objectToFormData(values);
        mutate(data);
    };

    const {data: tags} = useQuery({
        queryFn: GetAllTagForSelect,
        queryKey: ["GetAllTagForSelect"]
    });

    const {data: category} = useQuery({
        queryFn: () => GetAllForSelectCategory(1),
        queryKey: ["GetAllCategoryForSelect", 1]
    });

    const cleanUrl = (process.env.NEXT_PUBLIC_HOST_ADDRESS || '').replace('/api', '');

    return (
        <div className="container mx-auto">

            <div className={"flex gap-2 items-center mb-3"}>
                <Button variant={"outline"} onClick={() => router.back()}>
                    <FaAngleRight/>
                </Button>
                <h2 className={"text-xl font-bold  lg:text-2xl"}>افزودن مقاله</h2>
            </div>

            <Formik
                initialValues={initialValues({date: formatDate(today)})}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return <Form className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">


                            {/* ستون راست: جزییات، تگ‌ها، سئو */}
                            <div className="flex-[35%] space-y-4">

                                <Card>
                                    <CardHeader>
                                        <CardTitle>جزییات مقاله</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput label="عنوان" name="Title" type="text"/>
                                        <MultiSelect
                                            isMulti={false}
                                            valueKey="id"
                                            labelKey="name"
                                            formikProps={formikProps}
                                            title="دسته بندی"
                                            name="CategoryId"
                                            data={category?.data}
                                        />
                                        <CalendarHijriInput
                                            label="تاریخ انتشار مقاله"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            onChange={(date) => formikProps.setFieldValue('PublishedAt', date)}
                                            initialDate={today}
                                            initValue={convertDateToJalaliString(today)}
                                            name={"PublishedAt"}
                                        />
                                        <CustomCreatableSelect
                                            name={"Tags"}
                                            valueKey="name"
                                            labelKey="name"
                                            onChange={(values) => formikProps.setFieldValue("Tags", values)}
                                            selectProps={{placeholder: "تگ ها را انتخاب یا وارد کنید"}}
                                            fieldLabel="تگ ها"
                                            showDropdown={true}
                                            data={tags?.data}
                                            formikProps={formikProps}
                                        />
                                    </CardContent>
                                </Card>

                                <div className="w-full">
                                    <InputDemo
                                        name={"Image"}
                                        title={"تصویر مقاله"}
                                        onChange={(file) => formikProps.setFieldValue("Image", file)}
                                    />
                                </div>
                            </div>
                            {/* ستون چپ: تصویر و محتوا */}
                            <div className="flex-[65%] space-y-3">

                                <Card>
                                    <CardHeader>
                                        <CardTitle>محتوا</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className={"mb-5"}>
                                            <Editor
                                                name={"Content"}
                                                uploadUrl="Upload/ImageArticleContent"
                                                getEditorData={(data, getText) => {
                                                    formikProps.setFieldValue('Content', getText !== "" ? data : "");
                                                }}
                                            />
                                            <ErrorMessage name={"Content"} className="validation-error"
                                                          component="div"/>
                                        </div>

                                        <TextArea rows={5} label="توضیحات کوتاه" name="ShortDescription"/>

                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>سئو</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput label="عنوان" name="MetaTitle" type="text"/>
                                        <SimpleInput prefix={cleanUrl + "/course/"} label="اسلاگ" name="Slug" type="text"/>
                                        <TextArea rows={5} label="توضیحات" name="MetaDescription"/>
                                        <CustomCreatableSelect
                                            name={"MetaKeywords"}
                                            onChange={(values) => formikProps.setFieldValue("MetaKeywords", values)}
                                            fieldLabel="کلمات کلیدی"
                                            showDropdown={false}
                                            formikProps={formikProps}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                        </div>

                        <div className="flex justify-center">
                            <Button isPending={isPending} type="submit" disabled={isPending} variant="default">
                                ثبت اطلاعات
                            </Button>
                        </div>
                    </Form>
                }}
            </Formik>
        </div>
    );
};

export default Page;
