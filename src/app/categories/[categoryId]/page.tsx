import { getAllProductForCategory } from "@/app/admin/products/_action/Product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Products from "@/components/products/Products";
import { cookies } from "next/headers";
import React from "react";

export type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
    price_after_discount?: number;
    ratings_average: '0.00',
    ratings_quantity: 0,
    category: {
        id: number;
        name: string;
    };
    subcategory: {
        id: number;
        name: string;
    };
    brand: {
        id: number;
        name: string;
    };
};

interface Props {
    params: Promise<{ categoryId: string }>;
}

const CategoryIdProduct = async ({ params }: Props) => {
    const { categoryId } = await params;

    const token = (await cookies()).get("jwtToken")?.value as string;

    const products = await getAllProductForCategory(categoryId, token);

    return (
        <div>
            <MaxWidthWrapper className="max-w-screen-2xl">
                <div className="my-8 text-2xl font-bold text-gray-800">All Products</div>
                <div className="my-10">
                    <Products
                        products={products} token={token} all={true}
                    />
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default CategoryIdProduct;
