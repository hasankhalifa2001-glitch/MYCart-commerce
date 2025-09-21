import { z } from "zod";

export const RegisterSchema = async () => {
    return z.object({
        name: z.string().trim().min(2, { message: "Name is required" }),
        email: z.string().trim().email({ message: "Must be a valid email" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(40, { message: "Password must be at most 40 characters" }),
        // phone: z.string().min(1, { message: "Phone is required" }).trim().refine((value) => {
        //     if (!value) return true;
        //     return /^\+?[0-9]\d{1,14}$/.test(value);
        // }, {
        //     message: "Please enter a valid phone number"
        // }),
        phone: z.string().min(1, { message: "Phone is required" }).trim(),
        age: z.string().trim().min(1, { message: "Age is required" }),
        address: z.string().trim().min(4, { message: "Address is required" })
    });
};

export type validationError =
    | {
        [key: string]: string[]
    } | undefined