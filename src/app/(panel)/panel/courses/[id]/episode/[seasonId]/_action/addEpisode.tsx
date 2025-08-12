import React from 'react';
import { getValidationSchema, getInitialValues } from "./validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SimpleInput from "@/components/input/simple";
import { ModalHeader } from "@/components/modal";
import useModal from "@/hooks/useModal";
import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetForEditSeasons } from "@/services/Season";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarHijriInput } from "@/app/(panel)/_components/datepicker";
import {TimePickerDemo} from "@/components/timePicker";
import {RegisterEpisodes} from "@/services/Episode";

const AddEpisode = () => {
    const { handleClose } = useModal();
    const params = useParams();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: RegisterEpisodes,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({ queryKey: ["episodes"] });
                handleClose();
            }
        }
    });

    const { data: season } = useQuery({
        queryFn: () => GetForEditSeasons(params.seasonId),
        queryKey: ["GetForEditSeason", params.seasonId],
    });

    const handleSubmit = (values) => mutate(values);
    const rawId = params.seasonId;
    const seasonId: string | undefined = Array.isArray(rawId) ? rawId[0] : rawId;
    return (
        <div>
            <ModalHeader>
                <div className="flex items-center justify-between">
                    <span className="text-[16px] font-bold text-[#2F2F2F]">افزودن اپیزد</span>
                    <IoCloseOutline className="cursor-pointer" size={24} color="#2F2F2F" onClick={handleClose} />
                </div>
            </ModalHeader>
            <hr className="border-[#ABAFB1] my-[20px]" />

            <Formik
                initialValues={getInitialValues({ seasonId })}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
            >
                {(formikProps) => {
                    return (
                        <Form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]">
                                <SimpleInput
                                    disabled
                                    readOnly
                                    value={season?.data.title}
                                    label="نام فصل"
                                    name="SeasonId"
                                    type="text"
                                />
                                <SimpleInput label="عنوان" name="title" type="text" />
                                <SimpleInput label="آدرس ویدیو" name="videoUrl" type="url" />
                                <SimpleInput label="اولویت" name="order" type="number" />

                                {/* زمان ویدیو */}
                                <TimePickerDemo  value={formikProps.values.duration} onChange={(data)=>{
                                    formikProps.setFieldValue("duration",data)
                                }}/>

                                <ErrorMessage name="duration">
                                    {(msg) => <div className="text-red-500 text-sm col-span-2">{msg}</div>}
                                </ErrorMessage>

                                {/* تاریخ انتشار */}
                                <CalendarHijriInput
                                    name="publishedAt"
                                    label="تاریخ انتشار اپیزد"
                                    placeholder="یک تاریخ را انتخاب کنید"
                                    onChange={(date) => {
                                        if (date) formikProps.setFieldValue('publishedAt', date);
                                    }}
                                />
                            </div>

                            {/* رایگان بودن */}
                            <div className="flex items-center mb-4 mt-4">
                                <Field name="isFree">
                                    {({ field, form, meta }) => (
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    form.setFieldValue(field.name, checked);
                                                }}
                                            />
                                            <label htmlFor="isFree" className="text-sm pr-2">
                                                رایگان
                                            </label>
                                            {meta.touched && meta.error && (
                                                <div className="text-red-500 text-sm">{meta.error}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <Button isPending={isPending} type="submit" disabled={isPending} variant="default">
                                ثبت اطلاعات
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default AddEpisode;
