import { cookies } from 'next/headers'
import React from 'react'
import Form from '../_components/Form'
import { getBrandById } from '../_action/Brand'
import { getCategories } from '../../categories/_action/Category'


interface Props {
    params: Promise<{ brandId: number }>
}

const BrandPage = async ({ params }: Props) => {
    const token = (await cookies()).get('jwtToken')?.value as string
    const { brandId } = await params

    const brand = await getBrandById(token, brandId)
    const categories = await getCategories(token);

    console.log(brand.date)

    return (
        <div>
            <Form token={token} brand={brand.date} categories={categories.date} />
        </div>
    )
}

export default BrandPage