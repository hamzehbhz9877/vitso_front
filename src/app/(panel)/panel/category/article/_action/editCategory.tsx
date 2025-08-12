import React from 'react';
import * as Yup from "yup";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {ModalHeader} from "@/components/modal";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {EditCategory, GetForEditCategory} from "@/services/Category";

const AddUser = ({id}: { id: string }) => {

    const {handleClose} = useModal();


    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: EditCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["categories"]});
                handleClose()
            }
        }
    });

    const {data: category} = useQuery({
        queryFn: () => GetForEditCategory(id),
        queryKey: ["user", id]
    })


    const validationSchema = Yup.object({
        name: Yup.string()
            .required("نام دسته الزامی است")
            .min(3, "حداقل باید ۳ کاراکتر باشد"),

        priority: Yup.number()
            .required("اولویت الزامی است"),

    });

    const handleSubmit = (values) => {
        mutate({data:values,id})
    }




    return (
        <div>
            <ModalHeader>
                <div className={"flex items-center justify-between"}>
                    <span
                        className="text-[16px] font-bold text-[#2F2F2F]">ویرایش دسته بندی</span>
                    <IoCloseOutline className={"cursor-pointer"} size={24} color={"#2F2F2F"} onClick={handleClose}/>
                </div>
            </ModalHeader>
            <hr className={"border-[#ABAFB1] my-[20px]"}/>

            <Formik
                initialValues={{
                    parentId:null,
                    name: category?.data.name,
                    priority: category?.data.priority,
                }}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <>
                                <div
                                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput label={"نام دسته"} name={"name"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"priority"} type={"number"}/>
                                </div>


                                <Button isPending={isPending} type={"submit"} disabled={isPending}
                                        variant={"default"}
                                >
                                    ویرایش اطلاعات
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </div>

    );
};

export default AddUser;