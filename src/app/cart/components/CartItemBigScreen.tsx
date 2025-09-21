"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { domain } from '@/constant/postman'
import { fromatCurrency } from '@/lib/formatters'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface Props {
    item: any
    token: string
}

const CartItemBigScreen = ({ item, token }: Props) => {


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


    return (
        <div
            className={`table-row  overflow-hidden `}
            key={item.product.id}
        >
            <div className="table-cell p-4 rounded-bl-lg border-t font-semibold max-w-[200px]">
                <div className="flex items-center gap-5">
                    <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="border shadow-sm rounded p-1"
                    />
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-lg">
                            {item.product.name}
                        </div>
                        <div className="">{item.product.description.slice(0, 100)}</div>
                    </div>
                </div>
            </div>
            <div className="table-cell p-4 border-t font-bold relative">
                <div className="absolute top-1/2 -translate-y-1/2">
                    {item.product.price_after_discount ? (
                        <div>
                            {fromatCurrency(item.product.price_after_discount)}
                        </div>
                    ) : (
                        <div>{fromatCurrency(item.product.price)}</div>
                    )}
                </div>
            </div>
            <div className="table-cell p-4 border-t text-gray-900 font-bold relative">
                <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-4">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className="size-6"
                        onClick={() => handleRemoveItem(item.product.id)}
                    >
                        <ChevronDown className="p-[1px]" />
                    </Button>
                    {loading ? <LoadingComponent /> : item.quantity}
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        className="size-6"
                        onClick={() => handleAddItem(item.product.id)}
                    >
                        <ChevronUp className="p-[1px]" />
                    </Button>
                </div>
            </div>
            <div className="table-cell p-4 border-t font-bold relative">
                <div className="absolute top-1/2 -translate-y-1/2">
                    {item.product.price_after_discount ? (
                        <div>
                            {fromatCurrency(item.product.price_after_discount * item.quantity)}
                        </div>
                    ) : (
                        <div>{fromatCurrency(item.product.price * item.quantity)}</div>
                    )}
                </div>
            </div>
            <div className="table-cell p-[10px] border-t font-bold relative">
                <div className="absolute top-1/2 -translate-y-1/2"></div>
            </div>
        </div>
    )
}

export default CartItemBigScreen