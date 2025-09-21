import { cookies } from 'next/headers';
import React from 'react'
import { getCategories } from '../_action/Category';
import SubCategoryForm from '../_components/FormSubCategory';

const AddSubCategory = async () => {
    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);
    console.log(categories)
    return (
        <div>
            <SubCategoryForm categories={categories.date} token={token} />
        </div>
    )
}

export default AddSubCategory