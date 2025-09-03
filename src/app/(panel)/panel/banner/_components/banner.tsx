'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaAngleRight} from "react-icons/fa6";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Form, Formik} from "formik";
import SelectWithCustomDropdownIconDemo from "@/components/input/select";
import SimpleInput from "@/components/input/simple";
import {useParams, useRouter} from "next/navigation";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GetEntityNames, GetPosition} from "@/services/Position";
import {RegisterBanner, EditBanner, GetBanner} from "@/services/Banner";
import * as Yup from "yup";
import {useBannerStore} from "@/state/banner";
import BannersManager from "@/app/(panel)/panel/banner/_components/bannersManager";
import InputDemo from "@/components/input-12";
import {objectToFormData} from "@/lib/utils";
import {GetFaqAdmin} from "@/services/Faq";


const validationSchema = Yup.object({
    Image: Yup.string().required("تصویر الزامی است"),
    Title: Yup.string().required("عنوان الزامی است"),
    // Position: Yup.string().required('موقعیت الزامی است'),
    // EntityName: Yup.string().required("نوع محتوا الزامی است"),
    Link: Yup.string().url("آدرس تصویر معتبر نیست").required("آدرس تصویر الزامی است"),
    Priority: Yup.number()
        .nullable()
        .typeError("اولویت باید عدد باشد")
        .required("اولویت الزامی است"),
});


const Banner = ({mode}: { mode: 'edit' | 'add' }) => {

    const {addBanner, banners, setBanners} = useBannerStore();

    const params = useParams()

    const [resetKey, setResetKey] = useState(0)

    const queryClient = useQueryClient();

    const [entityName, setEntityName] = useState<string>('Home');

    const [position, setPosition] = useState<string>();

    // واکشی entityNames
    const {data: entityNames} = useQuery({
        queryKey: ["GetEntityNames"],
        queryFn: GetEntityNames,
    });

    const {data: positions} = useQuery({
        queryKey: ["GetPosition", entityName],
        queryFn: () => GetPosition(entityName),
        enabled: !!entityName
    });

    const {data: banner, isLoading: bannerLoading} = useQuery({
        queryKey: ["GetFaqAdmin", params?.id],
        queryFn: () => GetBanner(params?.id),
        enabled: mode === "edit" && !!params?.id,
    });

    useEffect(() => {
        if (mode === "edit" && banner?.data) {
            setBanners(banner.data.listBanner);
        }
        return () => {
            setBanners([])
        }
    }, [banner, mode, setBanners]);

    const mutationFn = mode === "edit" ? EditBanner : RegisterBanner;

    const {mutate, isPending} = useMutation({
        mutationFn,
        onSettled: (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["banners"]});
            }
        },
    });

    const initialValues = {
        Title: "",
        Image: "",
        Link: "",
        // Position: "",
        // EntityName: "",
        Priority: null,
    };

    const handleSubmit = (values, formikHelpers) => {
        const {Priority, Link, Image, Title} = values;
        addBanner({priority: Priority, link: Link, image: Image, title: Title});

        formikHelpers.resetForm({
            values: {
                ...initialValues,
            },
        })

        // formikHelpers.setFieldValue("EntityName", EntityName);

        setResetKey(prev => prev + 1)
    };

    const handleSubmitValues = () => {
        const body = {
            EntityName: 0, Position: params.id, ListBanner: banners,
        }
        const data = objectToFormData(body);
        mutate(data);
    }

    const router = useRouter();

    return (
        <div className="container mx-auto">

            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight/>
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">
                    {mode === "edit" ? "ویرایش بنر" : "افزودن بنر"}
                </h2>
            </div>

            <>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(formikProps) => {
                        return (
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
                                                    value={'Home'}
                                                    formikProps={formikProps}
                                                    options={
                                                        entityNames?.data
                                                            ? entityNames.data.map((d) => ({
                                                                value: d.name,
                                                                label: d.displayName,
                                                            }))
                                                            : []
                                                    }
                                                    onChange={(data) => {
                                                        setEntityName(data)
                                                    }}
                                                />
                                                <SelectWithCustomDropdownIconDemo
                                                    label="موقعیت"
                                                    name={'Position'}
                                                    disabled
                                                    value={String(params?.id) ?? ''}
                                                    options={
                                                        positions?.data
                                                            ? positions.data.map((d) => ({
                                                                value: d.name,
                                                                label: d.displayName,
                                                            }))
                                                            : []
                                                    }
                                                    formikProps={formikProps}
                                                    onValueChange={(data) => {
                                                        setPosition(data)
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
                                                    <SimpleInput type="text" label="عنوان" name="Title"/>
                                                    <InputDemo
                                                        dropzoneOptions={{maxSize: 1024 * 1024,accept:{"image/png": [".png", ".jpg", ".jpeg", ".webp",".gif"]}}}
                                                        key={resetKey}
                                                        name={"Image"}
                                                        title={"تصویر"}
                                                        onChange={(file) => formikProps.setFieldValue("Image", file)}
                                                    />
                                                    <SimpleInput  style={{direction:"ltr"}} className={"text-left"} type="url" label="آدرس"
                                                                 name="Link"/>
                                                    <SimpleInput type="number" label="اولویت" name="Priority"/>
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
                        )
                    }}
                </Formik>

                <Card className="text-center mt-5">
                    <CardHeader>
                        <h3 className="font-bold">بنر ها</h3>
                    </CardHeader>
                    <CardContent>
                        {banners?.length > 0 ? (
                            <>
                                <BannersManager/>
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
                            <p className="text-gray-500 py-6">هیچ بنری ثبت نشده است</p>
                        )}
                    </CardContent>
                </Card>
            </>
        </div>
    );
};

export default Banner;