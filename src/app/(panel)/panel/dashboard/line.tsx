"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
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

export const description = "A line chart with a label"

const chartConfig = {
    desktop: {
        label: "تراکنش ‌ها",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineLabel({ weeklyTransactions }: { weeklyTransactions: { date: string, value: number }[] }) {
    if (!weeklyTransactions?.length) return null

    const startDate = moment(weeklyTransactions[0]?.date, "YYYY-MM-DD")
    const endDate = moment(weeklyTransactions[weeklyTransactions.length - 1]?.date, "YYYY-MM-DD")

    const jStart = startDate.locale("fa").format("jDD jMMMM jYYYY")
    const jEnd = endDate.locale("fa").format("jDD jMMMM jYYYY")

    const jalaliRange = `${jStart} تا ${jEnd}`

    return (
        <Card>
            <CardHeader>
                <CardTitle>تراکنش‌های هفتگی</CardTitle>
                <CardDescription>{jalaliRange}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={weeklyTransactions}
                        margin={{ top: 20, left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const m = moment(value, "YYYY-MM-DD").locale("fa");
                                return m.format("jDD");
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    nameKey="desktop"
                                    hideLabel
                                />
                            }
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-desktop)" }}
                            activeDot={{ r: 6 }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    روند صعودی ۵.۲٪ در این ماه <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    نمایش مجموع تراکنش‌ها در ۷ روز گذشته
                </div>
            </CardFooter>
        </Card>
    )
}
