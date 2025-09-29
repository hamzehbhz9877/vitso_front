'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckTransactionUser } from '@/services/Wallet';
import { useParams } from 'next/navigation';
import Link from "next/link";

const PaymentResult: React.FC<{ data: any }> = ({ data }) => {
    const isSuccess = data.status === 1;

    return (
        <div className="flex  items-center justify-center bg-base-300 p-6">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-center">
                        <h2 className={`card-title justify-center ${isSuccess ? 'text-success' : 'text-error'}`}>
                            {isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}
                        </h2>
                        {/*<p className="text-sm text-gray-500 mt-1">{data.statusFa}</p>*/}
                    </div>

                    <div className="divider" />

                    <div className="space-y-2 text-right text-base">
                        {data.amount?<p><span className="font-semibold">مبلغ:</span> {data.amount} تومان</p>:""}
                        {data.description?<p><span className="font-semibold">شرح:</span> {data.description}</p>:""}
                        {data.referenceCode?<p><span className="font-semibold">کد مرجع:</span> {data.referenceCode}</p>:""}
                        {data?.serial?<p><span className="font-semibold">شماره سریال:</span> {data?.serial}</p>:""}
                        {data.shaparakFee?.toLocaleString()?<p><span className="font-semibold">کمیسیون شاپرک:</span> {data.shaparakFee?.toLocaleString()} تومان</p>:""}
                        {data.fee?.toLocaleString()?<p><span className="font-semibold">کارمزد:</span> {data.fee?.toLocaleString()} تومان</p>:""}
                        {data.type?<p><span className="font-semibold">نوع تراکنش:</span> {data.type}</p>:""}
                        {data.authority?<p><span className="font-semibold">کد پیگیری:</span> {data.authority}</p>:""}
                    </div>

                    <div className="divider" />

                    <Link href="/profile/wallet" className={`btn btn-block ${isSuccess ? 'btn-primary' : 'btn-error'}`}>
                        بازگشت به کیف پول
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const params = useParams();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['CheckTransactionUser', params.id],
        queryFn: () => CheckTransactionUser(params.id),
        enabled: !!params.id, // فقط وقتی پارامتر موجود باشه اجرا کن
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                <p>خطا در دریافت اطلاعات تراکنش: {(error as Error).message}</p>
            </div>
        );
    }

    if (!data?.data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>تراکنشی یافت نشد</p>
            </div>
        );
    }

    return <PaymentResult data={data.data} />;
};

export default Page;
