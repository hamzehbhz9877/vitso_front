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
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { GetForEditCategory, RegisterCategory} from "@/services/Category";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import useModal from "@/context/modal/useModal";
import {objectToFormData} from "@/lib/utils";

const AddCategory = () => {

    const {closeModal} = useModal()



    const queryClient = useQueryClient();

    const params=useParams();


    const {mutate, isPending} = useMutation({
        mutationFn: RegisterCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["subcategories"]});
                closeModal()
            }
        }
    });


    const {data: category} = useQuery({
        queryFn: () => GetForEditCategory(params.id),
        queryKey: ["GetForEditCategory",params.id],
    });




    const handleSubmit = (values) => {
        const data = objectToFormData(values);
        mutate(data);
    }

        return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>افزودن زیر دسته بندی</DialogTitle>
            </DialogHeader>
            <Formik
                initialValues={initialValues(params.id,category?.data.type==="آموزش"?0:1)}
                onSubmit={handleSubmit}
                enableReinitialize
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
                                    <SimpleInput label={"نام دسته"} name={"Name"} type={"text"}/>
                                    <SimpleInput label={"اولویت"} name={"Priority"} type={"number"}/>
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