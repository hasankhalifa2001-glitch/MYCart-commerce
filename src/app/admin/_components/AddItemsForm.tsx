import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validationError } from '@/validation/auth'
import { Label } from '@radix-ui/react-label'
import React from 'react'


interface FromProps {
    name: string
    label: string
    placeholder: string
    error: validationError
}

const AddItemsForm = ({ name, label, placeholder }: FromProps) => {
    return (
        <form className='max-w-[500px] mx-auto my-5'>
            <div className='mb-4'>
                <Label htmlFor={name} className='mb-1' >
                    {label}Category Name
                </Label>
                <div className='flex items-center gap-5'>
                    <Input
                        type='text'
                        name={name}
                        id={name}
                        autoFocus={true}
                        placeholder={placeholder}
                        className='mt-1'
                    />
                    <Button type='submit' className='mt-1'>
                        {/* {pending ? <LoadingComponent /> : save('create')} */} Save
                    </Button>
                </div>
                {/* {state?.error && state.error['category'] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error['category'] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error['category']}
                    </p>
                )} */}
            </div>

        </form>
    )
}

export default AddItemsForm