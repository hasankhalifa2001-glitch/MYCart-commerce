'use client'

import { Product } from "@/app/categories/[categoryId]/page"
import Image from "next/image"
import { useEffect, useState } from "react"
import SelectCategory from "../../brands/_components/SelectCategory"
import { Category } from "../../categories/page"
import axios from "axios"
import { domain } from "@/constant/postman"
import {
    Select,
    SelectItem,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getBrandsByCategory } from "../../brands/_action/Brand"
import { Label } from "@/components/ui/label"
import { getSubCategory } from "../../categories/_action/SubCategory"
import LoadingComponent from "@/components/LoadingComponent"
import ProductDelete from "./ProductDelete"
import Link from "@/components/link/Link"
import { buttonVariants } from "@/components/ui/button"
import { PenBoxIcon } from "lucide-react"

interface Props {
    token: string;
    categories: Category[];
}

const ProductView = ({ token, categories }: Props) => {

    const [products, setProducts] = useState<Product[]>([])
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [loading, setLoading] = useState(false);

    console.log(categoryId)
    console.log(subCategoryId)
    console.log(brandId)

    useEffect(() => {

        if (!categoryId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `${domain}/product/admin/find/all`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                        params: {
                            category: categoryId,
                            subcategory: subCategoryId,
                            brand: brandId
                        }
                    }
                );

                setProducts(res.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, categoryId, subCategoryId, brandId]);


    return (
        <div>
            <div className="flex justify-start gap-2">
                <SelectCategory
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    categories={categories}
                    setSubCategoryId={setSubCategoryId}
                    setBrandId={setBrandId}
                />
                <SelectSubCategories
                    categoryId={Number(categoryId)}
                    subCategoryId={subCategoryId}
                    setSubCategoryId={setSubCategoryId}
                    token={token}
                    loading={loading}
                />
                <SelectBrands
                    categoryId={Number(categoryId)}
                    brandId={brandId}
                    setBrandId={setBrandId}
                    token={token}
                    loading={loading}
                />
            </div>
            {!categoryId && (
                <div className="flex justify-center my-10 text-xl font-semibold">الرجاء اختيار تصنيف لعرض المنتجات</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
                {loading ? <LoadingComponent /> : products.map((product) => {
                    return (
                        <div key={product.id} className="flex flex-col md:flex-row items-center gap-4 border rounded-md shadow-sm p-4 bg-white">
                            {/* صورة المنتج */}
                            <div className=" relative overflow-hidden rounded-md ">
                                <Image
                                    alt={product.name}
                                    src={product.image}
                                    width={400}
                                    height={400}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 200px"
                                    priority // ✅ مهمة: يجعل Next.js يحمّلها مباشرة
                                    placeholder="empty" // ✅ بدك تستخدم blur؟ استخدم placeholder="blur" مع blurDataURL
                                />
                            </div>

                            {/* تفاصيل المنتج + العمليات */}
                            <div className="flex-1 w-full flex flex-col justify-between gap-2">
                                <h2 className="text-lg font-semibold">{product.name}</h2>

                                <div className="flex gap-2 mt-2">
                                    <ProductDelete token={token} id={product.id} />

                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className={buttonVariants({
                                            variant: "outline",
                                            size: "icon",
                                        })}
                                    >
                                        <PenBoxIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default ProductView


export type SubCategory = {
    id: number;
    name: string;
};

interface SubCategoryProps {
    categoryId: number;
    subCategoryId: string;
    setSubCategoryId: React.Dispatch<React.SetStateAction<string>>;
    token: string;
    loading: boolean
}

const SelectSubCategories = ({
    categoryId,
    setSubCategoryId,
    subCategoryId,
    token,
    loading
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
        <div>
            <Label className="mb-1" htmlFor="subcategory">
                Sub Category
            </Label>
            <div className="mt-1">
                <Select
                    name="subcategory"
                    value={subCategoryId}
                    onValueChange={(value) => setSubCategoryId(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>SubCategory</SelectLabel>
                            {loading ? <LoadingComponent /> : subCategories ? (
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
        </div>
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
    loading: boolean
}

const SelectBrands = ({
    categoryId,
    setBrandId,
    brandId,
    token,
    loading
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
        <div>
            <Label className="mb-1" htmlFor="brand">
                Brand
            </Label>
            <div className="mt-1">
                <Select
                    name="brand"
                    value={brandId} // اجعل القيمة controlled
                    onValueChange={(value) => setBrandId(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        {/* <SelectValue /> */}
                        <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Brand</SelectLabel>
                            {loading ?
                                <LoadingComponent />
                                : brands ? (
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
        </div>
    );
};