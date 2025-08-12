'use client';

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { InvoiceDetail } from "@/services/Invoice";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
    const params = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["invoice", params.id],
        queryFn: () => InvoiceDetail(params.id),
        enabled: !!params.id,
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
            <div className="text-center text-error p-6">
                خطا در دریافت اطلاعات فاکتور: {(error as Error).message}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center p-6 text-base-content/70">
                فاکتوری یافت نشد.
            </div>
        );
    }

    const { courseCount, items, paymentDate, price, status,serial } = data.data;

    return (
        <div className="invoice-detail p-3">
            <h2 className="text-2xl font-extrabold mb-8 text-center border-b-2 border-primary-70 pb-4">
                جزییات فاکتور
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-base mb-8 text-base-content">
                <div className="">
                    <span className="font-semibold">تعداد دوره‌ها:</span> {courseCount}
                </div>
                <div className=" flex items-center gap-2">
                    <span className="font-semibold ">کد پیگیری:</span>
                    <span className="text-base-content">{serial}</span>
                </div>
                <div className=" flex items-center">
                    <span className="font-semibold">وضعیت:</span>
                    <span className={`mr-2 px-3 py-2 rounded-full badge-soft font-semibold ${
                        status === "پرداخت شده"
                            ? "badge  badge-success"
                            : status === "در انتظار پرداخت"
                                ? "badge badge-warning"
                                : "badge badge-error"
                    }`}>
    {status}
  </span>
                </div>
                <div className=" flex items-center gap-2 text-nowrap">
                    <span className="font-semibold">تاریخ پرداخت:</span>
                    {status === "در انتظار پرداخت" || !paymentDate ? (
                        <span
                            className="badge badge-warning rounded-full font-semibold badge-soft px-3 py-2 select-none">
      پرداخت انجام نشده
    </span>
                    ) : (
                        <span className="text-base-content">{paymentDate}</span>
                    )}
                </div>

            </div>

            <div className="overflow-x-auto rounded-lg shadow-md bg-base-100 border border-base-100">
                <table className="table w-full text-center">
                    <thead>
                    <tr>
                        <th>تصویر</th>
                        <th>عنوان دوره</th>
                        <th>قیمت</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items?.map((item: any) => (
                        <tr key={item.courseId} className="hover cursor-pointer">
                            <td className="p-2">
                                <Link href={`/course/${item.slug}`} className="block w-24 h-16">
                                    <Image
                                        width={400}
                                        height={400}
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-16 object-cover rounded-lg"
                                        loading="lazy"
                                    />
                                </Link>
                            </td>
                            <td className="font-semibold">
                                <Link href={`/course/${item.slug}`} className="hover:underline">
                                    {item.title}
                                </Link>
                            </td>
                            <td className="font-semibold text-primary">
                                <Link href={`/course/${item.slug}`} className="hover:underline">
                                    {item.price} تومان
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-end text-xl font-extrabold text-primary">
                مجموع پرداختی: {price} تومان
            </div>
        </div>
    );
};

export default Page;
