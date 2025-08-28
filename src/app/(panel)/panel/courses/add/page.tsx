'use client'

import React, { useMemo } from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import SimpleInput from "@/components/input/simple";
import { Button } from "@/components/ui/button";
import { GetAllTagForSelect } from "@/services/Tag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {EditCourses, GetForEditCourses, RegisterCourses} from "@/services/Course";
import useModal from "@/context/modal/useModal";
import InputDemo from "@/components/input-12";
import TextArea from "@/components/input/textArea";
import {GetAllForSelectCategory, GetAllSubForSelect} from "@/services/Category";
import { CalendarHijriInput } from "@/app/(panel)/_components/datepicker";
import { getValidationSchema, getInitialValues } from "@/app/(panel)/panel/courses/validation";
import {convertDateToJalaliString, formatDate, objectToFormData} from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import MultiSelect from "@/components/input/multiSelect";
import CustomCreatableSelect from "@/components/input/creatableSelect";
import { NumberInput } from "@/components/numberformat";
import SelectWithCustomDropdownIconDemo from "@/components/input/select";
import dynamic from "next/dynamic";
import {FaAngleRight} from "react-icons/fa6";
import {Card,CardContent,CardHeader} from "@/components/ui/card";

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

const EditPage = () => {
    const { closeModal } = useModal();
    const queryClient = useQueryClient();
    const params = useParams();
    const router = useRouter();

    const today = useMemo(() => new Date(), []);

    const { mutate, isPending } = useMutation({
        mutationFn: RegisterCourses,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({ queryKey: ["courses"] });
                closeModal();
            }
        }
    });

    const handleSubmit = (values) => {
        const data = objectToFormData(values);
        mutate(data);
    };

    const { data: tags } = useQuery({
        queryFn: GetAllTagForSelect,
        queryKey: ["GetAllTagForSelect"]
    });

    const { data: category } = useQuery({
        queryFn: () => GetAllSubForSelect(0),
        queryKey: ["GetAllSubForSelect",0]
    });


    const cleanUrl = (process.env.NEXT_PUBLIC_HOST_ADDRESS || '').replace('/api', '');

    return (
        <div className="container mx-auto">

            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={()=>router.back()}>
                    <FaAngleRight />
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">افزودن دوره</h2>
            </div>

            <Formik
                initialValues={getInitialValues({ date: formatDate(today),level:0,priceType:1 })}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema({ isEdit: false })}
            >
                {(formikProps) => (
                    <Form className="space-y-4">

                        <div className="flex flex-col lg:flex-row gap-4">

                            {/* ستون راست: تصویر، جزییات و تگ‌ها */}
                            <div className="flex-[35%] space-y-4">


                                <Card>
                                    <CardHeader>
                                        <h3 className="font-bold">جزییات دوره</h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput label="عنوان" name="Title" type="text" />
                                        <SelectWithCustomDropdownIconDemo
                                            value={formikProps.values.Level}
                                            label="سطح دوره"
                                            formikProps={formikProps}
                                            name="Level"
                                            options={[
                                                { value: "0", label: "مبتدی" },
                                                { value: "1", label: "متوسط" },
                                                { value: "2", label: "پیشرفته" },
                                            ]}
                                        />
                                        <SelectWithCustomDropdownIconDemo
                                            label="نوع قیمت"
                                            formikProps={formikProps}
                                            value={formikProps.values.PriceType}
                                            name="PriceType"
                                            options={[
                                                { value: "0", label: "رایگان" },
                                                { value: "1", label: "پولی" },
                                            ]}
                                        />
                                        {formikProps.values.PriceType==="1"?
                                        <NumberInput
                                            formikProps={formikProps}
                                            label="قیمت"
                                            name="Price"
                                            id="number-input"
                                            placeholder="قیمت دوره آموزشی را وارد کنید..."
                                            thousandSeparator=","
                                            suffix=" تومان"
                                        />:""}
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
                                            initValue={convertDateToJalaliString(today)}
                                            label="تاریخ انتشار دوره"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            onChange={(date) => formikProps.setFieldValue('PublishedAt', date)}
                                            initialDate={today}
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
                                    name="Image"
                                    title="تصویر دوره"
                                    onChange={(file) => formikProps.setFieldValue("Image", file)}
                                />
                            </div>

                            {/* ستون چپ: محتوا و توضیحات */}
                            <div className="flex-[65%] space-y-3">
                                <Card>
                                    <CardHeader>
                                        <h3 className="font-bold">محتوا</h3>
                                    </CardHeader>
                                    <CardContent>
                                       <div className={"mb-5"}>
                                           <Editor
                                               name="Description"
                                               uploadUrl="Upload/ImageCourseContent"
                                               getEditorData={(data, getText) => {
                                                   formikProps.setFieldValue('Description', getText !== "" ? data : "");
                                               }}
                                           />
                                           <ErrorMessage name="Description" className="validation-error" component="div" />
                                       </div>
                                        <TextArea maxLength={250} rows={3} label="توضیحات کوتاه" name="ShortDescription" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <h3 className="font-bold">سئو</h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput label="عنوان" name="MetaTitle" type="text" />
                                        <SimpleInput prefix={cleanUrl + "/course/"} label="اسلاگ" name="Slug" type="text" />
                                        <TextArea maxLength={250} rows={5} label="توضیحات" name="MetaDescription" />
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

                        <div className="flex justify-center">
                            <Button isPending={isPending} type="submit" disabled={isPending} variant="default">
                                ثبت اطلاعات
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditPage;
