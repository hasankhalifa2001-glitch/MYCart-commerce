/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/app/admin/categories/page";
import Link from "@/components/link/Link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Products from "@/components/products/Products";
import { buttonVariants } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import React from "react";
import { Slide } from "react-awesome-reveal";

interface Props {
    category: Category;
    products?: any;
    token: string;
}

const CategoryProduct = ({ category, products, token }: Props) => {
    return (
        <>
            <Slide direction="up" triggerOnce>
                {products && products.length > 0 ? (
                    <div className="my-10">
                        <MaxWidthWrapper className="max-w-screen-xl">
                            <div className="text-primary-two font-semibold text-2xl italic my-4">
                                {category.name}
                            </div>
                        </MaxWidthWrapper>
                        <MaxWidthWrapper className="max-w-screen-2xl">
                            <Products products={products} token={token} all={false} />
                        </MaxWidthWrapper>
                        <MaxWidthWrapper className="mt-4">
                            <div className="flex justify-end ">
                                <Link
                                    href={`/categories/${category.id}`}
                                    className={`${buttonVariants({
                                        variant: "primary_two",
                                    })} font-semibold mx-auto sm:mx-0 text-center hover-wiggle`}
                                >
                                    All Products <ChevronsRight />
                                </Link>
                            </div>
                        </MaxWidthWrapper>
                    </div>
                ) : (
                    ""
                )}
            </Slide>
        </>
    );
};

export default CategoryProduct;
