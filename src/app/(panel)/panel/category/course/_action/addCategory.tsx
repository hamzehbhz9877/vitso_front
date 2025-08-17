import React from 'react';
import {initialValues, validationSchema} from "./validation";
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
import useModal from "@/context/modal/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { RegisterCategory} from "@/services/Category";
import {Button} from "@/components/ui/button";
import InputDemo from "@/components/input-12";
import {objectToFormData} from "@/lib/utils";

const AddCategory = () => {

    const {closeModal} = useModal()


    const [categoryType, setCategoryType] = React.useState<number>();

    const queryClient = useQueryClient();


    const {mutate, isPending} = useMutation({
        mutationFn: RegisterCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["categories"]});
                closeModal();
            }
        }
    });




    const handleSubmit = (values) => {
        const data = objectToFormData({...values, Type: +values.Type})
        mutate(data)
    }


    return (
        <DialogContent>
            <DialogHeader>

                <DialogTitle>افزودن دسته بندی</DialogTitle>
            </DialogHeader>
    

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
                                <div className={"mb-5 w-auto h-auto md:w-64"}>

                                    <InputDemo  name={"Icon"} title={"آیکن دسته بندی"} onChange={(file) => {
                                        formikProps.setFieldValue("Icon", file); // یا اگر باید base64 یا URL باشد، اینجا تبدیل کن
                                    }}/>
                                </div>


                                    <Button isPending={isPending} type={"submit"} disabled={isPending}
                                            variant={"outline"}
                                    >
                                        ثبت اطلاعات
                                    </Button>
                                </>
                        </Form>
                )
                }}
            </Formik>
              </DialogContent>

    );
};

export default AddCategory;