"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useActionState, useEffect, useState } from 'react'
import SelectCategory from '../../brands/_components/SelectCategory'
import { Category } from '../page'
import { Button } from '@/components/ui/button'
import { validationError } from '@/validation/auth'
import LoadingComponent from '@/components/LoadingComponent'
import { toast } from 'sonner'
import { addSubCategory } from '../_action/SubCategory'


interface Props {
    token: string
    categories: Category[]
}

export const initialSubCategoryState: {
    message?: string,
    error?: validationError,
    status?: number | null,

} = {
    message: '',
    error: {},
    status: null,
}

const FormSubCategory = ({ token, categories }: Props) => {

    const [categoryId, setCategoryId] = useState(categories[0]?.id.toString())

    const [state, action, pending] = useActionState(addSubCategory.bind(null, { token, categoryId }), initialSubCategoryState)

    console.log(state)

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast(state.message, {
                className: state.status === 201 ? '!text-green-400' : '!text-destructive',
                position: 'top-center'
            })
        }
    }, [pending, state?.message, state?.status])

    return (
        <form action={action} className='my-10 mx-auto flex justify-center'>
            <div className="w-3/4 md:w-1/2 xl:w-1/3 flex flex-col gap-5">
                <div>
                    <Label htmlFor="subCategoryName">
                        Sub Category Name
                    </Label>
                    <Input
                        type="text"
                        name="subCategoryName"
                        id="subCategoryName"
                        autoFocus={true}
                        placeholder="Enter sub category name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <SelectCategory categories={categories} categoryId={categoryId} setCategoryId={setCategoryId} />
                </div>
                <Button
                    type="submit"
                    variant={"primary_two"}
                    disabled={pending}
                    className="mt-1 w-1/2"
                >
                    {/* {pending ? <LoadingComponent /> : category ? 'Update' : "Save"}  */}
                    {pending ? <LoadingComponent /> : "Save"}
                </Button>
            </div>




        </form>
    )
}

export default FormSubCategory



{/* {state?.error && state.error["subCategoryName"] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error["subCategoryName"] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error["subCategoryName"]}
                    </p>
                )} */}