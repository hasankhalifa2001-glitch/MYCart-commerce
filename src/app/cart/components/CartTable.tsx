"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
// import { CartItem, useCartStore } from "@/store/cart.store";
import { fromatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { cartItem } from "@/components/products/Products";
import { domain } from "@/constant/postman";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/LoadingComponent";
import { Fade } from "react-awesome-reveal";
import CartItemBigScreen from "./CartItemBigScreen";

interface Props {
    cartItems: cartItem[];
    token: string;
}

const CartTable = ({ cartItems, token }: Props) => {
    const head = ["Item", "Price", "Quantity", "Total"];

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // const [quantity, setQuantity] = useState<number>();

    async function handleAddItem(id: number) {
        if (!token) {
            router.replace(`/auth/signin`);
        }
        setLoading(true);
        try {
            await axios.post(
                `${domain}/cart/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.refresh();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }
    async function handleRemoveItem(id: number) {
        setLoading(true);
        try {
            await axios.delete(`${domain}/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.refresh();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    console.log(cartItems);

    return (
        <Fade direction="up" cascade damping={0.15} triggerOnce>
            <div className="text-xl md:text-2xl font-semibold">
                Your Cart (
                {cartItems.length === 1
                    ? `${cartItems.length} Item`
                    : `${cartItems.length} Items`}
                )
            </div>

            <div className="w-full hidden md:table rounded my-5 border-b">
                <div className="table-header-group">
                    <div className="table-row font-bold">
                        {head.map((item, index) => (
                            <div className="table-cell max-w-[200px]" key={index}>
                                <div
                                    className={`m-4 ml-0  ${index === 0 ? `` : `border-l border-l-slate-300`
                                        } pl-4`}
                                >
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="table-row-group text-[15px]">
                    {cartItems.map((item: cartItem) => {
                        return (
                            // <div
                            //     className={`table-row  overflow-hidden `}
                            //     key={item.product.id}
                            // >
                            //     <div className="table-cell p-4 rounded-bl-lg border-t font-semibold max-w-[200px]">
                            //         <div className="flex items-center gap-5">
                            //             <Image
                            //                 src={item.product.image}
                            //                 alt={item.product.name}
                            //                 width={100}
                            //                 height={100}
                            //                 className="border shadow-sm rounded p-1"
                            //             />
                            //             <div className="flex flex-col gap-2">
                            //                 <div className="font-bold text-lg">
                            //                     {item.product.name}
                            //                 </div>
                            //                 <div className="">{item.product.description.slice(0, 100)}</div>
                            //             </div>
                            //         </div>
                            //     </div>
                            //     <div className="table-cell p-4 border-t font-bold relative">
                            //         <div className="absolute top-1/2 -translate-y-1/2">
                            //             {item.product.price_after_discount ? (
                            //                 <div>
                            //                     {fromatCurrency(item.product.price_after_discount)}
                            //                 </div>
                            //             ) : (
                            //                 <div>{fromatCurrency(item.product.price)}</div>
                            //             )}
                            //         </div>
                            //     </div>
                            //     <div className="table-cell p-4 border-t text-gray-900 font-bold relative">
                            //         <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-4">
                            //             <Button
                            //                 variant={"outline"}
                            //                 size={"icon"}
                            //                 className="size-6"
                            //                 onClick={() => handleRemoveItem(item.product.id)}
                            //             >
                            //                 <ChevronDown className="p-[1px]" />
                            //             </Button>
                            //             {loading ? <LoadingComponent /> : item.quantity}
                            //             <Button
                            //                 variant={"outline"}
                            //                 size={"icon"}
                            //                 className="size-6"
                            //                 onClick={() => handleAddItem(item.product.id)}
                            //             >
                            //                 <ChevronUp className="p-[1px]" />
                            //             </Button>
                            //         </div>
                            //     </div>
                            //     <div className="table-cell p-4 border-t font-bold relative">
                            //         <div className="absolute top-1/2 -translate-y-1/2">
                            //             {item.product.price_after_discount ? (
                            //                 <div>
                            //                     {fromatCurrency(item.product.price_after_discount * item.quantity)}
                            //                 </div>
                            //             ) : (
                            //                 <div>{fromatCurrency(item.product.price * item.quantity)}</div>
                            //             )}
                            //         </div>
                            //     </div>
                            //     <div className="table-cell p-[10px] border-t font-bold relative">
                            //         <div className="absolute top-1/2 -translate-y-1/2"></div>
                            //     </div>
                            // </div>
                            <CartItemBigScreen item={item} token={token} key={item.product.id} />
                        );
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col md:hidden my-3">
                {cartItems.map((item: cartItem) => {
                    return (
                        <div
                            key={item.product.id}
                            className="flex flex-col border-b my-3 relative"
                        >
                            <div className="flex gap-4">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={100}
                                    height={100}
                                    className="border shadow-sm rounded p-1"
                                />
                                <div className="flex flex-col gap-1">
                                    <div className="font-bold text">{item.product.name}</div>
                                    <div className="font-semibold text-sm">
                                        {item.product.description.substring(0, 50)} ...
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5 my-4 mr-20">
                                <div className="flex flex-col items-end space-y-3 text-gray-500 font-semibold">
                                    <div>Price:</div>
                                    <div>Quantity:</div>
                                    <div>Total:</div>
                                </div>
                                <div className="flex flex-col space-y-3 text-gray-900">
                                    <div className="font-bold">
                                        {fromatCurrency(item.product.price)}
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-900 font-bold">
                                        <Button
                                            variant={"outline"}
                                            size={"icon"}
                                            className="size-6"
                                            // onClick={() => handleMinus(item.product.id)}
                                            onClick={() => handleRemoveItem(item.product.id)}
                                        >
                                            <ChevronDown className="p-[1px]" />
                                        </Button>
                                        {item.quantity}
                                        <Button
                                            variant={"outline"}
                                            size={"icon"}
                                            className="size-6"
                                            // onClick={() => handlePlus(item.product.id)}
                                            onClick={() => handleAddItem(item.product.id)}
                                        >
                                            <ChevronUp className="p-[1px]" />
                                        </Button>
                                    </div>
                                    <div className="font-bold">
                                        {fromatCurrency(item.product.price * item.quantity)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Fade>
    );
};

export default CartTable;
