import Link from "@/components/link/Link";
import { buttonVariants } from "@/components/ui/button";
import React from "react";
import { getBrands } from "./_action/Brand";
import { cookies } from "next/headers";
import { Category } from "../categories/page";
import Image from "next/image";
import BrandDelete from "./_components/BrandDelete";
import { PenBoxIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";

export type Brand = {
    id: number;
    name: string;
    category: Category;
    image: string;
};

const BrandsPage = async () => {
    const token = (await cookies()).get("jwtToken")?.value as string;

    const brands = await getBrands(token);

    console.log(brands);

    return (
        <div>
            <div className="text-center my-5">
                <Link
                    href={"/admin/brands/add-brand"}
                    className={buttonVariants({ size: "lg", variant: "primary_two" })}
                >
                    Add new brand
                </Link>

                {brands ? (
                    <Fade cascade direction="up" damping={0.15} triggerOnce>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
                            {brands.date.map((brand: Brand) => {
                                return (
                                    <div
                                        key={brand.id}
                                        className="flex border shadow rounded justify-evenly"
                                    >
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            width={180}
                                            height={180}
                                        />
                                        <div className="flex flex-col items-center justify-evenly">
                                            <div className="font-semibold text-xl">{brand.name}</div>
                                            <div className="font-semibold flex items-center gap-2 text-sm">
                                                <BrandDelete token={token} id={brand.id} />
                                                <Link
                                                    href={`/admin/brands/${brand.id}`}
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
        </div>
    );
};

export default BrandsPage;
