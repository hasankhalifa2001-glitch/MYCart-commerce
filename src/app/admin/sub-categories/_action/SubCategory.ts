/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { domain } from "@/constant/postman";
import { AddSubCategorySchema } from "@/validation/addItems";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function addSubCategory(
    arg: { token: string; categoryId: string },
    prevState: unknown,
    formData: FormData
) {
    const result = (await AddSubCategorySchema()).safeParse(
        Object.fromEntries(formData)
    );

    console.log(result);

    const { categoryId, token } = arg;

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    console.log(result.data);
    console.log(Number(categoryId));

    try {
        const res = await axios.post(
            `${domain}/sub-category/create`,
            {
                name: result.data.subCategoryName,
                categoryID: Number(categoryId),
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (res.status !== 201) {
            return {
                message: "An unexpected error occurred",
                status: 400
            };
        }

        if (res.status === 201) {
            revalidatePath("/admin/sub-categories");
            return {
                status: 201,
                message: "Sub Category added successfully",
            };
        }
    } catch (error: any) {
        return {
            message: error.response.data.message,
            status: 400
        }
    }
}
