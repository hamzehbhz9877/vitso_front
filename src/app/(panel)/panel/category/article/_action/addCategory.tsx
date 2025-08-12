import React from 'react';
import {initialValues, validationSchema} from "./validation";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {ModalHeader} from "@/components/modal";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GetAllForSelectCategory, RegisterCategory} from "@/services/Category";
import {Button} from "@/components/ui/button";
import InputDemo from "@/components/input-12";
import {objectToFormData} from "@/lib/utils";

const AddCategory = () => {

    const {handleClose} = useModal();


    const [categoryType, setCategoryType] = React.useState<number>();

    const queryClient = useQueryClient();


    const {mutate, isPending} = useMutation({
        mutationFn: RegisterCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["categories"]});
                handleClose()
            }
        }
    });


    const {data: categories} = useQuery({
        queryFn: () => GetAllForSelectCategory(categoryType),
        queryKey: ["GetAllForSelectCategory", categoryType],
        enabled: !!categoryType
    })


    const handleSubmit = (values) => {
        const data = objectToFormData({...values, Type: +values.Type})
        mutate(data)
    }


    return (
        <div>
            <ModalHeader>
                <div className={"flex items-center justify-between"}>
                    <span
                        className="text-[16px] font-bold text-[#2F2F2F]">افزودن دسته بندی</span>
                    <IoCloseOutline className={"cursor-pointer"} size={24} color={"#2F2F2F"} onClick={handleClose}/>
                </div>
            </ModalHeader>
            <hr className={"border-[#ABAFB1] my-[20px]"}/>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <>
                                <div
                                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput label={"نام دسته"} name={"Name"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"Priority"} type={"number"}/>
                                </div>



                                <div className={"w-[100px] mb-5"}>
                                    <InputDemo  name={"Icon"} title={"آیکن دسته بندی"} onChange={(file) => {
                                        formikProps.setFieldValue("Icon", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
                                    }}/>
                                </div>

                                <Button isPending={isPending} type={"submit"} disabled={isPending}
                                        variant={"default"}
                                >
                                    ثبت اطلاعات
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </div>

    );
};

export default AddCategory;