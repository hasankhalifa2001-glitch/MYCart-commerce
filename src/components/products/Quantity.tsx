/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Product } from "@/app/categories/[categoryId]/page"
import { domain } from "@/constant/postman"
import axios from "axios"
import { useState } from "react"
import LoadingComponent from "../LoadingComponent"

interface Props {
    quantity: number
    product: Product
    token: string
    setQuantity: React.Dispatch<any>
}

const Quantity = ({ quantity, product, token, setQuantity }: Props) => {

    // const cartItems = useCartStore((state) => state.cartItems);

    // const addToCart = useCartStore((state) => state.addItemToCart);

    const [loading, setLoading] = useState(false)

    async function handleAddItem() {
        // addToCart(product);
        try {
            setLoading(true)
            await fetch(`${domain}/cart/${product.id}`, {
                method: 'post',
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            const quantity = await axios.get(`${domain}/cart`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            for (let i = 0; i <= quantity.data.data.cartitems.length; i++) {
                if (quantity.data.data.cartitems[i]?.productId === product.id) {
                    setQuantity(quantity.data.data.cartitems[i]?.quantity)
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };

    // const removeItem = useCartStore((state) => state.removeItemFromCart)
    async function handleRemoveItem() {
        // removeItem(product.id)

        try {
            setLoading(true)
            await fetch(`${domain}/cart/${product.id}`, {
                method: 'delete',
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            const quantity = await axios.get(`${domain}/cart`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            for (let i = 0; i <= quantity.data.data.cartitems.length; i++) {
                if (quantity.data.data.cartitems[i]?.productId === product.id) {
                    if (quantity.data.data.cartitems[i]?.quantity === 1) {
                        setQuantity(0)
                    } else {
                        setQuantity(quantity.data.data.cartitems[i]?.quantity)
                    }
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }
    // const removeFromCart = useCartStore((state) => state.removeCartItem)
    // function handleRemoveFromCart() {
    //     removeFromCart(product.id)
    // }

    return (
        <div className="flex flex-col items-center gap-1 mb-5">
            <div className="flex items-center gap-1">
                <Button onClick={handleRemoveItem}><Minus /></Button>
                <Button size={'lg'}>{loading ? <LoadingComponent /> : quantity}</Button>
                <Button onClick={handleAddItem}><Plus /></Button>
            </div>
            {/* <div>
                <Button onClick={handleRemoveFromCart}>Remove</Button>
            </div> */}
        </div>
    )
}

export default Quantity