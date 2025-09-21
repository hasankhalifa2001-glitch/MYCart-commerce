"use client"

import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validationError } from '@/validation/auth'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { createBrand, updateBrand } from '../_action/Brand'
import SelectCategory from './SelectCategory'
import { Category } from '../../categories/page'
import { Brand } from '../page'
import { useRouter } from 'next/navigation'

interface Props {
    token: string
    categories: Category[]
    brand?: Brand
    add?: boolean
}

const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,

} = {
    message: '',
    error: {},
    status: null,
}

const Form = ({ token, categories, brand, add }: Props) => {

    const [selectedImage, setSelectedImage] = useState(brand ? brand.image : '')
    const [categoryId, setCategoryId] = useState(categories[0]?.id.toString())

    const router = useRouter()

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (!brand?.image) return; // تأكد من وجود الصورة قبل الجلب

            try {
                const response = await fetch(brand.image);
                if (!response.ok) {
                    throw new Error(`فشل في جلب الصورة: ${response.statusText}`);
                }

                const blob = await response.blob();
                const file = new File([blob], "cloudinary-image.jpg", { type: blob.type });

                // تحديث محتوى ملف الإدخال باستخدام DataTransfer
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);

                if (fileInputRef.current) {
                    fileInputRef.current.files = dataTransfer.files;
                    console.log(fileInputRef.current.files)
                }
            } catch (error) {
                console.error("❌ خطأ في معالجة الصورة:", error);
            }
        };

        fetchImage();
    }, [brand?.image]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);

            // تحديث fileInputRef بالقيمة الجديدة
            const dataTransfer: DataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (fileInputRef?.current) {
                fileInputRef.current.files = dataTransfer.files;
                console.log(fileInputRef.current.files)
            }
        }
    };


    const [state, action, pending] = useActionState(
        brand
            ? updateBrand.bind(null, { token, id: brand.id })
            : createBrand.bind(null, { token, categoryId }), initialState)

    console.log(state)


    useEffect(() => {
        if (state && state.message && state.status && !pending) {
            toast(state.message, {
                className: state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
            router.push('/admin/brands');
        }
    }, [pending, state, router]);

    return (
        <form action={action} className='flex my-10 items-center justify-center gap-20 relative'>
            <div className="mt-10 relative flex justify-between items-center flex-col">
                <div className="size-[250px] flex justify-center items-center absolute overflow-hidden">
                    {selectedImage && (
                        <Image
                            alt={brand ? brand.name : "Add User Image"}
                            src={selectedImage}
                            width={250}
                            height={250}
                            className="object-cover"
                        />
                    )}
                </div>
                <div className=" relative flex justify-center items-center">
                    <Input
                        type="file"
                        ref={fileInputRef}
                        name="image"
                        accept="images/*"
                        id="profile-image"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <Label
                        htmlFor="profile-image"
                        className={`size-[250px] border flex justify-center items-center duration-300 bg-gray-50/40 
                        ${selectedImage
                                ? "opacity-0 transition-opacity hover:opacity-100"
                                : ""
                            }`}
                    >
                        <ImagePlus className="text-gray-600" />
                    </Label>
                </div>
                {state?.error && state.error['image'] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error['image'] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error['image']}
                    </p>
                )}
            </div>

            <div className='w-1/3'>
                <div className='my-5'>
                    <Label htmlFor='brandName' className='mb-1' >
                        Brand Name
                    </Label>
                    <div className='flex items-center gap-5'>
                        <Input
                            type='text'
                            name='brandName'
                            id='brandName'
                            autoFocus={true}
                            placeholder="Enter brand name"
                            className='mt-1'
                            defaultValue={brand ? brand.name : ''}
                        />

                    </div>
                    {state?.error && state.error['brandName'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state.error['brandName'] ? "text-destructive" : ""
                                }`}
                        >
                            {state.error['brandName']}
                        </p>
                    )}
                </div>
                {add && <div className='my-5'>
                    <SelectCategory categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} />
                </div>}
                <Button type='submit' variant={'primary_two'} disabled={pending} className='mt-1'>
                    {pending ? <LoadingComponent /> : 'Save'}
                </Button>
            </div>

        </form>
    )
}

export default Form