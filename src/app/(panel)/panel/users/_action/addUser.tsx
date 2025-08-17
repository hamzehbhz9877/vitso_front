import React from 'react';
import {initialValues, validationSchema} from "./validation";
import {Form, Formik} from "formik";
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
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RegisterUsers} from "@/services/User";
import {GetAllRoleForSelect} from "@/services/Role";
import MultiSelect from "@/components/input/multiSelect";
import {Button} from "@/components/ui/button";

const AddUser = () => {

    const {closeModal} = useModal()


    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: RegisterUsers, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["users"]});
                closeModal()
            }
        }
    });


    const {data: roles} = useQuery({
        queryFn: GetAllRoleForSelect,
        queryKey: ["GetAllRoleForSelect"]
    })


    const handleSubmit = (values) => mutate(values)

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle> افزودن کاربر</DialogTitle>
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
                                    <SimpleInput label={"نام"} name={"firstName"} type={"text"}/>
                                    <SimpleInput label={"نام خانوادگی"} name={"lastName"} type={"text"}/>
                                    <SimpleInput label={"نام کاربری"} name={"userName"} type={"text"}/>
                                    <SimpleInput label={"شماره همراه"} name={"phone"} type={"text"}/>
                                    <MultiSelect valueKey="id"
                                                 labelKey="name"
                                                 formikProps={formikProps} title={"نقش ها"} name={"roles"}
                                                 data={roles?.data}/>
                                    <SimpleInput label={"رمز عبور"} name={"password"} type={"password"}/>
                                    <SimpleInput label={"تکرار رمز عبور"} name={"confirmPassword"} type={"password"}/>
                                </div>
                                <Button isPending={isPending} type={"submit"} disabled={isPending}
                                        variant={"outline"}
                                >
                                    ثبت نام
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