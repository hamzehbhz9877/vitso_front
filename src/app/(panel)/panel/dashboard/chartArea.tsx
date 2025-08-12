"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import moment from "jalali-moment"

export const description = "A simple area chart"

const chartConfig = {
    desktop: {
        label: "ثبت‌ نام‌ها",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartAreaDefault({
                                   weeklyUserRegistrations,
                               }: {
    weeklyUserRegistrations: { date: string; value: number }[]
}) {
    if (!weeklyUserRegistrations?.length) return null

    const startDate = moment(weeklyUserRegistrations[0].date, "YYYY-MM-DD")
    const endDate = moment(
        weeklyUserRegistrations[weeklyUserRegistrations.length - 1].date,
        "YYYY-MM-DD"
    )

    const jStart = startDate.locale("fa").format("jDD jMMMM jYYYY")
    const jEnd = endDate.locale("fa").format("jDD jMMMM jYYYY")

    const jalaliRange = `${jStart} تا ${jEnd}`

    return (
        <Card>
            <CardHeader>
                <CardTitle>ثبت‌نام‌های هفتگی کاربران</CardTitle>
                <CardDescription>{jalaliRange}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={weeklyUserRegistrations}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                moment(value, "YYYY-MM-DD").locale("fa").format("jDD")
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    // indicator="area"
                                    nameKey="desktop"
                                    hideLabel
                                />
                            }
                        />
                        <Area
                            dataKey="value"
                            type="natural"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            روند صعودی ۵.۲٪ در این ماه <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            نمایش مجموع ثبت‌نام‌ها در ۷ روز گذشته
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
