"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    // Line,
    // LineChart,
    XAxis,
    YAxis,
} from "recharts";

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { domain } from "@/constant/postman";
import axios from "axios";

interface OrderStat {
    period: string;
    ordersCount: number;
    totalRevenue: number;
}

const chartConfig = {
    ordersCount: {
        label: "Orders Count",
        color: "var(--chart-2)",
    },
    totalRevenue: {
        label: "Total Revenue",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

interface Props {
    token: string;
}

export default function OrderStatsDashboard({ token }: Props) {
    const [groupBy, setGroupBy] = useState<"day" | "month" | "year">("day");
    const [startDate, setStartDate] = useState<Date | undefined>(
        new Date("2025-08-30")
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        new Date("2025-09-30")
    );
    const [data, setData] = useState<OrderStat[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${domain}/order-stats?groupBy=${groupBy}&startDate=${format(
                        startDate,
                        "yyyy-MM-dd"
                    )}&endDate=${format(endDate, "yyyy-MM-dd")}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                setData(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [groupBy, startDate, endDate, token]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Statistics</CardTitle>
                <CardDescription>
                    Grouped by <span className="font-semibold">{groupBy}</span> | From{" "}
                    {startDate ? format(startDate, "yyyy-MM-dd") : "?"} To{" "}
                    {endDate ? format(endDate, "yyyy-MM-dd") : "?"}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Group By Select */}
                    <Select
                        value={groupBy}
                        onValueChange={(val) => setGroupBy(val as "day" | "month" | "year")}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Group By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Daily</SelectItem>
                            <SelectItem value="month">Monthly</SelectItem>
                            <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Start Date Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-[160px] justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                            >
                                {startDate ? format(startDate, "yyyy-MM-dd") : "Start Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                            />
                        </PopoverContent>
                    </Popover>

                    {/* End Date Picker */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-[160px] justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                {endDate ? format(endDate, "yyyy-MM-dd") : "End Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Chart */}
                <ChartContainer config={chartConfig}>
                    <BarChart data={data} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                groupBy === "day" ? value.slice(5) : value
                            }
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="var(--chart-2)"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="var(--chart-4)"
                            tickLine={false}
                            axisLine={false}
                            // format currency
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        {/* <ChartTooltip
                            content={<ChartTooltipContent indicator="dashed" />}
                        /> */}
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />

                        <Bar
                            dataKey="ordersCount"
                            yAxisId="left"
                            type="monotone"
                            fill="var(--chart-2)"
                            radius={4}
                        />
                        <Bar
                            dataKey="totalRevenue"
                            yAxisId="right"
                            type="monotone"
                            fill="var(--chart-4)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            {loading ? "Loading..." : "Auto updated"}{" "}
                            {!loading && <TrendingUp className="h-4 w-4" />}
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Displays orders count and revenue based on selected filters
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
