import Link from '@/components/link/Link'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import ProductView from './_components/ProductView'
import { cookies } from 'next/headers'
import { getCategories } from '../categories/_action/Category'

const ProductPage = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);

    return (
        <>
            <div className='flex justify-end mt-5'>
                <Link
                    href={"/admin/products/add-product"}
                    className={buttonVariants({ size: "lg", variant: "primary_two" })}
                >
                    Add new product <Plus />
                </Link>
            </div>
            <ProductView token={token} categories={categories.date} />
        </>
    )
}

export default ProductPage