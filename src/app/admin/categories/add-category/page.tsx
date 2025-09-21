import React from 'react'
import Form from '../_components/Form'
import { cookies } from 'next/headers';

const AddCategory = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;
    return (
        <div className='flex justify-center mt-20'>
            <Form token={token} />
        </div>
    )
}

export default AddCategory