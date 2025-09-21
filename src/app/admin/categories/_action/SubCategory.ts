/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { domain } from "@/constant/postman";
import { AddSubCategorySchema, UpdateSubCategorySchema } from "@/validation/addItems";
import { revalidatePath } from "next/cache";
import axios from 'axios';



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
            revalidatePath(`/admin/categories/${categoryId}`);
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
export async function SubCategoryUpdate(
    arg: { token: string; Id: number },
    prevState: unknown,
    formData: FormData
) {
    const result = (await UpdateSubCategorySchema()).safeParse(
        Object.fromEntries(formData)
    );

    console.log(result);

    const { Id, token } = arg;

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
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

        console.log(res)

        if (res.status !== 200) {
            return {
                message: "An unexpected error occurred",
                status: 400
            };
        }

        if (res.status === 200) {
            revalidatePath(`/admin/categories/${Id}`);
            return {
                status: 200,
                message: "Sub Category updated successfully",
            };
        }
    } catch (error: any) {
        console.log(error)
        return {
            message: error.response.data.message,
            status: 400
        }
    }
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