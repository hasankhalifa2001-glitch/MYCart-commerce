/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { domain } from "@/constant/postman";
import { AddSubCategorySchema, UpdateSubCategorySchema } from "@/validation/addItems";
import { revalidatePath } from "next/cache";
import axios from 'axios';
import { initialSubCategoryState } from "../_components/FormSubCategory";



export async function addSubCategory(
    arg: { token: string; categoryId: string },
    prevState: typeof initialSubCategoryState,
    formData: FormData
): Promise<typeof initialSubCategoryState> {
    const result = (await AddSubCategorySchema()).safeParse(
        Object.fromEntries(formData)
    );

    if (!result.success) {
        return {
            error: result.error.formErrors.fieldErrors,
            status: null,
        };
    }

    const { token, categoryId } = arg;

    try {
        const res = await axios.post(
            `${domain}/sub-category/create`,
            {
                name: result.data.subCategoryName,
                categoryID: Number(categoryId),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status !== 201) {
            return {
                message: "An unexpected error occurred",
                status: 400,
            };
        }

        revalidatePath(`/admin/categories/${categoryId}`);

        return {
            status: 201,
            message: "Sub Category added successfully",
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Something went wrong",
            status: 400,
        };
    }
}



export async function SubCategoryUpdate(arg: {
    token: string;
    Id: number;
}, prevState: {
    error: {
        updateSubCategory?: string[] | undefined;
    };
    formData: FormData | undefined;
    message: string;
    status: number | null;
}, formData: FormData): Promise<{
    error: {
        updateSubCategory?: string[] | undefined;
    };
    formData: FormData | undefined;
    message: string;
    status: number | null;
}> {
    const result = (await UpdateSubCategorySchema()).safeParse(
        Object.fromEntries(formData)
    );


    console.log(result);


    const { Id, token } = arg;

    if (!result.success) {
        return {
            error: {
                updateSubCategory: result.error.formErrors.fieldErrors.updateSubCategory ?? [],
            },
            formData,
            message: '',
            status: null,
        };
    }

    try {
        const res = await axios.put(
            `${domain}/sub-category/update/${Id}`,
            {
                name: result.data.updateSubCategory,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (res.status !== 200) {
            return {
                message: "An unexpected error occurred",
                status: 400,
                error: {},
                formData: undefined,
            };
        }

        if (res.status === 200) {
            revalidatePath(`/admin/categories/${Id}`);
            return {
                message: "Sub Category updated successfully",
                status: 200,
                error: {},
                formData: undefined,
            };
        }
    } catch (error: any) {
        return {
            message: error.response?.data?.message ?? "Something went wrong",
            status: 400,
            error: {},
            formData: undefined,
        };
    }

    // رجع قيمة افتراضية لتجنب مشاكل TypeScript
    return {
        message: "Unhandled error",
        status: 500,
        error: {},
        formData: undefined,
    };
}



export async function getSubCategory(id: number, token: string) {
    try {
        const res = await axios.get(`${domain}/sub-category/find/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                category_id: id
            },
        });

        return res.data.date;
    } catch (error) {
        console.error(error);
    }
}



// export async function deleteSubCategory(id: number, token: string) {

//     try {
//         const res = await fetch(`${domain}/sub-category/delete/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: "Bearer " + token,
//             }
//         })
//         revalidatePath(`/admin/categories/${id}`)
//         if (!res.ok) {
//             return {
//                 message: "An unexpected error occurred",
//                 status: 400
//             }
//         }

//         if (res.ok) {
//             return {
//                 message: "Sub-Category deleted successfull",
//                 status: 400
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


// import { api } from './axios-client'; // تأكد أنك أنشأت نسخة axios من setupCache
// import { revalidatePath } from 'next/cache'; // متاح في Server Actions فقط


export async function deleteSubCategory(id: number, token: string, categoryId: number) {
    try {
        // const res = await fetch(`${domain}/sub-category/delete/${id}`, {
        //     method: "DELETE",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //     },
        // });

        const res = await axios.delete(`${domain}/sub-category/delete/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            // cache: {
            //     update: {
            //         'sub-categories': 'delete'
            //     }
            // }
        })

        if (res.status !== 200) {
            return {
                message: "An unexpected error occurred",
                status: 400,
            };
        }

        // إعادة التحقق من المسار في Next.js (تحديث الصفحة أو البيانات)
        revalidatePath(`/admin/categories/${categoryId}`);

        // حذف الكاش الخاص بالفئة الأم (categoryId) من axios-cache-interceptor
        // const cacheKey = `GET:/sub-category/find/all?category_id=${categoryId}`;
        // await api.storage?.remove(cacheKey);

        return {
            message: "Sub-Category deleted successfully",
            status: 200,
        };

    } catch (error) {
        console.error(error);
        return {
            message: "Server error occurred",
            status: 500,
        };
    }
}