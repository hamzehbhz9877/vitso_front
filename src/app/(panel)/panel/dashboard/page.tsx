'use client';

import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Card, CardContent, CardHeader} from "@/components/ui/card"

import {
    FaUsers,
    FaBookOpen,
    FaFileAlt,
    FaComments,
} from 'react-icons/fa';

import {CardDescription, CardTitle} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

import {AdminDashboard} from '@/services/Dashboard';
import {ChartAreaDefault} from "@/app/(panel)/panel/dashboard/chartArea";
import {ChartLineLabel} from "@/app/(panel)/panel/dashboard/line";
import {ChartBarLabelCustom} from "@/app/(panel)/panel/dashboard/bar";
import {ChartBarLabel} from "@/app/(panel)/panel/dashboard/barLabel";
import {StatsGrid} from "@/app/(panel)/panel/dashboard/statGrid";

const stats = [
    {key: 'countUsers', title: 'تعداد کاربران', icon: <FaUsers className=" w-5 h-5"/>},
    {key: 'countCourses', title: 'تعداد دوره‌ها', icon: <FaBookOpen className=" w-5 h-5"/>},
    {key: 'countArticles', title: 'تعداد مقالات', icon: <FaFileAlt className=" w-5 h-5"/>},
    {key: 'countComments', title: 'تعداد نظرات', icon: <FaComments className=" w-5 h-5"/>},
];


export default function DashboardStat() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['AdminDashboard'],
        queryFn: AdminDashboard,
    });

    if (error)
        return (
            <div role="alert" className="p-6 text-red-600 font-semibold">
                خطا در دریافت داده‌ها
            </div>
        );

    if (isLoading)
        return (
            <div>
                <h2 className={"text-xl font-bold mb-4 px-2"}>داشبورد</h2>

                <div className={"space-y-5"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {Array.from({length: 4}).map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="h-5 bg-muted-foreground/20 rounded w-1/2"/>
                                    <div
                                        className="bg-muted flex size-12 items-center justify-center rounded-full border"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-7 bg-muted-foreground/30 rounded w-1/3"/>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Array.from({length: 4}).map((_, i) => (
                            <Card key={i} className="h-[300px] flex flex-col">
                                <CardHeader>
                                    <CardTitle>
                                        <Skeleton className="h-5 w-2/3"/>
                                    </CardTitle>
                                    <CardDescription>
                                        <Skeleton className="h-4 w-1/2 mt-2"/>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-end">
                                    <Skeleton className="h-[150px] w-full rounded-md"/>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>


        );

    return (
        <div className="admin-dashboard">
        <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>داشبورد</h2>
            <div className="space-y-5">
                <StatsGrid stats={stats} data={data?.data ?? {}}/>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ChartBarLabel weeklyViews={data?.data.weeklyViews ?? []}/>
                    <ChartBarLabelCustom weeklySales={data?.data.weeklySales ?? []}/>
                    <ChartAreaDefault weeklyUserRegistrations={data?.data.weeklyUserRegistrations ?? []}/>
                    <ChartLineLabel weeklyTransactions={data?.data.weeklyTransactions ?? []}/>
                </div>
            </div>

        </div>
    );
}
