"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validationError } from "@/validation/auth";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { createCategory, updateCategory } from "../_action/Category";
import LoadingComponent from "@/components/LoadingComponent";
import { toast } from "sonner";
import { Category } from "../page";
import { useRouter } from "next/navigation";

const initialState: {
    message?: string;
    error?: validationError;
    status?: number | null;
} = {
    message: "",
    error: {},
    status: null,
};

interface Props {
    token: string;
    category?: Category;
}

const Form = ({ token, category }: Props) => {
    const [selectedImage, setSelectedImage] = useState(
        category ? category.image : ""
    );

    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (!category?.image) return; // تأكد من وجود الصورة قبل الجلب

            try {
                const response = await fetch(category.image);
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
    }, [category?.image]); // يقوم بالتحديث فقط عند تغير `category.image`

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
        category
            ? updateCategory.bind(null, { token, id: category.id })
            : createCategory.bind(null, token),
        initialState
    );

    useEffect(() => {
        if (state && state.message && state.status && !pending) {
            toast(state.message, {
                className: state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
            router.push('/admin/categories');
        }
    }, [pending, state, router]);


    return (
        <form
            action={action}
            // className="flex max-[550px]:flex-col items-center justify-center gap-10 relative pb-10 md:pb-0 md:pr-10 border-b md:border-b-0 md:border-r"
            className="flex max-[550px]:flex-col items-center justify-evenly w-full lg:w-[50%] max-[550px]:gap-0 gap-10 relative "
        >
            <div className=" relative flex justify-between items-center flex-col">
                <div className="size-[250px] flex justify-center items-center absolute overflow-hidden">
                    {selectedImage && (
                        <Image
                            alt="Add User Image"
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
                {state?.error && state.error["image"] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error["image"] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error["image"]}
                    </p>
                )}
            </div>

            <div className="w-3/4 lg:w-1/3">
                <div className="my-5">
                    <Label htmlFor="categoryName" className="mb-1">
                        Category Name
                    </Label>
                    <div className="flex items-center gap-5">
                        <Input
                            type="text"
                            name="categoryName"
                            id="categoryName"
                            autoFocus={true}
                            placeholder="Enter category name"
                            className="mt-1"
                            defaultValue={category ? category.name : ""}
                        />
                    </div>
                    {state?.error && state.error["categoryName"] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state.error["categoryName"] ? "text-destructive" : ""
                                }`}
                        >
                            {state.error["categoryName"]}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    variant={"primary_two"}
                    disabled={pending}
                    className="mt-1"
                >
                    {pending ? <LoadingComponent /> : category ? 'Update' : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default Form;