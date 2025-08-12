'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CheckInvoice } from '@/services/Invoice';
import { useParams } from 'next/navigation';

const PaymentResult: React.FC<{ data: any }> = ({ data }) => {
    const isSuccess = data.status === 1;
    const params = useParams();

    const fields: { label: string, value?: string | number }[] = [
        { label: 'مبلغ', value: data.amount ? `${data.amount} تومان` : undefined },
        { label: 'شرح', value: data.description },
        { label: 'کد مرجع', value: data.referenceCode },
        { label: 'شماره سریال', value: data.transactionSerial },
        { label: 'کمیسیون شاپرک', value: data.shaparakFee ? `${Number(data.shaparakFee).toLocaleString()} تومان` : undefined },
        { label: 'کارمزد', value: data.fee ? `${Number(data.fee).toLocaleString()} تومان` : undefined },
        { label: 'نوع تراکنش', value: data.type },
        { label: 'کد پیگیری', value: data.authority },
    ];

    return (
        <div className="flex items-center justify-center bg-base-300 p-6 min-h-screen">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-center">
                        <h2 className={`card-title justify-center ${isSuccess ? 'text-success' : 'text-error'}`}>
                            {isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}
                        </h2>
                    </div>

                    <div className="divider" />

                    <div className="space-y-2 text-right text-base">
                        {fields.map((item, index) =>
                            item.value ? (
                                <p key={index}>
                                    <span className="font-semibold">{item.label}:</span> {item.value}
                                </p>
                            ) : null
                        )}
                    </div>

                    <div className="divider" />

                    <a
                        href={`/profile/invoice/${params.id}`}
                        className={`btn btn-block ${isSuccess ? 'btn-success' : 'btn-error'}`}
                    >
                        نمایش فاکتور
                    </a>
                </div>
            </div>
        </div>
    );
};


const Page = () => {
    const params = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['CheckInvoice', params.id],
        queryFn: () => CheckInvoice(params.id),
        enabled: !!params.id,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600">
                <p>خطا در دریافت اطلاعات: {(error as Error).message}</p>
            </div>
        );
    }

    if (!data?.data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>اطلاعاتی یافت نشد</p>
            </div>
        );
    }

    return <PaymentResult data={data.data} />;
};

export default Page;
