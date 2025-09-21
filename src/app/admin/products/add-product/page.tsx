import React from 'react'
import FormProduct from '../_components/Form'
import { getCategories } from '../../categories/_action/Category';
import { cookies } from 'next/headers';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const AddProductPage = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);
    console.log(categories)

    return (
        <div>
            <MaxWidthWrapper className='my-2 lg:my-8 font-semibold text-2xl'>Add Product</MaxWidthWrapper>
            <div className='flex justify-center xl:mt-6'>
                <FormProduct token={token} categories={categories.date} />
            </div>
        </div>
    )
}

export default AddProductPage