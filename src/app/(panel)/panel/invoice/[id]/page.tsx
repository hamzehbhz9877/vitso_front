'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { InvoiceDetail } from '@/services/Invoice'
import {useParams, useRouter} from 'next/navigation'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import {Button} from "@/components/ui/button";
import {FaAngleRight} from "react-icons/fa6";

const Page = () => {
    const params = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['invoice', params.id],
        queryFn: () => InvoiceDetail(params.id),
        enabled: !!params.id,
    })

    const router=useRouter()

    if (isLoading) {
        return (
            <div className="p-4 space-y-6">
                {/* اسکلت کارت اطلاعات */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3 mx-auto mb-2 bg-gray-200"/>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid md:grid-cols-3 gap-4 text-base">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <Skeleton className="h-4 w-24 bg-gray-200"/>
                                    <Skeleton className="h-4 w-32 bg-gray-200"/>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* اسکلت لیست دوره‌ها */}
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-1/4 mb-2 bg-gray-200"/>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="w-24 h-16 rounded-md bg-gray-200"/>
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4 bg-gray-200"/>
                                    <Skeleton className="h-4 w-1/3 bg-gray-200"/>
                                </div>
                                <Skeleton className="h-4 w-24 bg-gray-200"/>
                            </div>
                        ))}
                        <div className="flex justify-center">
                            <Skeleton className="h-6 w-32 bg-gray-200"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center text-destructive p-6">
                خطا در دریافت اطلاعات فاکتور: {(error as Error).message}
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center p-6 text-muted-foreground">
                فاکتوری یافت نشد.
            </div>
        )
    }

    const {courseCount, items, paymentDate, price, status,fullName,
        serial} = data.data

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'پرداخت شده':
                return (
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 ml-1"/> پرداخت شده
                    </Badge>
                )
            case 'در انتظار پرداخت':
                return (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Clock className="w-4 h-4 ml-1"/> در انتظار پرداخت
                    </Badge>
                )
            case 'لغو شده':
                return (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        <XCircle className="w-4 h-4 ml-1"/> لغو شده
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-2 items-center mb-3">
                <Button variant="outline">
                    <FaAngleRight onClick={() => router.back()}/>
                </Button>
                <h2 className="text-xl font-bold lg:text-2xl">جزییات فاکتور</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        جزییات
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid md:grid-cols-3 gap-4 text-base">
                        <div className="flex gap-2 items-center">
                            <span>نام و نام خانوادگی:</span>
                            {fullName}
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>تاریخ پرداخت:</span>
                            {status === 'در انتظار پرداخت' || !paymentDate ? (
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                    پرداخت انجام نشده
                                </Badge>
                            ) : (
                                <span>{paymentDate}</span>
                            )}
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>کد پیگیری:</span>
                            {serial}
                        </div>
                        <div className="flex gap-2 items-center">
                            <span>وضعیت:</span>
                            {getStatusBadge(status)}
                        </div>

                        <div className="flex gap-2 items-center">
                            <span>تعداد دوره‌ها:</span> {courseCount}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>لیست دوره‌ها</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto ">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>تصویر</TableHead>
                                <TableHead>عنوان دوره</TableHead>
                                <TableHead>قیمت</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items?.map((item: any, index: number) => (
                                <TableRow
                                    key={item.courseId}

                                >
                                    <TableCell className="text-center">
                                        <Link href={`/course/${item.slug}`}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-18 h-14 object-cover rounded-lg mx-auto"
                                                loading="lazy"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center font-medium">
                                        <Link href={`/course/${item.slug}`} className="hover:underline">
                                            {item.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-primary">
                                        {item.price} تومان
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    <h3 className={"pt-6 flex justify-end text-xl font-extrabold text-primary"}>
                        مجموع پرداختی: {price} تومان
                    </h3>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page
