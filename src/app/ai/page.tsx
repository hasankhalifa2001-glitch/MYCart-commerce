import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import AiForm from './components/AiForm'

const AiPage = () => {
    return (
        <div className='my-6'>
            <MaxWidthWrapper>
                <div className='text-center text-2xl font-semibold'>Allergens Detection Tool</div>
                <div>
                    <AiForm />
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default AiPage