'use client'

import React, {useRef, useState} from 'react';
import {NumberInput} from "@/components/numberformat";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {useMutation} from "@tanstack/react-query";
import { DepositUserWallet} from "@/services/Wallet";
import DaisyInput from "@/components/input/daisyInput";
import {AddDonation} from "@/services/Donation";
import TextArea from "@/components/input/textArea";

const DonationModal = ({type,id}:{type:"course"|'article',id:string}) => {
    const [amount, setAmount] = useState(0);
    const modalRef = useRef<HTMLDialogElement>(null); // ← ref برای مدال

    const presetAmounts = [10000,20000,50000, 100000, 200000,300000];

    const handlePresetClick = (val, formikSetFieldValue) => {
        setAmount(val);
        formikSetFieldValue('amount', val);
    };

    const {mutate,isPending} = useMutation({
        mutationFn: AddDonation,
        onSettled: async (data, error) => {
            if (!error) {
                // بستن مدال بعد از موفقیت
                modalRef.current?.close();
            }
        }
    });

    const handleSubmit = (values) =>  mutate({
        ...values,
        ...(type === "course" ? { courseId: id } : { articleId: id })
    });

    return (
        <dialog ref={modalRef} id="donation" className="modal">
            <div className="modal-box w-auto bg-base-100 dark:bg-base-300 lg:w-[400px]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">حمایت مالی از مدرس</h3>
                <div className="mt-3">
                    <Formik
                        initialValues={{amount: 0, message: ''}}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            amount: Yup.number()
                                .required('وارد کردن مبلغ الزامی است')
                                .min(10000, 'مبلغ باید حداقل ۱۰ هزار باشد')
                                .max(100000000, 'مبلغ باید حداکثر ۱۰۰ میلیون باشد'),
                            message: Yup.string()
                        })}
                    >
                        {(formikProps) => (
                            <Form className="space-y-6">
                                <NumberInput
                                    value={amount}
                                    DaisyInput={DaisyInput}
                                    formikProps={formikProps}
                                    label={"مبلغ دلخواه (تومان)"}
                                    name={"amount"}
                                    id={"number-input"}
                                    placeholder="مبلغ را وارد کنید..."
                                    thousandSeparator={','}
                                    suffix=" تومان"
                                />

                                <div className="grid grid-cols-3 gap-2 mb-4 mt-3">
                                    {presetAmounts.map((val) => (
                                        <button
                                            type="button"
                                            key={val}
                                            className={`btn btn-outline btn-sm ${amount===val ? 'btn-primary':''}`}
                                            onClick={() => handlePresetClick(val, formikProps.setFieldValue)}
                                        >
                                            {val.toLocaleString()} تومان
                                        </button>
                                    ))}
                                </div>

                                <TextArea isShadcn={false} name={"message"} label={"توضیحات شما (اختیاری)"} />

                                <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
                                    ادامه و پرداخت
                                    {isPending && <span className="loading loading-spinner"></span>}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default DonationModal