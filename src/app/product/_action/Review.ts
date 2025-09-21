/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { domain } from "@/constant/postman";
import { AddReviewSchema, UpdateReviewSchema } from "@/validation/addItems";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function AddReview(
    arg: { token: string; id: number; rating: number },
    prevState: unknown,
    formData: FormData
) {
    const { id, token, rating } = arg;

    const result = (await AddReviewSchema()).safeParse(
        Object.fromEntries(formData)
    );

    if (!result.success) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    try {
        const res = await axios.post(
            `${domain}/review/create`,
            {
                review_text: result.data.Review,
                rating,
                product: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status >= 200 && res.status < 300) {
            revalidatePath(`/product/${id}`);
            return {
                status: 200,
                message: 'Create Review successfully',
            };
        }

        return {
            message: 'Unexpected response from server',
            status: res.status,
        };
    } catch (error: any) {
        console.log(error);
        return {
            message: error?.response?.data?.message || 'Unknown error occurred',
            status: 400,
        };
    }
}
export async function UpdateReview(
    arg: { token: string; id: number; rating: number },
    prevState: unknown,
    formData: FormData
) {
    const { id, token, rating } = arg;

    const result = (await UpdateReviewSchema()).safeParse(
        Object.fromEntries(formData)
    );

    if (!result.success) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    try {
        const res = await axios.patch(
            `${domain}/review/${id}`,
            {
                review_text: result.data.Review,
                rating,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status >= 200 && res.status < 300) {
            revalidatePath(`/product/${id}`);
            return {
                status: 200,
                message: 'Update Review successfully',
            };
        }

        return {
            message: 'Unexpected response from server',
            status: res.status,
        };
    } catch (error: any) {
        console.log(error);
        return {
            message: error?.response?.data?.message || 'Unknown error occurred',
            status: 400,
        };
    }
}


export async function getReview(id: number, token: string) {
    try {
        const res = await axios.get(`${domain}/review/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}