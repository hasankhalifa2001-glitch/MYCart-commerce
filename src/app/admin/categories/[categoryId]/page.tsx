import React from 'react'
import Form from '../_components/Form'
import { cookies } from 'next/headers'
import { getCategoryById } from '../_action/Category'
import { getSubCategory } from '../_action/SubCategory'
import SubCategories from '../_components/SubCategories'

interface Props {
    params: Promise<{ categoryId: number }>
}

const CategoryPage = async ({ params }: Props) => {
    const token = (await cookies()).get('jwtToken')?.value as string
    const { categoryId } = await params

    const category = await getCategoryById(token, categoryId)

    const subCategories = await getSubCategory(category.date.id, token)

    console.log(subCategories)

    return (
        <div>
            <div className='text-2xl font-semibold  py-4 border-b'>
                Category Details
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-between my-10 h-full gap-10'>
                <Form token={token} category={category.date} />
                <SubCategories token={token} subCategories={subCategories} />
            </div>
        </div>
    )
}

export default CategoryPage