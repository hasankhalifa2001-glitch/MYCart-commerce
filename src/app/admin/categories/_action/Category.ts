"use server";
import { domain } from "@/constant/postman";
import { AddCategorySchema, updateCategorySchema } from "@/validation/addItems";
import { revalidatePath } from "next/cache";

export async function createCategory(
    token: string,
    prevState: unknown,
    formData: FormData
) {
    console.log(formData);

    const result = (await AddCategorySchema()).safeParse(
        Object.fromEntries(formData)
    );
    console.log(result);

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const newFormData = new FormData();
    newFormData.append("image", result.data.image);
    newFormData.append("name", result.data.categoryName);

    try {
        const res = await fetch(`${domain}/category/create`, {
            method: "POST",
            body: newFormData,
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!res.ok) {
            return {
                status: 400,
                message: "Category added successfully",
            };
        }
        if (res.ok) {
            revalidatePath(`/admin/categories`);
            return {
                status: 200,
                message: "Category added successfully",
            };
        }
    } catch (error) {
        console.log('dssdvsdvdsv', error);
    }
}
export async function updateCategory(
    args: {
        token: string,
        id: number
    },
    prevState: unknown,
    formData: FormData
) {
    console.log(formData);

    const { id, token } = args

    const result = (await updateCategorySchema()).safeParse(
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
    newFormData.append("name", result.data.categoryName);

    try {
        const res = await fetch(`${domain}/category/update/${id}`, {
            method: "PATCH",
            body: newFormData,
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (res.ok) {
            revalidatePath(`/admin/categories`);
            revalidatePath(`/admin/categories/${id}`);
            return {
                status: 200,
                message: "Category updated successfully",
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCategories(token: string) {
    try {
        const res = await fetch(`${domain}/category/find/all`, {
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

export async function getCategoryById(token: string, categoryId: number) {
    try {
        const res = await fetch(`${domain}/category/find/${categoryId}`, {
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

export async function deleteCategory(id: number, token: string) {
    try {
        await fetch(`${domain}/category/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath('/admin/categories')
    } catch (error) {
        console.log(error);
    }
}
