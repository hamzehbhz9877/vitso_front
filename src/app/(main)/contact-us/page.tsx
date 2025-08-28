'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { RegisterContactUs } from '@/services/ContactUs';

import SimpleInput from '@/components/input/simple';
import TextArea from '@/components/input/textArea';

import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';
import { FaTelegram, FaInstagram, FaLinkedin } from 'react-icons/fa';

const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required('نام الزامی است'),
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
    phone: Yup.string()
        .matches(/^\+?\d{10,15}$/, 'شماره تلفن معتبر نیست')
        .required('شماره تلفن الزامی است'),
    subject: Yup.string().required('موضوع الزامی است'),
    message: Yup.string().required('پیام الزامی است'),
});

const ContactUsPage = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: RegisterContactUs,
    });

    return (
        <div className="container max-w-6xl mx-auto px-4 py-10">
            {/* عنوان و توضیح */}
            <h1 className="text-3xl font-bold text-center mb-4">تماس با ما</h1>
            <p className="text-center text-base-content/70 mb-10">
                برای دریافت مشاوره، ثبت نظر یا ارتباط با تیم پشتیبانی، از راه‌های زیر با ما در تماس باشید.
            </p>

            {/* ساختار دو ستونه */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* ستون اطلاعات تماس */}
                <div className="space-y-6">
                    {/* اطلاعات تماس */}
                    <div className="card  bg-base-300 shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">اطلاعات تماس</h2>
                        <div className="flex items-start gap-3 mb-3">
                            <MdLocationOn className="text-primary min-w-[1.5rem] text-2xl" />
                            <span>تهران، خیابان مرتضوی، ساختمان آموزشگاه X</span>
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                            <MdEmail className="text-primary min-w-[1.5rem] text-2xl" />
                            <a href="mailto:info@vitso.com" className="link">
                                info@vitso.com
                            </a>
                        </div>
                        <div className="flex items-start gap-3">
                            <MdPhone className="text-primary min-w-[1.5rem] text-2xl" />
                            <span dir="ltr">+98 991 564 8288</span>
                        </div>
                    </div>

                    {/* شبکه‌های اجتماعی */}
                    <div className="card  bg-base-300 shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">ما را دنبال کنید</h2>
                        <div className="flex gap-3 text-2xl">
                            <a
                                href="https://t.me/yourchannel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0088cc] hover:text-[#005f99] transition-colors"
                            >
                                <FaTelegram/>
                            </a>
                            <a
                                href="https://instagram.com/yourpage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#E1306C] hover:text-[#ad2252] transition-colors"
                            >
                                <FaInstagram/>
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0077b5] hover:text-[#005582] transition-colors"
                            >
                                <FaLinkedin/>
                            </a>
                        </div>

                    </div>

                    {/* نقشه */}
                    <div className="card  bg-base-300 shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">موقعیت مکانی ما</h2>
                        <iframe
                            src="https://balad.ir/embed?p=ایران،کرمانشاه،میدان-آزادی"
                            className="w-full h-64 rounded-md border border-base-300"
                            loading="lazy"
                            title="نقشه آموزشگاه"
                        />
                    </div>
                </div>

                {/* ستون فرم تماس */}
                <div className="card  bg-base-300 shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-center">فرم ارسال پیام</h2>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, formikHelpers) => {
                            mutate(values, {
                                onSettled: (_, error) => {
                                    if (!error) formikHelpers.resetForm();
                                },
                            });
                        }}
                    >
                        {(formikProps) => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <SimpleInput label="نام" name="name" type="text" />
                                    <SimpleInput label="ایمیل" name="email" type="email" />
                                    <SimpleInput
                                        label="تلفن"
                                        name="phone"
                                        type="tel"
                                        prefix="+98"
                                        className="ltr"
                                    />
                                    <SimpleInput label="موضوع" name="subject" type="text" />
                                </div>

                                <TextArea isShadcn={false} name="message" rows={5} label="پیام شما" />

                                <button
                                    type="submit"
                                    disabled={formikProps.isSubmitting || isPending}
                                    className="btn btn-primary w-full mt-4"
                                >
                                    {isPending ? (
                                        <>
                                            <span className="loading loading-spinner mr-2"></span>
                                            در حال ارسال...
                                        </>
                                    ) : (
                                        'ارسال پیام'
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
