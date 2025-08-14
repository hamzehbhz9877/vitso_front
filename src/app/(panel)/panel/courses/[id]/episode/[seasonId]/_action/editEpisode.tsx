import React, {useEffect, useState} from "react";
import { getValidationSchema, getInitialValues } from "./validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import SimpleInput from "@/components/input/simple";
import useModal from "@/hooks/useModal";
import { IoCloseOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetForEditSeasons } from "@/services/Season";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarHijriInput } from "@/app/(panel)/_components/datepicker";
import { parseJalaliDateToDate } from "@/lib/utils";
import { TimePickerDemo } from "@/components/timePicker";
import { EditEpisodes, GetForEditEpisodes } from "@/services/Episode";
import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

const EditEpisode = ({ id }: { id: string }) => {
    const { handleClose } = useModal();

    const [datePicker, setDatePicker] = useState<Date | null>(new Date());
    const params = useParams();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: EditEpisodes,
        onSettled: async (_, error) => {
            if (!error) {
                queryClient.invalidateQueries({ queryKey: ["episodes"] });
                handleClose();
            }
        },
    });

    const { data: season } = useQuery({
        queryFn: () => GetForEditSeasons(params.seasonId),
        queryKey: ["GetForEditSeason", params.seasonId],
    });

    const { data: episode } = useQuery({
        queryFn: () => GetForEditEpisodes(id),
        queryKey: ["GetForEditEpisodes", id],
    });

    const handleSubmit = (values: any) => mutate({id,data: {...values,publishedAt:values.publishedAt.split(" ")[0]}});

    const isFreeValue = episode?.data?.isFree !== "غیر رایگان";

    useEffect(() => {
        if(episode?.data)
            setDatePicker(  parseJalaliDateToDate(episode?.data?.publishedAt.split(" ")[0]));
    }, [episode]);
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>ویرایش جلسه</DialogTitle>
            </DialogHeader>

            <Formik
                initialValues={getInitialValues({ isEdit: true, ...episode?.data, isFree: isFreeValue })}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={getValidationSchema(true)}
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
                                <TimePickerDemo
                                    value={formikProps.values.duration}
                                    onChange={(val) => formikProps.setFieldValue("duration", val)}
                                />

                                <ErrorMessage name="duration">
                                    {(msg) => <div className="text-red-500 text-sm col-span-2">{msg}</div>}
                                </ErrorMessage>

                                {/* تاریخ انتشار */}
                                <CalendarHijriInput
                                    initialDate={episode?.data?.publishedAt ? parseJalaliDateToDate(episode?.data?.publishedAt?.split(" ")[0]) : undefined}
                                    initValue={ episode?.data?.publishedAt?.split(" ")[0]}                                    name="publishedAt"
                                    label="تاریخ انتشار جلسه"
                                    placeholder="یک تاریخ را انتخاب کنید"
                                    onChange={(date) => {
                                        if (date) formikProps.setFieldValue("publishedAt", date);
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
                                            <label htmlFor="isFree" className="text-sm ">
                                                رایگان
                                            </label>
                                            {meta.touched && meta.error && (
                                                <div className="text-red-500 text-sm">{meta.error}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <Button
                                isPending={isPending}
                                type="submit"
                                disabled={isPending}
                                variant="default"
                            >
                                ویرایش اطلاعات
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </DialogContent>
    );
};

export default EditEpisode;
