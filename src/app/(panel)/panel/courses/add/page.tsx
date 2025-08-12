'use client'

import React, {useMemo} from 'react';
import {ErrorMessage, Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {Button} from "@/components/ui/button";
import {GetAllTagForSelect} from "@/services/Tag";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RegisterCourses} from "@/services/Course";
import useModal from "@/hooks/useModal";
import InputDemo from "@/components/input-12";
import TextArea from "@/components/input/textArea";
import {GetAllForSelectCategory} from "@/services/Category";
import {CalendarHijriInput} from "@/app/(panel)/_components/datepicker";
import {getValidationSchema,getInitialValues} from "@/app/(panel)/panel/courses/validation";
import {formatDate, objectToFormData} from "@/lib/utils";
import CustomCreatableSelect from "@/components/input/creatableSelect";
import MultiSelect from "@/components/input/multiSelect";
import {NumberInput} from "@/components/numberformat";
import SelectWithCustomDropdownIconDemo from "@/components/input/select";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import('@/components/editor'), {ssr: false});


const Page = () => {
    const {handleClose} = useModal();
    const queryClient = useQueryClient();

    // ✅ تثبیت مقدار اولیه‌ی تاریخ با useMemo
    const today = useMemo(() => new Date(), []);

    const {mutate, isPending} = useMutation({
        mutationFn: RegisterCourses,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["articles"]});
                handleClose();
            }
        }
    });

    const handleSubmit = (values) => {
        const data = objectToFormData(values)
        mutate(data)
    };

    const {data: tags} = useQuery({
        queryFn: GetAllTagForSelect,
        queryKey: ["GetAllTagForSelect"]
    });

    const {data: category} = useQuery({
        queryFn: () => GetAllForSelectCategory(null),
        queryKey: ["GetAllCategoryForSelect"]
    });

    const cleanUrl = (process.env.NEXT_PUBLIC_HOST_ADDRESS || '').replace('/api', '');

    return (
        <div>
            <Formik
                initialValues={getInitialValues({isEdit:false,date: formatDate(today)})}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema({isEdit:false})}
            >
                {(formikProps) => {
                    return <Form>
                        <div className="flex gap-5">
                         <div className={"w-full lg:w-[300px]"}>
                             <InputDemo name={"Image"} title={"تصویر دوره"} onChange={(file) => {
                                 formikProps.setFieldValue("Image", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
                             }}/>
                         </div>

                            <div className="flex-1">
                                <div
                                    className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[15px]">
                                    <SimpleInput label="عنوان" name="Title" type="text"/>

                                    <SelectWithCustomDropdownIconDemo
                                        label="سطح دوره"
                                        formikProps={formikProps}
                                        name={"Level"}
                                        options={[
                                            {value: "0", label: "مبتدی"},
                                            {value: "1", label: "متوسط"},
                                            {value: "2", label: "پیشرفته"},
                                        ]}
                                    />

                                    <SelectWithCustomDropdownIconDemo
                                        formikProps={formikProps}
                                        label="نوع قیمت"
                                        name={"PriceType"}
                                        options={[
                                            {value: "0", label: "رایگان"},
                                            {value: "1", label: "پولی"},
                                        ]}
                                    />
                                    <NumberInput
                                        formikProps={formikProps}
                                        label={"قیمت"}
                                        name={"Price"}
                                        id={"number-input"}
                                        placeholder="قیمت دوره آموزشی را وارد کنید..."
                                        thousandSeparator={','}
                                        suffix=" تومان"
                                    />

                                    <MultiSelect
                                        isMulti={false}
                                        valueKey="id"
                                        labelKey="name"
                                        formikProps={formikProps}
                                        title="دسته بندی"
                                        name="CategoryId"
                                        data={category?.data}
                                    />

                                    <div className="flex flex-col gap-[16px]">

                                        <CalendarHijriInput
                                            label="تاریخ انتشار دوره"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            infoText=""
                                            onChange={(date) => {
                                                formikProps.setFieldValue('PublishedAt', date);
                                            }}
                                            initialDate={today}
                                        />
                                        <SimpleInput label="تعداد تقریبی جلسات" name="ApproximateEpisodeCount" type="text"/>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <CustomCreatableSelect
                            name={"Tags"}
                            valueKey="name"
                            labelKey="name"
                            onChange={(values) => formikProps.setFieldValue("Tags", values)}
                            selectProps={{placeholder: "تگ ها را انتخاب کنید و یا مقداری را وارد کنید و Enter را بزنید"}}
                            fieldLabel="تگ ها"
                            showDropdown={true}
                            data={tags?.data}
                            formikProps={formikProps}
                        />
                        <div className="mt-[20px]">
                            <Editor
                                name={"Description"}
                                uploadUrl="Upload/ImageCourseContent"
                                getEditorData={(data, getText) => {
                                    if (getText !== "") {
                                        formikProps.setFieldValue('Description', data);
                                    } else {
                                        formikProps.setFieldValue('Description', "");
                                    }
                                }}
                            />
                            <ErrorMessage name={"Content"} className="validation-error" component="div"/>
                        </div>
                        <div className={"mt-[20px]"}>
                            <TextArea rows={3} label="توضیحات کوتاه " name="ShortDescription"/>
                        </div>

                        <hr className="border-[#ABAFB1] my-[20px]"/>

                        <div>
                            <h3 className="text-center font-bold mb-[20px]">سئو</h3>

                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]">
                                <SimpleInput label="عنوان" name="MetaTitle" type="text"/>

                                <SimpleInput prefix={ cleanUrl+"/"} label="اسلاگ" name="Slug" type="text"/>

                                <TextArea rows={5} label="توضیحات" name="MetaDescription"/>

                                <CustomCreatableSelect
                                    name={"MetaKeywords"}
                                    onChange={(values) => formikProps.setFieldValue("MetaKeywords", values)}
                                    fieldLabel="کلمات کلیدی"
                                    showDropdown={false}
                                    formikProps={formikProps}
                                />
                            </div>
                        </div>

                        <Button isPending={isPending} type="submit" disabled={isPending} variant="default">
                            ثبت اطلاعات
                        </Button>
                    </Form>
                }
                }
            </Formik>
        </div>
    );
};

export default Page;
