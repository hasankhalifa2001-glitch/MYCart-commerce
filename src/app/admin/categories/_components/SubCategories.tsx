"use client"
import React from 'react'
import SubCategoryDetele from './DeteleSubCategory'
import UpdateSubCategory from './UpdateSubCategory'

// const date = [
//     { id: 3, name: 'التفاح' },
//     { id: 2, name: 'الرمان' },
//     { id: 1, name: 'البندورة' },
// ]

interface Props {
    token: string
    subCategories?: {
        id: number,
        name: string
    }[]
}

const SubCategories = ({ token, subCategories }: Props) => {
    return (
        <div className='flex flex-col w-full lg:w-2/5 gap-5'>
            <div className='text-2xl font-semibold'>Sub Categories</div>
            {subCategories ? subCategories.map(sub => {
                return (
                    <div key={sub.id} className='flex justify-between items-center px-5 py-3 hover:bg-gray-50 duration-300 border rounded shadow'>
                        <div className='font-semibold'>
                            {sub.name}
                        </div>
                        <div className='flex gap-4'>
                            <UpdateSubCategory sub={sub} token={token} />
                            <SubCategoryDetele id={sub.id} token={token} />
                        </div>
                    </div>
                )
            }) : <div>No Internet</div>}
        </div>
    )
}

export default SubCategories