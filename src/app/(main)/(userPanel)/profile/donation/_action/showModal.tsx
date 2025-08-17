'use client'

import React, {useState} from 'react';
import {Form, Formik} from "formik";

import TextArea from "@/components/input/textArea";
import {useQuery} from "@tanstack/react-query";
import {GetAllDonation, GetDonation} from "@/services/Donation";
import SimpleInput from "@/components/input/simple";



const ShowDonationModal = ({id}:{id:string}) => {



    const {data}=useQuery<ApiResponse<Donate>>({
        queryFn:()=>GetDonation(id),
        queryKey:["donation",id]
    });

    return (
        <dialog id="donationModal" className="modal">
            <div className="modal-box w-auto bg-base-100 dark:bg-base-300 lg:w-[400px]">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">نمایش دونیت</h3>
                <div className="mt-3 space-y-4">
                    <SimpleInput readOnly defaultValue={data?.data.amount} label={"مقدار"} type={"text"}/>
                    <SimpleInput readOnly defaultValue={data?.data.for} label={"برای"}  type={"text"}/>
                    <SimpleInput readOnly defaultValue={data?.data.donationDate} label={"تاریخ دونیت"}
                                 type={"text"}/>

                    <TextArea readOnly defaultValue={data?.data.message}  isShadcn={false}
                              label={"توضیحات"}/>
                </div>
                <div className="modal-action mt-0">
                    <form method="dialog">
                        <button className="btn btn-primary w-full">
                            بستن
                        </button>
                    </form>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
        ;
};

export default ShowDonationModal;