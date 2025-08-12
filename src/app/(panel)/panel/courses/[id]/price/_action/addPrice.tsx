import React from 'react';
import {getValidationSchema, initialValues} from "./validation";
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {ModalHeader} from "@/components/modal";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {GetForEditCourses, NewPrice} from "@/services/Course";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import {NumberInput} from "@/components/numberformat";
import {CalendarHijriInput} from "@/app/(panel)/_components/datepicker";

const AddPrice = () => {

    const {handleClose} = useModal();

    const params=useParams()

    const queryClient = useQueryClient();

    const {mutate, isPending} = useMutation({
        mutationFn: NewPrice, onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({queryKey: ["prices"]});
                handleClose()
            }
        }
    });


    const handleSubmit = (values) => mutate({...values,courseId:params.id,discountPercentage:+values.discountPercentage})

    const {data: course} = useQuery({
        queryFn: ()=>GetForEditCourses(params.id),
        queryKey: ["GetForEditSeason",params.id],
    })
    return (
        <div>
            <ModalHeader>
                <div className={"flex items-center justify-between"}>
                    <span
                        className="text-[16px] font-bold text-[#2F2F2F]">افزودن قیمت</span>
                    <IoCloseOutline className={"cursor-pointer"} size={24} color={"#2F2F2F"} onClick={handleClose}/>
                </div>
            </ModalHeader>
            <hr className={"border-[#ABAFB1] my-[20px]"}/>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <>
                                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput readOnly value={course?.data.title} label={"نام دوره"} name={"courseId"} type={"text"}/>
                                    <NumberInput
                                        formikProps={formikProps}
                                        label={"قیمت"}
                                        name={"amount"}
                                        id={"number-input"}
                                        placeholder="قیمت دوره آموزشی را وارد کنید..."
                                        thousandSeparator={','}
                                        suffix=" تومان"
                                    />
                                    <SimpleInput label={"درصد تخفیف"} name={"discountPercentage"} type={"text"}/>
                                    <CalendarHijriInput
                                        initialDate={undefined}
                                        name="endDateDiscount"
                                        label="تاریخ اتمام درصد تخفیف"
                                        placeholder="یک تاریخ را انتخاب کنید"
                                        onChange={(date) => {
                                            if (date) formikProps.setFieldValue("endDateDiscount", date);
                                        }}
                                    />
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

export default AddPrice;