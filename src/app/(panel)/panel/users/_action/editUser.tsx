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
import {EditUsers, GetForEditUsers} from "@/services/User";
import {GetAllRoleForSelect} from "@/services/Role";
import MultiSelect from "@/components/input/multiSelect";
import {Button} from "@/components/ui/button";

const AddUser = ({id}: { id: string }) => {

    const {handleClose} = useModal();


    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: EditUsers, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["users"]});
                handleClose()
            }
        }
    });

    const {data: user} = useQuery({
        queryFn: () => GetForEditUsers(id),
        queryKey: ["category", id]
    })


    const {data: roles} = useQuery({
        queryFn: GetAllRoleForSelect,
        queryKey: ["GetAllRoleForSelect"]
    })

    const validationSchema = Yup.object({
        userName: Yup.string()
            .required("نام کاربری الزامی است")
            .min(3, "حداقل باید ۳ کاراکتر باشد"),

        firstName: Yup.string()
            .required("نام الزامی است")
            .min(2, "حداقل باید ۲ کاراکتر باشد"),

        lastName: Yup.string()
            .required("نام خانوادگی الزامی است")
            .min(2, "حداقل باید ۲ کاراکتر باشد"),

        phone: Yup.string()
            .required("شماره همراه الزامی است")
            .test("valid-phone", "شماره همراه نامعتبر است", function (value) {
                const phoneRegex = /^(\+98|0)?9\d{9}$/;
                return phoneRegex.test(value ?? "");
            }),

        roles: Yup.array()
            .min(1, "حداقل یک نقش باید انتخاب شود")
            .of(Yup.string().required("نقش نامعتبر است")),
    });

    const handleSubmit = (values) => mutate({...values,id})
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>ویرایش کاربر</DialogTitle>

            </DialogHeader>
    

            <Formik
                initialValues={{
                    userName: user?.data.userName,
                    firstName: user?.data.firstName,
                    lastName: user?.data.lastName,
                    password: user?.data.password,
                    confirmPassword: user?.data.confirmPassword,
                    phone: user?.data.phone,
                    roles: user?.data.roles
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
                                    <SimpleInput label={"نام"} name={"firstName"} type={"text"}/>
                                    <SimpleInput label={"نام خانوادگی"} name={"lastName"} type={"text"}/>
                                    <SimpleInput label={"نام کاربری"} name={"userName"} type={"text"}/>
                                    <SimpleInput label={"شماره همراه"} name={"phone"} type={"text"}/>
                                    <MultiSelect
                                        valueKey="id"
                                        labelKey="name"
                                        formikProps={formikProps}
                                        title="نقش ها"
                                        name="roles"
                                        data={roles?.data}
                                    />
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