"use client";
import { fromatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { Product } from "@/app/categories/[categoryId]/page";
import { cartItem } from "./Products";
import { ChevronsRightIcon } from "lucide-react";
import Link from "../link/Link";
import StarRating from "@/app/product/_components/StarRating";

interface Props {
    product: Product;
    token: string;
    cartItems?: cartItem[];
}

const ProductCart = ({ product, token, cartItems }: Props) => {
    return (
        <div
            key={product.id}
            className="bg-white w-[360px] sm:w-[400px] mx-auto grid grid-cols-2 items-center px-1 py-3 border rounded-lg shadow-md"
        >
            <div className="flex flex-col items-center justify-between">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                />
                <Link href={`/product/${product.id}`} className="font-bold text-2xl">
                    <ChevronsRightIcon />
                </Link>
            </div>
            <div className="px-5 space-y-4">
                <div className="text-gray-400 font-semibold">
                    {product.category.name}
                </div>
                <div className="font-bold text-xl">{product.name}</div>
                <div className="text-gray-600 font-semibold text-sm">
                    {product.description.slice(0, 45)} ...
                </div>
                <div className="text-primary font-bold flex gap-2 flex-col">
                    {product.price_after_discount ? (
                        <div className="flex items-center gap-3">
                            <div className="line-through text-gray-500">{fromatCurrency(product.price)}</div>
                            <div>{fromatCurrency(product.price_after_discount)}</div>
                        </div>
                    ) : (
                        <div>{fromatCurrency(product.price)}</div>
                    )}

                    <StarRating
                        rating={Number(product.ratings_average)}
                        textSize="text-2xl"
                        show={false}
                    />
                </div>
                <div className="text-gray-400 italic font-semibold">
                    Available: {product.quantity}
                </div>
                <div className="h-2 bg-[#ffd916] rounded-full relative -top-2"></div>
                <div>
                    <AddToCart product={product} token={token} cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
