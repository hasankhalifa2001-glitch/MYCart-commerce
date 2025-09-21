import Image from 'next/image'
import React from 'react'

const loading = () => {
    return (
        // <div className='w-screen h-screen absolute top-0 left-0 bg-gray-300 z-50 opacity-70 flex justify-center items-center'>
        //     <div className='w-[100px] h-[100px]  border-4 border-orange-600 rounded-full border-t-white animate-spin'>

        //     </div>
        // </div>
        <div className='flex items-center justify-center h-screen w-full'>
            <Image src={'/loading.gif'} alt='Loading' className='object-cover' width={60} height={60} />
        </div>
    )
}

export default loading