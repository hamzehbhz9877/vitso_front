import React from 'react';
import {initialValues, validationSchema} from "./validation";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {ModalHeader} from "@/components/modal";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { GetForEditCategory, RegisterCategory} from "@/services/Category";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

const AddCategory = () => {

    const {handleClose} = useModal();



    const queryClient = useQueryClient();

    const params=useParams();


    const {mutate, isPending} = useMutation({
        mutationFn: RegisterCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["subcategories"]});
                handleClose()
            }
        }
    });


    const {data: category} = useQuery({
        queryFn: () => GetForEditCategory(params.id),
        queryKey: ["GetForEditCategory",params.id],
    });




    const handleSubmit = (values) => mutate(values)

        return (
        <div>
            <ModalHeader>
                <div className={"flex items-center justify-between"}>
                    <span
                        className="text-[20px] font-bold text-[#2F2F2F]">افزودن زیر دسته بندی</span>
                    <IoCloseOutline className={"cursor-pointer"} size={32} color={"#2F2F2F"} onClick={handleClose}/>
                </div>
            </ModalHeader>
            <Formik
                initialValues={initialValues(params.id,category?.data.type==="آموزش"?0:1)}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {() => {
                    return (
                        <Form>
                            <>
                                <div
                                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput label={"دسته بندی"} readOnly disabled type={"text"} value={category?.data.type}/>
                                    <SimpleInput label={"دسته والد"} readOnly disabled type={"text"} value={category?.data.name}/>
                                    <SimpleInput label={"نام دسته"} name={"name"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"priority"} type={"number"}/>
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