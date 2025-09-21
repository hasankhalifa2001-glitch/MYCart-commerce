import React from 'react'
import CategoriesMenu from './_components/CategoriesMenu'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

const page = () => {
    return (
        <div className=''>
            <MaxWidthWrapper className="max-w-screen-2xl">
                <div className='font-semibold text-2xl my-5'>Products Menu</div>
            </MaxWidthWrapper>
            <CategoriesMenu />
        </div>
    )
}

export default page