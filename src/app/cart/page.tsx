import Link from '@/components/link/Link'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import CartTable from './components/CartTable'
import CheckoutForm from './components/CheckoutForm'
import { cookies } from 'next/headers'
import { getCart, getTax } from './_action/ActionCart'
import { getAllOrdersByUser } from '../admin/orders/_action/Orders'
import { redirect } from 'next/navigation'


const CartPage = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;
    if (!token) redirect('/auth/signin')

    const cart = await getCart(token)
    const tax = await getTax(token)
    const orders = await getAllOrdersByUser(token)

    console.log(cart)

    return (
        <div className='mb-10'>
            <MaxWidthWrapper className="max-w-screen-2xl md:px-2.5 lg:px-20">
                <div className='p-5 my-4 w-full flex justify-between items-center border-b'>
                    <div className='text-2xl font-bold text-primary-two '>Your Cart</div>
                    <div className='font-semibold'><Link className='text-[#777]' href={'/'}>Home </Link> / <span > Your Cart</span></div>
                </div>
                <MaxWidthWrapper className='md:px-2.5 lg:px-20'>
                    {cart.status === 200 ?
                        <>
                            <CartTable cartItems={cart.data.cartitems} token={token} />
                            <CheckoutForm cartItems={cart.data} tax={tax.data} token={token} orders={orders} />
                        </>
                        : <div>
                            {cart.message}</div>}
                </MaxWidthWrapper>
            </MaxWidthWrapper>
        </div>
    )
}

export default CartPage