"use server"

import { domain } from "@/constant/postman";
import { AddCodeCouponFromUserSchema, AddCouponSchema } from "@/validation/addItems";
import { revalidatePath } from "next/cache";

export async function createCoupon(
    token: string,
    prevState: unknown,
    formData: FormData
) {
    console.log(formData);

    const result = (await AddCouponSchema()).safeParse(
        Object.fromEntries(formData)
    );
    console.log(result);

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }
}
export async function AddCodeCouponFromUser(
    token: string,
    prevState: unknown,
    formData: FormData
) {
    console.log(formData);

    const result = (await AddCodeCouponFromUserSchema()).safeParse(
        Object.fromEntries(formData)
    );
    console.log(result);

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }
}





export async function applyCoupon(code: string, token: string) {
    const res = await fetch(`${domain}/cart/coupon/${code}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (!res.ok) {
        console.log(res)
    }
    revalidatePath('/cart')
    return res.json(); // Expected to return new cart total, discount info, etc.
}
