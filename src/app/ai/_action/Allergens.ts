// "use server";

import { allergensDetectionSchema } from "@/validation/allergensDetection";
import axios from "axios";

export async function allergensDetection(
    prevState: unknown,
    formData: FormData
) {
    const result = (await allergensDetectionSchema()).safeParse(
        Object.fromEntries(formData)
    );

    if (!result.success) {
        return {
            data: {
                contains_allergens: false,
                detected_allergens: [],
                message: "",
            },
            error: result.error.formErrors.fieldErrors,
            formData,
        };
    }

    const jsonPayload = {
        Food_Product: result.data.Food_Product,
        Main_Ingredient: result.data.Main_Ingredient,
        Sweetener: result.data.Sweetener,
        Fat_Oil: result.data.Fat_Oil,
        Seasoning: result.data.Seasoning,
    };

    try {
        const res = await axios.post(
            "/api/allergens",
            jsonPayload,

        );

        console.log(res.data);

        return {
            status: 200,
            data: res.data,
            formData
        };

    } catch (error) {
        console.error("API error:", error);
        return {
            status: 500,
            message: "Something went wrong. Please try again.",
            data: {
                contains_allergens: false,
                detected_allergens: [],
                message: "",
            },
        };
    }
}

