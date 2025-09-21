"use server";

import { domain } from "@/constant/postman";
import { AddBrandSchema, updateBrandSchema } from "@/validation/addItems";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function createBrand(
    args: { token: string; categoryId: string },
    prevState: unknown,
    formData: FormData
) {
    const result = (await AddBrandSchema()).safeParse(Object.fromEntries(formData))

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const newFormData = new FormData()
    newFormData.append('name', result.data.brandName)
    newFormData.append('image', result.data.image)
    newFormData.append('category_id', args.categoryId)

    try {
        const res = await fetch(`${domain}/brand/create`, {
            method: 'POST',
            body: newFormData,
            headers: {
                Authorization: "Bearer " + args.token,
            }
        })

        if (res.ok) {
            revalidatePath(`/admin/brands`)
            return {
                status: 200,
                message: 'Brands added successfully'
            }
        }

    } catch (error) {
        console.log(error)
    }

}

export async function updateBrand(
    args: {
        token: string,
        id: number,
    },
    prevState: unknown,
    formData: FormData
) {
    console.log(formData);

    const { id, token } = args

    const result = (await updateBrandSchema()).safeParse(
        Object.fromEntries(formData)
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const imageUrl = result.data.image

    const newFormData = new FormData();
    newFormData.append("image", imageUrl);
    newFormData.append("name", result.data.brandName);
    // newFormData.append('category_id', args.categoryId)

    try {
        const res = await fetch(`${domain}/brand/update/${id}`, {
            method: "PATCH",
            body: newFormData,
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (res.ok) {
            revalidatePath(`/admin/brands`);
            revalidatePath(`/admin/brands/${id}`);
            return {
                status: 200,
                message: "Brand updated successfully",
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBrands(token: string) {
    try {
        const res = await fetch(`${domain}/brand/find/all`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
            },
            cache: "force-cache",
            next: { revalidate: 60 * 60 * 24 * 7 }
        })
        if (!res.ok) {
            return {
                status: res.status,
                message: 'An unexpected error occurred'
            }
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function getBrandsByCategory(id: number, token: string) {
    try {
        const res = axios.get(`${domain}/brand/find/all`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                category_id: id
            },

        })

        return (await res).data.date

    } catch (error) {
        console.log(error)
    }
}

export async function getBrandById(token: string, brandId: number) {
    try {
        const res = await fetch(`${domain}/brand/find/${brandId}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
            cache: "force-cache",
            next: { revalidate: 60 * 60 * 24 * 7 },
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

export async function deleteBrand(id: number, token: string) {
    try {
        await fetch(`${domain}/brand/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath('/admin/brands')
    } catch (error) {
        console.log(error);
    }
}
