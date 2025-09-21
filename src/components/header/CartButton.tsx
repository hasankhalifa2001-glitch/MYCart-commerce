"use client"
import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import Link from '../link/Link'
import { cartItem } from '../products/Products'


interface Props {
    cartItems?: cartItem[]
}

const CartButton = ({ cartItems }: Props) => {

    // const cartItems = useCartStore((state) => state.cartItems)
    // const clearCart = useCartStore((state) => state.clearCart)



    return (
        <Link href={`/cart`} className={`relative block group`} >
            {!cartItems || cartItems?.length === 0 ? '' : <span
                className='absolute text-sm w-5 h-5 bg-primary-two rounded-full text-white -top-4 start-4 text-center'
            >
                {cartItems.length}
            </span>}
            {/* <Button onClick={clearCart} >dddd</Button> */}
            <ShoppingCartIcon className='text-white group-hover:text-primary-two duration-300 transition-colors' />
        </Link>
    )
}

export default CartButton