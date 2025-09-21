
"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Product } from "@/app/categories/[categoryId]/page";
import axios from "axios";
import { domain } from "@/constant/postman";
import { Minus, Plus } from "lucide-react";
import LoadingComponent from "../LoadingComponent";
import { cartItem } from "./Products";
import { useRouter } from "next/navigation";

interface Props {
    product: Product;
    token: string;
    cartItems?: cartItem[]
}

const AddToCart = ({ product, token, cartItems }: Props) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        // تعيين الكمية بناءً على cartItems الممررة
        if (cartItems) {
            const item = cartItems.find(
                (item: cartItem) => item.productId === product.id
            );
            setQuantity(item ? item.quantity : 0);
        } else {
            setQuantity(0);
        }
    }, [cartItems, product.id]);

    async function handleAddItem() {
        setLoading(true);
        try {
            if (!token) {
                router.push('/auth/signin')
            } else if (token) {
                const res = await axios.post(
                    `${domain}/cart/${product.id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data.data.cartitems)
                const items = res.data.data.cartitems;
                const item = items.find((i: cartItem) => i.productId === product.id);
                setQuantity(item ? item.quantity : 0);
                router.refresh()
            }

        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    async function handleRemoveItem() {
        setLoading(true);
        try {
            const res = await axios.delete(`${domain}/cart/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const items = res.data.data.cartitems;
            const item = items.find((i: cartItem) => i.productId === product.id);
            setQuantity(item ? item.quantity : 0);
            router.refresh()
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div>
            {quantity === 0 ? (
                <Button variant={"default"} size={"lg"} className="" onClick={handleAddItem} disabled={loading}>
                    {loading ? <LoadingComponent /> : "Add To Cart"}
                </Button>
            ) : (
                <div className="flex flex-col items-center gap-1 mb-5">
                    <div className="flex items-center gap-1">
                        <Button onClick={handleRemoveItem} disabled={loading}>
                            <Minus />
                        </Button>
                        <div className={`${buttonVariants({ variant: "default", size: "lg" })}`}>
                            {loading ? <LoadingComponent /> : quantity}
                        </div>
                        <Button onClick={handleAddItem} disabled={loading}>
                            <Plus />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddToCart;
