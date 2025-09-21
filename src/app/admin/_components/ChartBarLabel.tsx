"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
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

const chartConfig = {
    totalSpent: {
        label: "TotalSpent",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export type Customer = {
    name: string,
    userId: number,
    totalSpent: string
}

interface Props {
    customers: Customer[]
}

export function ChartBarLabel({ customers }: Props) {

    const chartData = customers.map((item) => ({
        name: `${item.name} #${item.userId}`, // الاسم + رقم المستخدم
        totalSpent: parseFloat(item.totalSpent),
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                {/* <CardDescription>Top Customers</CardDescription> */}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 6)}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="var(--chart-2)"
                            tickLine={false}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Bar dataKey="totalSpent" yAxisId="left" fill="var(--color-totalSpent)" radius={8}>
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
                {/* <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this name <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="text-muted-foreground leading-none">
                    Showing total spent per customer
                </div>
            </CardFooter>
        </Card>
    )
}
