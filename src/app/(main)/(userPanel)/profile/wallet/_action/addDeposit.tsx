'use client'

import React, {useState} from 'react';
import {NumberInput} from "@/components/numberformat";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {cn} from "@/lib/utils";
import {useMutation} from "@tanstack/react-query";
import { DepositUserWallet} from "@/services/Wallet";

const DaisyInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className,type, ...props },ref) => {
    return <input
        type={type}
        className={cn("input input-bordered w-full",className)}
        ref={ref}
        {...props}
    />
});

const AddDeposit = () => {

    const [amount, setAmount] = useState(0);

    const presetAmounts = [50000,100000,200000, 400000, 500000,1000000];

    const handlePresetClick = (val) => {
        setAmount(val);
    };

    const {mutate,isPending}=useMutation({
        mutationFn:DepositUserWallet,onSettled: async (data, error) => {
            if (!error) {
                window.location=data.data
            }
        }
    });

    const handleSubmit = (values) => mutate(values)

    return (
        <dialog id="addDeposit" className="modal">
            <div className="modal-box w-full lg:w-[400px]">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">شارژ کیف پول</h3>


                <div className="mt-3">
                    <Formik
                        initialValues={{amount: 0}}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            amount: Yup.number()
                                .required('وارد کردن مبلغ الزامی است')
                                .min(10000, 'مبلغ باید حداقل ۱۰ هزار باشد')
                                .max(100000000, 'مبلغ باید حداکثر ۱۰۰ میلیون باشد'),
                        })}
                    >
                        {(formikProps) => {
                            return <Form>
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
                                            type={"button"}
                                            key={val}
                                            className="btn btn-outline btn-sm"
                                            onClick={() => handlePresetClick(val)}
                                        >
                                            {val.toLocaleString()} تومان
                                        </button>
                                    ))}
                                </div>

                                <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
                                    ادامه و پرداخت
                                    {isPending?<span className="loading loading-spinner"></span>:""}
                                </button>
                            </Form>
                        }}
                    </Formik>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
        ;
};

export default AddDeposit;