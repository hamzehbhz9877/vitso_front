'use client'
import React, {useMemo, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {FaAngleRight} from "react-icons/fa6";
import {
    getInitialValues,
    getValidationSchema
} from "@/app/(panel)/panel/courses/[id]/episode/[seasonId]/_action/validation";
import {capitalizeKeys, convertDateToJalaliString, formatDate, formatSpeed, objectToFormData} from "@/lib/utils";
import {ErrorMessage, Field, Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {TimePickerDemo} from "@/components/timePicker";
import {CalendarHijriInput} from "@/app/(panel)/_components/datepicker";
import {Checkbox} from "@/components/ui/checkbox";
import InputDemo from "@/components/input-12";
import {useParams, useRouter} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import {EditEpisodes, GetForEditEpisodes} from "@/services/Episode";
import {Progress} from "@/components/ui/progress";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

const EditEpisodePage = () => {
    const params = useParams();
    const router = useRouter();
    const [uploadStarted, setUploadStarted] = useState(false);

    const episodeId = Array.isArray(params.episodeId) ? params.episodeId[0] : params.episodeId;

    const [progress, setProgress] = useState<number>(0);
    const [controller, setController] = useState<AbortController | null>(null);
    const [uploadTime, setUploadTime] = useState<number>(0);
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
    const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);

    const uploadStartTimeRef = useRef<number | null>(null);
    const fileSizeRef = useRef<number | null>(null);

    // ✅ گرفتن اطلاعات جلسه برای پر کردن فرم
    const {data: episode, isPending: episodePending} = useQuery({
        queryFn: () => GetForEditEpisodes(episodeId),
        queryKey: ["GetForEditEpisode", episodeId],
        enabled: !!episodeId,
    });

    // ✅ آپدیت جلسه
    const {mutate, isPending} = useMutation({
        mutationFn: (values: any) => {
            const abortController = new AbortController();
            setController(abortController);

            const file = values.VideoFile;
            if (file) fileSizeRef.current = file.size;

            // ← اینجا اضافه کن
            setUploadStarted(true);

            setProgress(0);
            setUploadTime(0);
            setEstimatedTime(null);
            setUploadSpeed(null);
            uploadStartTimeRef.current = Date.now();

            let res = {}
            if (typeof values.VideoFile === "string") {
                const {VideoFile, ...rest} = values;
                res = {VideoFile: 'null', ...rest}
            } else {
                res = values
            }
            const data = objectToFormData(res);
            return EditEpisodes(episodeId, data, {
                onProgress: (p) => {
                    setProgress(p);

                    if (uploadStartTimeRef.current && fileSizeRef.current) {
                        const elapsedSec = (Date.now() - uploadStartTimeRef.current) / 1000;
                        setUploadTime(Math.floor(elapsedSec));

                        if (p > 0) {
                            const remaining = Math.round(elapsedSec * (100 - p) / p);
                            setEstimatedTime(remaining);
                        }

                        const uploadedBytes = (p / 100) * fileSizeRef.current;
                        const speedBps = uploadedBytes / elapsedSec;
                        setUploadSpeed(speedBps);
                    }
                },
                signal: abortController.signal,
            });
        },
        onSettled: () => {
            setUploadStarted(false);
            setController(null);
            setProgress(0);
            setUploadTime(0);
            setEstimatedTime(null);
            setUploadSpeed(null);
            uploadStartTimeRef.current = null;
            fileSizeRef.current = null;
        }
    });

    const handleSubmit = (values: any) => mutate(values);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "--:--";
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }


    return (
        <div className="container mx-auto">
            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline" onClick={() => router.back()}>
                    <FaAngleRight/>
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">ویرایش جلسه</h2>
            </div>

            <Formik
                initialValues={getInitialValues(capitalizeKeys(episode?.data))}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={getValidationSchema()}
            >
                {(formikProps) => (
                    <Form className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-[35%] space-y-4">
                                <Card>
                                    <CardHeader>
                                        <h3 className="font-bold">جزییات جلسه</h3>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <SimpleInput
                                            label="عنوان"
                                            name="Title"
                                            type="text"
                                        />
                                        <SimpleInput label="اولویت" name="Order" type="number"/>

                                        <TimePickerDemo
                                            value={formikProps.values.Duration}
                                            onChange={(data) => formikProps.setFieldValue("Duration", data)}
                                        />
                                        <ErrorMessage name="duration">
                                            {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
                                        </ErrorMessage>

                                        <CalendarHijriInput
                                            initValue={formikProps.values.PublishedAt?.split(" ")[0]}
                                            name="PublishedAt"
                                            label="تاریخ انتشار جلسه"
                                            placeholder="یک تاریخ را انتخاب کنید"
                                            onChange={(date) => {
                                                if (date) formikProps.setFieldValue('PublishedAt', date);
                                            }}
                                        />

                                        <div className="flex items-center mb-4 mt-4">
                                            <Field name="IsFree">
                                                {({field, form, meta}) => (
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(checked) => {
                                                                form.setFieldValue(field.name, checked);
                                                            }}
                                                        />
                                                        <label htmlFor="IsFree" className="text-sm">
                                                            رایگان
                                                        </label>
                                                        {meta.touched && meta.error && (
                                                            <div className="text-red-500 text-sm">{meta.error}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex-[65%] min-w-0 space-y-3">
                                <InputDemo
                                    name={"VideoFile"}
                                    title={"آپلود ویدیو"}
                                    dropzoneOptions={{maxSize: 1024 * 1024 * 150, accept: {"video/*": ["mp4"]}}}
                                    defaultData={formikProps.values.VideoFile}
                                    onChange={(file) => formikProps.setFieldValue("VideoFile", file)}
                                />
                                <div className="text-center">
                                    <Button isPending={isPending} type="submit" disabled={isPending} variant="default">
                                        {isPending ? "در حال آپلود..." : "ویرایش تغییرات"}
                                    </Button>
                                </div>

                                {uploadStarted && (
                                    <div className="space-y-2">
                                        <Progress value={progress} className="w-full"/>

                                        <div
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="flex flex-wrap gap-4">
                                                <span className="text-sm font-medium">{progress}%</span>
                                                <span className="text-sm">زمان سپری شده: {formatTime(uploadTime)}</span>
                                                <span
                                                    className="text-sm">زمان باقی‌مانده: {formatTime(estimatedTime)}</span>
                                                <span className="text-sm">سرعت: {formatSpeed(uploadSpeed)}</span>
                                            </div>

                                            {controller && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="self-start sm:self-auto"
                                                    onClick={() => controller.abort()}
                                                >
                                                    لغو آپلود
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditEpisodePage;
