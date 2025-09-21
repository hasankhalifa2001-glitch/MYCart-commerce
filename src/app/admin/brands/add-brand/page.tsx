import { cookies } from 'next/headers';
import React from 'react'
import Form from '../_components/Form';
import { getCategories } from '../../categories/_action/Category';

const AddBrand = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);
    console.log(categories)

    return (
        <div>
            <Form token={token} categories={categories.date} add={true} />
        </div>
    )
}

export default AddBrand