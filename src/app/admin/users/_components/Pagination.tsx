import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

const PaginationPage = () => {
    return (
        <div className='flex justify-center items-center'>
            <Button variant={'ghost'}><ChevronLeftIcon /> Previous</Button>
            <Button variant={'ghost'}>1</Button>
            <Button variant={'ghost'}>2</Button>
            <Button variant={'ghost'}>3</Button>
            <Button variant={'ghost'}>...</Button>
            <Button variant={'ghost'}>Next <ChevronRightIcon /></Button>
        </div>
    )
}

export default PaginationPage