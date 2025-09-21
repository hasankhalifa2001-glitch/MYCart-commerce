"use client"

import React, { useEffect } from 'react'
import { Category } from '../../categories/page'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    categoryId: string
    setCategoryId: React.Dispatch<React.SetStateAction<string>>
    setSubCategoryId?: React.Dispatch<React.SetStateAction<string>>
    setBrandId?: React.Dispatch<React.SetStateAction<string>>
    categories: Category[]
}

const SelectCategory = ({ setCategoryId, categories, setSubCategoryId, setBrandId, categoryId }: Props) => {

    function handleValueChange(value: string) {
        setCategoryId(value)

    }

    useEffect(() => {
        if (setSubCategoryId) setSubCategoryId('');
        if (setBrandId) setBrandId('');
    }, [categoryId, setBrandId, setSubCategoryId]);

    return (
        <div>
            <Label className="mb-1" htmlFor="category">
                Category
            </Label>
            <div className="mt-1">
                <Select
                    name="category"
                    value={categoryId} // اجعل القيمة controlled
                    onValueChange={handleValueChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            {categories.map((category) => {
                                return (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default SelectCategory