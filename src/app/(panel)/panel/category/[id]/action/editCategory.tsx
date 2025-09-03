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
import {EditCategory, GetForEditCategory} from "@/services/Category";
import useModal from "@/context/modal/useModal";
import {objectToFormData} from "@/lib/utils";

const AddUser = ({id}: { id: string }) => {

    const {closeModal} = useModal()


    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: EditCategory, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["subcategories"]});
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

        ParentId: Yup.string().nullable(),
    });

    const handleSubmit = (values) => {

        const data = objectToFormData(values)

        mutate({id,data})
    }



    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>ویرایش زیر دسته بندی</DialogTitle>
            </DialogHeader>
            <Formik
                initialValues={{
                    Name: category?.data.name,
                    Priority: category?.data.priority,
                    ParentId: category?.data.parentId,
                    Type: category?.data.type === "آموزش" ? 0 : 1,
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
                                    <SimpleInput label={"دسته"} readOnly disabled type={"text"} value={category?.data.type}/>
                                    <SimpleInput label={"دسته والد"} readOnly disabled type={"text"} value={category?.data.parentName}/>
                                    <SimpleInput label={"نام دسته"} name={"Name"} type={"text"}/>


                                    <SimpleInput label={"اولویت"} name={"Priority"} type={"number"}/>
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