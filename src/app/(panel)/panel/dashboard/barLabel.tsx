"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

export const description = "A bar chart with a label";

// تنظیمات رنگ شادسی‌ان
const chartConfig = {
    desktop: {
        label: "بازدیدها",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function ChartBarLabel({weeklyViews}) {

    const startDate = moment(weeklyViews[0]?.date, "YYYY-MM-DD")
    const endDate = moment(weeklyViews[weeklyViews.length - 1]?.date, "YYYY-MM-DD")

    const jStart = startDate.locale("fa").format("jDD jMMMM jYYYY"); // مثال: ۰۱ خرداد ۱۴۰۴
    const jEnd = endDate.locale("fa").format("jDD jMMMM jYYYY");     // مثال: ۰۷ خرداد ۱۴۰۴

    const jalaliRange = `${jStart} تا ${jEnd}`;

    return (
        <Card>
            <CardHeader>
                <CardTitle>بازدیدهای هفتگی</CardTitle>
                <CardDescription>{jalaliRange}</CardDescription>

            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={weeklyViews}
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const m = moment(value, "YYYY-MM-DD").locale("fa");
                                return m.format("jDD jMMMM");
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent nameKey={"desktop"} hideLabel />}
                        />
                        <Bar dataKey="value" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
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
                    روند صعودی ۵.۲٪ در این ماه <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="text-muted-foreground leading-none">
                    نمایش مجموع بازدیدها در ۷ روز گذشته
                </div>
            </CardFooter>
        </Card>
    );
}
