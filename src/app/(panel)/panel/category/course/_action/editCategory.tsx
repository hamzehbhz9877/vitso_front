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
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {EditCategory, GetAllForSelectCategory, GetForEditCategory} from "@/services/Category";
import InputDemo from "@/components/input-12";
import {objectToFormData} from "@/lib/utils";
import useModal from "@/context/modal/useModal";

const AddUser = ({id}: { id: string }) => {

    const {closeModal} = useModal();


    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: EditCategory, onSettled: async (_, error) => {
            if (!error) {
               await queryClient.invalidateQueries({queryKey: ["categories"]});
                closeModal()
            }
        }
    });

    const {data: category} = useQuery({
        queryFn: () => GetForEditCategory(id),
        queryKey: ["category", id]
    })

    const validationSchema = Yup.object({
        Name: Yup.string()
            .required("نام دسته الزامی است")
            .min(3, "حداقل باید ۳ کاراکتر باشد"),

        Priority: Yup.number()
            .required("اولویت الزامی است"),

    });

    const handleSubmit = (values) => {
        const data = objectToFormData(values)
        mutate({data,id})
    }


    return (
        <DialogContent>
            <DialogHeader>

                <DialogTitle> ویرایش دسته بندی</DialogTitle>
            </DialogHeader>
    

            <Formik
                initialValues={{
                    Name: category?.data.name,
                    Priority: category?.data.priority,
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
                                    <SimpleInput label={"نام دسته"} name={"Name"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"Priority"} type={"number"}/>
                                </div>
                                <div className={"mb-5 w-auto h-auto md:w-64"}>
                                    <InputDemo defaultData={category?.data.icon} name={"Icon"} title={"آیکن دسته بندی"}
                                               onChange={(file) => {
                                                   formikProps.setFieldValue("Icon", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
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