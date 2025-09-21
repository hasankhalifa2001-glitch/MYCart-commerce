"use server";

import { domain } from "@/constant/postman";
import axios from "axios";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getTopCustomers(token: string) {
    try {
        const res = await fetch(`${domain}/top-customers?limit=10`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (!res.ok) {
            return {
                status: res.status,
                message: "An unexpected error occurred",
            };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getOrderStatus(token: string, groupBy: string, startDate: Date, endDate: Date) {
    try {
        const res = await axios.get(`${domain}/order-stats?groupBy=${groupBy}&startDate=${format(startDate, "yyyy-MM-dd")}&endDate=${format(endDate, "yyyy-MM-dd")}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                groupBy,
            }
        });
        // const result = await res.json();
        revalidatePath('/admin')
        return res.data
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
