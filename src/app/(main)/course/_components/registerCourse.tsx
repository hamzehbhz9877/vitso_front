import React from 'react';
import {GraduationCap} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RequestShoppingCartAddItem} from "@/services/ShoppingCart";
import Countdown from "@/components/countdown";

const RegisterCourse = ({discountPercentage,isStudentOfCourse
                            ,payablePrice,id,price,completionPercentage,discountRemaining}:
                        Pick<Course,'isStudentOfCourse'|'discountRemaining'|'completionPercentage'| 'price'|'discountPercentage'|'payablePrice'|'id'>) => {


    const queryClient=useQueryClient();
    const {mutate, isPending} = useMutation({mutationFn: RequestShoppingCartAddItem,onSettled:(_,error)=>{
        if(!error){
            queryClient.invalidateQueries({queryKey:["shoppingCart"]});
        }
        }});

    return (
        <div>
            <div className={"flex flex-col gap-1 mt-1"}>

                <div className={"flex justify-between text-sm"}>
                    <span className={"font-bold "}>درصد تکمیل دوره</span>
                    <span className={"font-bold"}>%{completionPercentage}</span>
                </div>

                <progress className="progress progress-primary h-[8px] w-full" value={completionPercentage}
                          max="100"></progress>
            </div>

            {discountRemaining?  <div className="text-center w-full bg-[#f2f6fc] dark:bg-base-200 rounded-lg p-2.5 mt-5">
                <div className="timet-new-onvan text-red-500 mb-[20px] font-bold">{discountPercentage}% پیشنهاد شگفت
                    انگیز
                    <div className="timet-new-onvane"></div>
                </div>

                 <Countdown discountRemaining={discountRemaining}/>
            </div>:""}


            <div className={"mt-5 flex justify-between  items-center"}>

                {isStudentOfCourse?
                <span className={"text-xs text-success badge badge-soft badge-sm px-3 py-4"}>شما دانشجوی این دوره هستید</span>:
                <button className={"btn btn-primary"} disabled={isPending}
                        onClick={() => mutate({courseId: id})}>
                    <GraduationCap size={20}/>
                    ثبت نام در دوره
                    {isPending ? <span className="loading loading-spinner"></span> : ""}

                </button>}
                <div className="flex items-center gap-x-2.5">
                    {discountPercentage ? <div className="flex flex-col">
                                        <span
                                            className="text-sm text-slate-500 dark:text-white/70 -mb-1.5 line-through">{price}</span>
                        <span className=" text-lg font-bold">
                            {payablePrice} <span className="font-bold text-base">تومان</span>
                                        </span>
                    </div> : <span className="font-bold text-lg">
                            {payablePrice} <span className="text-base">تومان</span>
                                        </span>}
                </div>
            </div>
        </div>
    );
};

export default RegisterCourse;