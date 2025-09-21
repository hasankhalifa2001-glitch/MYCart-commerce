"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import SelectCategory from "../../brands/_components/SelectCategory";
import { Category } from "../../categories/page";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getSubCategory } from "../../categories/_action/SubCategory";
import { getBrandsByCategory } from "../../brands/_action/Brand";
import { validationError } from "@/validation/auth";
import { addProduct } from "../_action/Product";
import LoadingComponent from "@/components/LoadingComponent";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface FormProps {
    token: string;
    categories: Category[];
}

const FormProduct = ({ token, categories }: FormProps) => {

    const [selectedImage, setSelectedImage] = useState("");
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
            console.log(selectedImage)

            // تحديث fileInputRef بالقيمة الجديدة
            const dataTransfer: DataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (fileInputRef?.current) {
                fileInputRef.current.files = dataTransfer.files;
                console.log(fileInputRef.current.files);
            }
        }
    };

    const initialState: {
        message?: string;
        error?: validationError;
        status?: number | null;
        formData?: FormData | null;
    } = {
        message: "",
        error: {},
        status: null,
        formData: null,
    };

    const [state, action, pending] = useActionState(addProduct.bind(null, { categoryId, subCategoryId, brandId, token }), initialState)

    console.log(state?.error)

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast(state.message, {
                className:
                    state.status === 201 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
            redirect('/admin/products')
        }
    }, [pending, state?.message, state?.status]);


    console.log(typeof categoryId)

    return (
        <form action={action} className="w-full flex flex-col justify-center items-center mt-10">
            <div className="flex flex-col xl:flex-row justify-between items-center w-full lg:w-[90%] max-[550px]:gap-0 gap-10 relative">
                {/* Image Section */}
                <div className=" relative flex justify-between items-center flex-col">
                    <div className="size-[250px] flex justify-center items-center absolute overflow-hidden">
                        {selectedImage && (
                            <Image
                                alt="Add Product Image"
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
                            id="Product-image"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <Label
                            htmlFor="Product-image"
                            className={`size-[250px] border flex justify-center items-center duration-300 bg-gray-50/40 
                        ${selectedImage
                                    ? "opacity-0 transition-opacity hover:opacity-100"
                                    : ""
                                }`}
                        >
                            <ImagePlus className="text-gray-600" />
                        </Label>
                    </div>
                    {/* {state?.error && state.error["image"] && (
                    <p
                        className={`text-accent mt-2 text-sm font-medium ${state.error["image"] ? "text-destructive" : ""
                            }`}
                    >
                        {state.error["image"]}
                    </p>
                )} */}
                </div>
                {/* Section 1 */}
                <div className="w-3/4">
                    <div className="my-5">
                        <Label htmlFor="productName" className="mb-1">
                            Product Name
                        </Label>
                        <div className="flex items-center gap-5">
                            <Input
                                type="text"
                                name="productName"
                                id="productName"
                                autoFocus={true}
                                placeholder="Enter product name"
                                className="mt-1"
                            // defaultValue={""}
                            />
                        </div>
                        {state?.error && state.error["productName"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["productName"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["productName"]}
                            </p>
                        )}
                    </div>
                    <div className="my-5">
                        <Label htmlFor="description" className="mb-1">
                            Description
                        </Label>
                        <div className="flex items-center gap-5">
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="Enter description"
                                className="mt-1"
                            // defaultValue={""}
                            />
                        </div>
                        {state?.error && state.error["description"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["description"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["description"]}
                            </p>
                        )}
                    </div>
                </div>
                {/* Section 2 */}
                <div className="w-3/4 xl:w-1/2">
                    <div className="my-5">
                        <Label htmlFor="quantity" className="mb-1">
                            Quantity
                        </Label>
                        <div className="flex items-center gap-5">
                            <Input
                                type="text"
                                name="quantity"
                                id="quantity"
                                placeholder="Enter quantity"
                                className="mt-1"
                            // defaultValue={""}
                            />
                        </div>
                        {state?.error && state.error["quantity"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["quantity"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["quantity"]}
                            </p>
                        )}
                    </div>
                    <div className="my-5">
                        <Label htmlFor="price" className="mb-1">
                            Price
                        </Label>
                        <div className="flex items-center gap-5">
                            <Input
                                type="text"
                                name="price"
                                id="price"
                                placeholder="Enter price"
                                className="mt-1"
                            // defaultValue={""}
                            />
                        </div>
                        {state?.error && state.error["price"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["price"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["price"]}
                            </p>
                        )}
                    </div>
                    <div className="my-5">
                        <Label htmlFor="priceAfterDiscount" className="mb-1">
                            Price After Discount
                        </Label>
                        <div className="flex items-center gap-5">
                            <Input
                                type="text"
                                name="priceAfterDiscount"
                                id="priceAfterDiscount"
                                placeholder="Enter price After Discount"
                                className="mt-1"
                            // defaultValue={""}
                            />
                        </div>
                        {state?.error && state.error["priceAfterDiscount"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["priceAfterDiscount"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["priceAfterDiscount"]}
                            </p>
                        )}
                    </div>
                </div>
                {/* Section 3 */}
                <div className="w-3/4">
                    <div className="my-5">
                        <SelectCategory
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            categories={categories}
                            setSubCategoryId={setSubCategoryId}
                            setBrandId={setBrandId}
                        />
                        {state?.error && state.error["category"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["category"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["category"]}
                            </p>
                        )}
                    </div>
                    <div className="my-5">
                        <SelectSubCategories
                            categoryId={Number(categoryId)}
                            subCategoryId={subCategoryId}
                            setSubCategoryId={setSubCategoryId}
                            token={token}
                        />
                    </div>
                    <div className="my-5">
                        <SelectBrands
                            categoryId={Number(categoryId)}
                            brandId={brandId}
                            setBrandId={setBrandId}
                            token={token}
                        />
                    </div>
                </div>
            </div>
            <div className="w-[90%] flex justify-end my-5">
                <Button
                    type="submit"
                    variant={"primary_two"}
                    disabled={pending}
                    className="mt-1"
                >
                    {pending ? <LoadingComponent /> : "Save"}
                </Button>
            </div>
        </form>
    );
};

export default FormProduct;

export type SubCategory = {
    id: number;
    name: string;
};

interface SubCategoryProps {
    categoryId: number;
    subCategoryId: string;
    setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
    token: string;
}

const SelectSubCategories = ({
    categoryId,
    setSubCategoryId,
    subCategoryId,
    token,
}: SubCategoryProps) => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    useEffect(() => {
        async function getSubCategories() {
            try {
                const res = await getSubCategory(categoryId, token);
                setSubCategories(res);
            } catch (error) {
                console.log(error);
            }
        }

        getSubCategories();
    }, [categoryId, token]);

    return (
        <>
            <Label className="mb-1" htmlFor="subcategory">
                Sub Category
            </Label>
            <div className="mt-1">
                <Select
                    name="subcategory"
                    value={subCategoryId}
                    onValueChange={(value) => setSubCategoryId(value)}
                // defaultValue={sub[0].id}
                >
                    <SelectTrigger className="w-[180px]">
                        {/* <SelectValue /> */}
                        <SelectValue placeholder="Select a sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>SubCategory</SelectLabel>
                            {subCategories ? (
                                subCategories.map((s) => {
                                    return (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name}
                                        </SelectItem>
                                    );
                                })
                            ) : (
                                <div>no</div>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

export type Brand = {
    id: number;
    name: string;
};

interface BrandProps {
    categoryId: number;
    brandId: string;
    setBrandId: React.Dispatch<React.SetStateAction<string>>;
    token: string;
}

const SelectBrands = ({
    categoryId,
    setBrandId,
    brandId,
    token,
}: BrandProps) => {
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        async function getSubCategories() {
            try {
                const res = await getBrandsByCategory(categoryId, token);
                setBrands(res);
            } catch (error) {
                console.log(error);
            }
        }

        getSubCategories();
    }, [categoryId, token]);


    return (
        <>
            <Label className="mb-1" htmlFor="brand">
                Brand
            </Label>
            <div className="mt-1">
                <Select
                    name="brand"
                    value={brandId} // اجعل القيمة controlled
                    onValueChange={(value) => setBrandId(value)}
                // defaultValue={sub[0].id}
                >
                    <SelectTrigger className="w-[180px]">
                        {/* <SelectValue /> */}
                        <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Brand</SelectLabel>
                            {brands ? (
                                brands.map((s) => {
                                    return (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name}
                                        </SelectItem>
                                    );
                                })
                            ) : (
                                <div>no</div>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    );
};

// "use client"

// import Link from "next/link"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { toast } from "sonner"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// const FormSchema = z.object({
//   email: z
//     .string({
//       required_error: "Please select an email to display.",
//     })
//     .email(),
// })

// export function SelectForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   })

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast("You submitted the following values", {
//       description: (
//         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a verified email to display" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="m@example.com">m@example.com</SelectItem>
//                   <SelectItem value="m@google.com">m@google.com</SelectItem>
//                   <SelectItem value="m@support.com">m@support.com</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormDescription>
//                 You can manage email addresses in your{" "}
//                 <Link href="/examples/forms">email settings</Link>.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
