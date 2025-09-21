/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { domain } from "@/constant/postman"
import { AddCodeCouponFromUserSchema } from "@/validation/addItems"
import axios from "axios"
import { revalidatePath } from "next/cache"

// export async function createCart(id: number) {
//     try {
//         const res = await axios.post(`${domain}/cart/${id}`)

//         if (res.status !== 200) {
//             return {
//                 status: res.status,
//                 message: "An unexpected error occurred",
//             }
//         }
//         if (res.status === 200) {
//             return {
//                 status: res.status,
//                 message: res.data.message,
//             }
//         }

//         return res.data

//     } catch (error) {
//         console.log(error)
//     }
// }


// export async function deleteCart(id: number) {
//     try {
//         const res = await axios.delete(`${domain}/cart/${id}`)

//         if (res.status !== 200) {
//             return {
//                 status: res.status,
//                 message: "An unexpected error occurred",
//             }
//         }
//         if (res.status === 200) {
//             return {
//                 status: res.status,
//                 message: res.data.message,
//             }
//         }

//         return res.data

//     } catch (error) {
//         console.log(error)
//     }
// }



export async function getCart(token: string) {
    try {
        const res = await axios.get(`${domain}/cart`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (res.status !== 200) {
            return {
                status: res.status,
                message: "An unexpected error occurred",
            }
        }
        if (res.status === 200) {
            return res.data

        }
    } catch (error: any) {
        console.log(error)
        return {
            message: error?.response?.data?.message || 'Unknown error occurred',
            status: 400,
        };
    }
}
export async function getTax(token: string) {
    try {
        const res = await axios.get(`${domain}/tax`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (res.status !== 200) {
            return {
                status: res.status,
                message: "An unexpected error occurred",
            }
        }
        if (res.status === 200) {
            return res.data

        }
    } catch (error) {
        console.log(error)
    }
}

export async function EnterCodeCoupon(
    token: string,
    prevState: unknown,
    formData: FormData
) {


    const result = (await AddCodeCouponFromUserSchema()).safeParse(
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
            `${domain}/cart/coupon`,
            {
                couponName: result.data.couponName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status >= 200 && res.status < 300) {
            revalidatePath(`/cart}`);
            return {
                status: 200,
                message: 'Add Code Coupon successfully',
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
