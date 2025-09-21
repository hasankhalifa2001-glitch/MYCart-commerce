"use client"

import { GitCommitVertical, TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { domain } from "@/constant/postman"
import axios from "axios"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input" // تأكد أنه مضاف من shadcn

export const description = "A line chart with custom dots"

const chartConfig = {
    totalSpent: {
        label: "Total Spent",
        color: "var(--chart-3)",
    },
} satisfies ChartConfig

export type Customer = {
    name: string
    userId: number
    totalSpent: string
}

interface Props {
    token: string
}

export function ChartLineDotsCustom({ token }: Props) {
    const [limit, setLimit] = useState<number>(6)
    const [data, setData] = useState<{ name: string; totalSpent: number }[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `${domain}/top-customers?limit=${limit}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                )
                const chartData = res.data.customers.map((item: Customer) => ({
                    name: `${item.name} #${item.userId}`,
                    totalSpent: parseFloat(item.totalSpent),
                }))

                setData(chartData)
            } catch (err) {
                console.error("Fetch error:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [token, limit])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Last {limit} Customers by Spending</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <Input
                        type="number"
                        min={1}
                        max={50}
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="w-24"
                        placeholder="Limit"
                    />
                </div>

                {/* Chart */}
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={data}
                        margin={{ left: 12, right: 12 }}
                        width={500}
                        height={300}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 6)}

                        />
                        <YAxis
                            stroke="var(--chart-3)"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                            dataKey="totalSpent"
                            type="natural"
                            stroke="var(--color-totalSpent)"
                            strokeWidth={2}
                            dot={({ cx, cy, payload }) => {
                                const r = 24
                                return (
                                    <GitCommitVertical
                                        key={payload.name}
                                        x={cx - r / 2}
                                        y={cy - r / 2}
                                        width={r}
                                        height={r}
                                        fill="hsl(var(--background))"
                                        stroke="var(--color-desktop)"
                                    />
                                )
                            }}
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
                <div className="flex items-center gap-2 leading-none font-medium">
                    {loading ? "Loading..." : "Auto updated"}{" "}
                    {!loading && <TrendingUp className="h-4 w-4" />}
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing top {limit} customers
                </div>
            </CardFooter>
        </Card>
    )
}
