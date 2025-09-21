"use server"

import { domain } from "@/constant/postman"
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

export async function getAllOrdersByAdmin(token: string) {
    try {
        const res = await fetch(`${domain}/order/all`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (!res.ok) {
            return {
                status: res.status,
                message: "An unexpected error occurred",
            };
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error)
    }
}


export async function updateOrderByAdmin(token: string, id: number) {
    try {
        const res = await fetch(`${domain}/order/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isPaid: true,
                isDeliverd: true
            })
        });
        if (!res.ok) {
            console.log(res)
            return {
                status: res.status,
                message: "An unexpected error occurred",
            };
        }
        revalidatePath('/admin/orders')
        revalidatePath('/cart')
        return {
            status: res.status,
            message: "An order is updated",
        };
    } catch (error) {
        console.log(error);
    }
}


export async function getAllOrdersByUser(token: string) {
    try {
        const res = await fetch(`${domain}/order`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (!res.ok) {
            return {
                status: res.status,
                message: "An unexpected error occurred",
            };
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log(error)
    }
}


export async function reOredr(token: string, id: number) {
    try {
        const res = await fetch(`${domain}/order/reorder/${id}`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/json'
            },
        });
        if (!res.ok) {
            console.log(res)
            return {
                status: res.status,
                message: "An unexpected error occurred",
            };
        }
        revalidatePath('/orders')
        return {
            status: res.status,
            message: "An order is reorder",
        };
    } catch (error) {
        console.log(error);
    }
}