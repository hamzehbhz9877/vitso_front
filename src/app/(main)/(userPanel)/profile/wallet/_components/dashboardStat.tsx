'use client'

import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {StudentDashboard} from "@/services/Dashboard";
import {FaBookOpen, FaComments, FaCreditCard, FaFileInvoice} from "react-icons/fa";
const stats = [
    {
        key: 'countCourses',
        title: 'تعداد دوره‌ها',
        icon: <FaBookOpen className="text-primary text-3xl" />
    },
    {
        key: 'countComments',
        title: 'تعداد نظرات',
        icon: <FaComments className="text-primary text-3xl" />
    },
    {
        key: 'countInvoices',
        title: 'فاکتورها',
        icon: <FaFileInvoice className="text-primary text-3xl" />
    },
    {
        key: 'countTransactions',
        title: 'تراکنش‌ها',
        icon: <FaCreditCard className="text-primary text-3xl" />
    }
]
const DashboardStat = () => {
    const { data, isLoading } = useQuery({
        queryFn: StudentDashboard,
        queryKey: ['StudentDashboard']
    })


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {isLoading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="h-28 w-full bg-gray-50 dark:bg-gray-700 skeleton rounded-xl"></div>
                ))
                : stats.map((stat) => (
                    <div
                        key={stat.key}
                        className="card bg-base-100 dark:bg-base-200 shadow-md border border-base-200 dark:border-base-300"
                    >
                        <div className="card-body flex flex-row items-center gap-4">
                            {stat.icon}
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                                <h2 className="text-2xl font-bold text-primary dark:text-white">
                                    {data?.data[stat.key] ?? 0}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default DashboardStat;