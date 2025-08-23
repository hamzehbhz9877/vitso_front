'use client'

import React, { useMemo } from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import SimpleInput from "@/components/input/simple";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { GetAllTagForSelect } from "@/services/Tag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditCourses, GetForEditCourses } from "@/services/Course";
import useModal from "@/context/modal/useModal";
import InputDemo from "@/components/input-12";
import TextArea from "@/components/input/textArea";
import { GetAllForSelectCategory } from "@/services/Category";
import { CalendarHijriInput } from "@/app/(panel)/_components/datepicker";
import { getInitialValues, getValidationSchema } from "@/app/(panel)/panel/courses/validation";
import { objectToFormData, parseJalaliDateToDate } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import MultiSelect from "@/components/input/multiSelect";
import CustomCreatableSelect from "@/components/input/creatableSelect";
import dynamic from "next/dynamic";
import { FaAngleRight } from "react-icons/fa6";

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

const EditCoursePage = () => {
    const { closeModal } = useModal();
    const queryClient = useQueryClient();
    const params = useParams();
    const router = useRouter();
    const today = useMemo(() => new Date(), []);

    const { mutate, isPending } = useMutation({
        mutationFn: EditCourses,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({ queryKey: ["courses"] });
                closeModal();
            }
        }
    });

    const handleSubmit = (values) => {
        const data = objectToFormData({
            ...values,
            ApproximateEpisodeCount: +values.ApproximateEpisodeCount
        });
        mutate({ data, id: params.id });
    };

    const { data: tags } = useQuery({ queryFn: GetAllTagForSelect, queryKey: ["GetAllTagForSelect"] });
    const { data: category } = useQuery({ queryFn: () => GetAllForSelectCategory(null), queryKey: ["GetAllCategoryForSelect"] });
    const { data: course } = useQuery({ queryFn: () => GetForEditCourses(params.id), queryKey: ["GetForEditCourses", params.id] });

    const cleanUrl = (process.env.NEXT_PUBLIC_HOST_ADDRESS || '').replace('/api', '');

    return (
        <div className="container mx-auto">
            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight />
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">ویرایش دوره</h2>
            </div>

            <Formik
                initialValues={getInitialValues({ isEdit: true, ...course?.data })}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema({ isEdit: true })}
            >
                {(formikProps) => (
                    <Form className="space-y-6">

                        <div className="flex flex-col lg:flex-row gap-6">

                            {/* ستون راست */}
                            <div className="flex-[35%] space-y-6">


                                <Card>
                                    <CardHeader>
                                        <CardTitle>اطلاعات دوره</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">

                                        <SimpleInput label="عنوان" name="Title" type="text" />

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
                                            label="تاریخ انتشار دوره"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            onChange={(date) => date && formikProps.setFieldValue('PublishedAt', date)}
                                            initialDate={course?.data?.publishedAt ? parseJalaliDateToDate(course?.data.publishedAt.split(" ")[0]) : today}
                                            initValue={course?.data?.publishedAt?.split(" ")[0]}
                                            name={"PublishedAt"}
                                        />

                                        <SimpleInput label="تعداد تقریبی جلسات" name="ApproximateEpisodeCount" type="text" />

                                        <CustomCreatableSelect
                                            name="Tags"
                                            valueKey="name"
                                            labelKey="name"
                                            onChange={(values) => formikProps.setFieldValue("Tags", values)}
                                            selectProps={{ placeholder: "تگ ها را انتخاب یا وارد کنید و Enter را بزنید" }}
                                            fieldLabel="تگ ها"
                                            showDropdown
                                            data={tags?.data}
                                            formikProps={formikProps}
                                        />
                                    </CardContent>
                                </Card>
                                <InputDemo
                                    defaultData={course?.data.image}
                                    name="Image"
                                    title="تصویر دوره"
                                    onChange={(file) => formikProps.setFieldValue("Image", file)}
                                />
                            </div>

                            {/* ستون چپ */}
                            <div className="flex-[65%] space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>محتوای دوره</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Editor
                                            defaultData={course?.data.description}
                                            name="description"
                                            uploadUrl="Upload/ImageCourseContent"
                                            getEditorData={(data, getText) =>
                                                formikProps.setFieldValue('description', getText !== "" ? data : "")
                                            }
                                        />
                                        <ErrorMessage name="description" className="validation-error" component="div" />

                                        <TextArea rows={3} label="توضیحات کوتاه" name="ShortDescription" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>سئو</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput label="عنوان" name="MetaTitle" type="text" />
                                        <SimpleInput prefix={cleanUrl + "/course/"} label="اسلاگ" name="Slug" type="text" />
                                        <TextArea rows={5} label="توضیحات" name="MetaDescription" />
                                        <CustomCreatableSelect
                                            name="MetaKeywords"
                                            onChange={(values) => formikProps.setFieldValue("MetaKeywords", values)}
                                            fieldLabel="کلمات کلیدی"
                                            showDropdown={false}
                                            formikProps={formikProps}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                        </div>

                        <Button className={"flex justify-end"} isPending={isPending} type="submit" disabled={isPending} variant="default">
                            ثبت اطلاعات
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditCoursePage;
