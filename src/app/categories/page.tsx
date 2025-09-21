import { cookies } from "next/headers";
import React from "react";
import { getCategories } from "../admin/categories/_action/Category";
import { ArrowRight } from "lucide-react";
import Link from "@/components/link/Link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Category } from "../admin/categories/page";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const CategoriesPage = async () => {
    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);

    console.log(categories);
    return (
        <section className="py-20">
            <MaxWidthWrapper className="max-w-screen-2xl">
                <div className="text-2xl mb-5 font-bold">Shop Categories</div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {categories.date.map((category: Category, index: number) => {
                        return (
                            <div
                                key={index}
                                className="border relative rounded shadow grid grid-cols-2 hover:-translate-y-2 hover:shadow-md duration-500"
                            >
                                <div className="relative">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={220}
                                        height={220}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-lg font-bold flex flex-col justify-evenly items-center">
                                    <div className="text-center">{category.name}</div>
                                    <div className="relative ">
                                        <Link
                                            href={`/categories/${category.id}`}
                                            className={`${buttonVariants({
                                                variant: "primary_two",
                                                // size: "lg",
                                            })} font-semibold mx-auto sm:mx-0`}
                                        >
                                            Products
                                        </Link>
                                        <div className="bg-primary text-white absolute top-1/4 -right-[10px] rounded-full size-[18px] flex justify-center items-center">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </MaxWidthWrapper>
        </section>
    );
};

export default CategoriesPage;
