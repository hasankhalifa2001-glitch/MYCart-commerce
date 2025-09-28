/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"

import { domain } from "@/constant/postman";
import { RegisterSchema, validationError } from "@/validation/auth"
import axios from "axios";


export type FormState =
    | {
        error: validationError;
        formData: FormData;
        message?: undefined;
        status?: undefined;
    }
    | {
        formData: FormData;
        message: string;
        status: number;
        error?: undefined;
    }
    | {
        message: string;
        formData: FormData;
        error?: undefined;
        status?: undefined;
    };


export default async function signup(prevState: FormState, formData: FormData): Promise<FormState> {

    const result = (await RegisterSchema()).safeParse(
        Object.fromEntries(formData.entries())
    );

    if (result.success === false) {
        return {
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    try {
        const res = await axios.post(`${domain}/auth/sign-up`, {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
            age: Number(result.data.age),
            phone: result.data.phone,
            address: result.data.address
        })

        console.log(res)

        return {
            formData,
            message: 'Account created successfully',
            status: 201
        }
    } catch (error: any) {
        console.log(error)
        if (error.status === 400) {
            return {
                message: error.response.data.message[0],
                formData
            }
        }
        if (error.status === 409) {
            return {
                message: error.response.data.message,
                formData
            }
        }
        return {
            status: 500,
            message: 'An unexpected error occurred',
            formData
        }
    }
}