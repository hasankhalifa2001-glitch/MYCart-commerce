import { z } from "zod";

export const AddCategorySchema = async () => {
    return z.object({
        categoryName: z
            .string()
            .trim()
            .min(2, { message: "Category Name is required" }),
        image: z.custom(
            (val) => {
                if (typeof val !== "object" || !val) {
                    return false;
                }
                if (!(val instanceof File)) {
                    return false;
                }
                const validMimeTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/gif",
                    "image/webp",
                    "image/jfif",
                ];
                return validMimeTypes.includes(val.type);
            },
            {
                message: "Category Image is required",
            }
        ),
    });
};
export const updateCategorySchema = async () => {
    return z.object({
        categoryName: z
            .string()
            .trim()
            .min(2, { message: "Category Name is required" }),
        image: z.custom((val) => val instanceof File),
    });
};

export const AddBrandSchema = async () => {
    return z.object({
        brandName: z.string().trim().min(2, { message: "Brand Name is required" }),
        image: z.custom(
            (val) => {
                if (typeof val !== "object" || !val) {
                    return false;
                }
                if (!(val instanceof File)) {
                    return false;
                }
                const validMimeTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "image/avif",
                ];
                return validMimeTypes.includes(val.type);
            },
            {
                message: "Brand Image is required",
            }
        ),
    });
};

export const updateBrandSchema = async () => {
    return z.object({
        brandName: z
            .string()
            .trim()
            .min(2, { message: "Brand Name is required" }),
        image: z.custom((val) => val instanceof File),
    });
};

export const AddSubCategorySchema = async () => {
    return z.object({
        subCategoryName: z
            .string()
            .trim()
            .min(2, { message: "Sub Category Name is required" }),
    });
};
export const UpdateSubCategorySchema = async () => {
    return z.object({
        updateSubCategory: z
            .string()
            .trim()
            .min(2, { message: "Sub Category Name is required" }),
    });
};

export const AddProductSchema = async () => {
    return z.object({
        image: z.custom(
            (val) => {
                if (typeof val !== "object" || !val) {
                    return false;
                }
                if (!(val instanceof File)) {
                    return false;
                }
                const validMimeTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                ];
                return validMimeTypes.includes(val.type);
            },
            {
                message: "Brand Image is required",
            }
        ),
        productName: z
            .string()
            .trim()
            .min(2, { message: "Product Name is required" }),
        description: z
            .string()
            .trim()
            .min(5, { message: "Description is required" }),
        quantity: z.string().trim().min(1, { message: "Quantity is required" }),
        price: z.string().trim().min(1, { message: "Price is required" }),
        priceAfterDiscount: z.string().optional(),
        category: z.string().min(1, { message: 'Category is required' })
    });
};


export const AddReviewSchema = async () => {
    return z.object({
        Review: z
            .string()
            .trim()
            .min(3, { message: "Review subject is required" }),
        // Rate: z.number()
    });
};
export const UpdateReviewSchema = async () => {
    return z.object({
        Review: z
            .string()
            .trim()
            .min(3, { message: "Review subject is required" }),
        // Rate: z.number()
    });
};


export const AddCouponSchema = async () => {
    return z.object({
        name: z
            .string()
            .trim()
            .min(3, { message: "Coupon Name is required" }),
        discount: z
            .string()
            .trim()
            .min(3, { message: "Discount is required" }),
        expireDate: z
            .date()
    });
};
export const AddCodeCouponFromUserSchema = async () => {
    return z.object({
        couponName: z
            .string()
            .trim()
            .min(3, { message: "Coupon Name is required" }),

    });
};