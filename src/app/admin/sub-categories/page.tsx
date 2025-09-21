import React from 'react'
import Form from './_components/Form'
import { cookies } from 'next/headers';
import { getCategories } from '../categories/_action/Category';

const SubCategories = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);
    console.log(categories)
    return (
        <div>
            <Form categories={categories.date} token={token} />
        </div>
    )
}

export default SubCategories