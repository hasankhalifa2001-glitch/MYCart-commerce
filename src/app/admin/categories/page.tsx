import React from "react";
import Link from "@/components/link/Link";
import { buttonVariants } from "@/components/ui/button";
import { cookies } from "next/headers";
import { getCategories } from "./_action/Category";
import Image from "next/image";
import { PenBoxIcon } from "lucide-react";
import CategoryDelete from "./_components/CategoryDelete";
import { TbCategoryPlus } from "react-icons/tb";
import { Fade } from "react-awesome-reveal";

export type Category = {
    id: number;
    name: string;
    image: string;
};

const CategoriesPage = async () => {
    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);

    console.log(categories);

    return (
        <div>
            <div className="text-center my-5 flex justify-center gap-10">
                <Link
                    href={"/admin/categories/add-category"}
                    className={buttonVariants({ size: "lg", variant: "primary_two" })}
                >
                    Add new category <TbCategoryPlus />
                </Link>
                <Link
                    href={"/admin/categories/add-subCategory"}
                    className={buttonVariants({ size: "lg", variant: "primary_two" })}
                >
                    Add new sub category <TbCategoryPlus />
                </Link>
            </div>
            {categories ? (
                <Fade cascade direction="up" damping={0.15} triggerOnce>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 my-10">
                        {categories.date.map((category: Category) => {
                            return (
                                <div
                                    key={category.id}
                                    className="flex border shadow rounded justify-between pr-10"
                                >
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        priority={true}
                                        width={220}
                                        height={220}
                                        className="object-cover"
                                    />
                                    <div className="flex flex-col items-center justify-evenly">
                                        <div className="font-semibold text-xl">{category.name}</div>
                                        <div className="font-semibold flex items-center gap-5 text-sm">
                                            <CategoryDelete token={token} id={category.id} />
                                            <Link
                                                href={`/admin/categories/${category.id}`}
                                                className={buttonVariants({
                                                    variant: "outline",
                                                    size: "icon",
                                                })}
                                            >
                                                <PenBoxIcon />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Fade>
            ) : (
                <div className="text-center w-full p-10 text-2xl font-semibold">
                    No Information
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
