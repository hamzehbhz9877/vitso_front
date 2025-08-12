"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "jalali-moment";

export const description = "نمودار میله‌ای عمودی با برچسب سفارشی";

const chartConfig = {
    sales: {
        label: "مبلغ فروش",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
} satisfies ChartConfig;



export function ChartBarLabelCustom({ weeklySales }: { weeklySales: { date: string; value: number }[] }) {
    // گرفتن تاریخ شروع و پایان از داده‌ها
    const startDate = moment(weeklySales[0]?.date || "2025-08-01", "YYYY-MM-DD");
    const endDate = moment(weeklySales[weeklySales.length - 1]?.date || "2025-08-07", "YYYY-MM-DD");

    // فرمت تاریخ‌ها به شمسی
    const jStart = startDate.locale("fa").format("jDD jMMMM jYYYY"); // مثلا: ۱۰ مرداد ۱۴۰۴
    const jEnd = endDate.locale("fa").format("jDD jMMMM jYYYY");     // مثلا: ۱۶ مرداد ۱۴۰۴

    const jalaliRange = `${jStart} تا ${jEnd}`;

    // تبدیل داده‌ها به فرمت مورد نیاز برای BarChart عمودی (ماه شمسی + مقدار فروش)
    const chartData = weeklySales.map(({ date, value }) => ({
        month: moment(date, "YYYY-MM-DD").locale("fa").format("jDD jMMMM"),
        desktop: value,
    }));



    return (
        <Card>
            <CardHeader>
                <CardTitle>فروش‌های هفتگی</CardTitle>
                <CardDescription>{jalaliRange}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => ""} // برش کوتاه‌تر برای خوانایی
                            hide
                        />
                        <XAxis dataKey="desktop" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent nameKey={"sales"} indicator="line" />}
                        />
                        <Bar
                            dataKey="desktop"
                            fill="#048970"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="left"
                                offset={-8}
                                className="fill-white"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    روند صعودی ۵.۲٪ در این ماه <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    نمایش مجموع فروش در ۷ روز گذشته
                </div>
            </CardFooter>
        </Card>
    );
}
