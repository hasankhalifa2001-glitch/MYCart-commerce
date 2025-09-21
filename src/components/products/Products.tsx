import React from 'react'
import ProductCart from './ProductCart'
import { Product } from '@/app/categories/[categoryId]/page'
import { getCart } from '@/app/cart/_action/ActionCart'


export type cartItem = {
    productId: number
    quantity: number
    product: Product
}


interface Props {
    products: Product[]
    token: string
    all: boolean
}

const Products = async ({ products, token, all }: Props) => {

    const cart = await getCart(token)
    console.log(cart)


    return products?.length > 0 ? (
        <div className='grid grid-cols-1 gap-5 min-[992px]:grid-cols-2 min-[1350px]:grid-cols-3'>
            {products.map((product, index) => {
                return (
                    all ? <ProductCart key={product.id} product={product} token={token} cartItems={cart.status === 200 && cart.data.cartitems} /> : index <= 2 && <ProductCart key={product.id} product={product} token={token} cartItems={cart.status === 200 && cart.data.cartitems} />
                )
            })}

        </div>
    ) : (
        <p className='text-center text-gray-500'>No Products Found</p>
    )
}

export default Products