'use client'

import React, {useMemo} from 'react';
import {ErrorMessage, Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {Button} from "@/components/ui/button";
import {GetAllTagForSelect} from "@/services/Tag";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {EditArticles, GetForEditArticles} from "@/services/Article";
import useModal from "@/hooks/useModal";
import InputDemo from "@/components/input-12";
import TextArea from "@/components/input/textArea";
import {GetAllForSelectCategory} from "@/services/Category";
import dynamic from "next/dynamic";
import {CalendarHijriInput} from "@/app/(panel)/_components/datepicker";
import {initialValues, validationSchema} from "@/app/(panel)/panel/article/validation";
import { objectToFormData} from "@/lib/utils";
import {useParams} from "next/navigation";
import MultiSelect from "@/components/input/multiSelect";
import CustomCreatableSelect from "@/components/input/creatableSelect";

const Editor = dynamic(() => import('@/components/editor'), {ssr: false});

const Page = () => {
    const {handleClose} = useModal();
    const queryClient = useQueryClient();

    const params =useParams()

    // ✅ تثبیت مقدار اولیه‌ی تاریخ با useMemo
    const today = useMemo(() => new Date(), []);

    const {mutate, isPending} = useMutation({
        mutationFn: EditArticles,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["articles"]});
                handleClose();
            }
        }
    });

    const handleSubmit = (values) => {
        const data = objectToFormData(values)
        mutate({data,id:params.id})
    };

    const {data: tags} = useQuery({
        queryFn: GetAllTagForSelect,
        queryKey: ["GetAllTagForSelect"]
    });

    const {data: category} = useQuery({
        queryFn: () => GetAllForSelectCategory(1),
        queryKey: ["GetAllCategoryForSelect",1]
    });


    const {data: article} = useQuery({
        queryFn: () => GetForEditArticles(params.id),
        queryKey: ["GetForEditArticles",params.id]
    });

    const cleanUrl = (process.env.NEXT_PUBLIC_HOST_ADDRESS || '').replace('/api', '');


    return (
        <div>
            <Formik
                initialValues={initialValues({...article?.data})}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return <Form>
                        <div className="flex gap-5">
                            <div className={"w-full lg:w-[300px]"}>
                            <InputDemo defaultData={article?.data.image} name={"Image"} title={"تصویر مقاله"} onChange={(file) => {
                                formikProps.setFieldValue("Image", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
                            }}/>
                            </div>

                            <div className="flex-1">
                                <div
                                    className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[15px]">
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

                                    <div className="flex flex-col gap-[16px]">
                                        <CalendarHijriInput
                                            label="تاریخ انتشار مقاله"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            infoText=""
                                            onChange={(date) => {
                                                formikProps.setFieldValue('PublishedAt', date);
                                            }}
                                            initialDate={today}
                                        />

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
                                    </div>

                                    <TextArea rows={8} label="توضیحات کوتاه" name="ShortDescription"/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[20px]">
                            <Editor
                                defaultData={article?.data.content}
                                name={"Content"}
                                uploadUrl="Upload/ImageArticleContent"
                                getEditorData={(data, getText) => {
                                    if (getText !== "") {
                                        formikProps.setFieldValue('Content', data);
                                    } else {
                                        formikProps.setFieldValue('Content', "");
                                    }
                                }}
                            />
                            <ErrorMessage name={"Content"} className="validation-error" component="div"/>
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
