"use server";

import { domain } from "@/constant/postman";
import { AddProductSchema } from "@/validation/addItems";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function addProduct(
    args: {
        categoryId: string;
        subCategoryId: string;
        brandId: string;
        token: string
    },
    prevState: unknown,
    formData: FormData
) {

    const result = (await AddProductSchema()).safeParse(
        Object.fromEntries(formData)
    );

    console.log(result)

    if (result.success === false) {
        // console.error('Validation failed:', result.error.format());
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }
    const newFormData = new FormData()

    newFormData.append('image', result.data.image)
    newFormData.append('name', result.data.productName)
    newFormData.append('description', result.data.description)
    newFormData.append('price', result.data.price)
    newFormData.append('quantity', result.data.quantity)
    newFormData.append('categoryID', args.categoryId)
    if (result.data.priceAfterDiscount && result.data.priceAfterDiscount !== '') {
        newFormData.append('priceAfterDiscount', result.data.priceAfterDiscount)
    }


    if (args.subCategoryId) {
        console.log('ddd')
        newFormData.append('subCategoryID', args.subCategoryId)
    }
    if (args.brandId !== '') {
        console.log('reeferf')
        newFormData.append('brandID', args.brandId)
    }


    try {

        console.log(newFormData)
        const res = await axios.post(`${domain}/product/create`, newFormData, {

            headers: {
                Authorization: "Bearer " + args.token,
            }
        })
        console.log(res)

        if (res.status !== 201) {
            return {
                status: 400,
                message: 'An unexpected error occurred'
            }
        }

        if (res.status === 201) {
            // revalidatePath(`/admin/brands`)
            return {
                status: 201,
                message: 'Product added successfully'
            }
        }
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: 'Something went wrong. Please try again.'
        };
    }
}


export async function getAllProductForCategory(id: string, token: string) {
    try {
        const res = await axios.get(`${domain}/product/find/all`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                category: id
            }
        })

        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getProductForId(id: string, token: string) {
    try {
        const res = await axios.get(`${domain}/product/find/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export async function get3NewestProductByUser() {
    try {
        const res = await axios.get(`${domain}/product/newest`)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}
export async function topSellingProductByUser() {
    try {
        const res = await axios.get(`${domain}/product/top-selling`)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}


export async function deleteProduct(id: number, token: string) {
    try {
        await fetch(`${domain}/product/delete/${id}`, {
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