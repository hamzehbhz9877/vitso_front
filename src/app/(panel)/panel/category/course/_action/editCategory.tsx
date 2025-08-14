import React from 'react';
import * as Yup from "yup";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {EditCategory, GetAllForSelectCategory, GetForEditCategory} from "@/services/Category";
import InputDemo from "@/components/input-12";

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
        queryKey: ["category", id]
    })

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("نام دسته الزامی است")
            .min(3, "حداقل باید ۳ کاراکتر باشد"),

        priority: Yup.number()
            .required("اولویت الزامی است"),

    });

    const handleSubmit = (values) => mutate({...values,id})


    const {data: categories} = useQuery({
        queryFn: ()=>GetAllForSelectCategory(category?.data.type==="آموزش"?0:1),
        queryKey: ["GetAllForSelectCategory",category?.data.type==="آموزش"?0:1],
        enabled:!!category?.data.type
    })

    return (
        <DialogContent>
            <DialogHeader>

                <DialogTitle> ویرایش دسته بندی</DialogTitle>
            </DialogHeader>
    

            <Formik
                initialValues={{
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
                                <div className={"w-max mb-5"}>
                                    <InputDemo defaultData={category?.data.icon} name={"Image"} title={"تصویر مقاله"}
                                               onChange={(file) => {
                                                   formikProps.setFieldValue("Image", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
                                               }}/>
                                </div>

                                <Button isPending={isPending} type={"submit"} disabled={isPending}
                                        variant={"outline"}
                                >
                                    ویرایش
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </DialogContent>

    );
};

export default AddUser;