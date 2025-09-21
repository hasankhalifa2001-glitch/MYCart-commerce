import { z } from "zod";


export const allergensDetectionSchema = async () => {
    return z.object({
        Food_Product: z
            .string()
            .trim()
            .min(2, { message: "Food Product is required" }),
        Main_Ingredient: z
            .string()
            .trim()
            .min(2, { message: "Main Ingredient is required" }),
        Sweetener: z
            .string()
            .trim()
            .min(2, { message: "Sweetener is required" }),
        Fat_Oil: z
            .string()
            .trim()
            .min(2, { message: "Fat/Oil Ingredients is required" }),
        Seasoning: z
            .string()
            .trim()
            .min(2, { message: "Seasoning is required" }),
    });
};