import { getCategories } from '@/app/admin/categories/_action/Category';
import { cookies } from 'next/headers';
import React from 'react'
import CategoryProduct from './CategoryProduct';
import { Category } from '@/app/admin/categories/page';
import { getAllProductForCategory } from '@/app/admin/products/_action/Product';

const CategoriesMenu = async () => {

    const token = (await cookies()).get("jwtToken")?.value as string;

    const categories = await getCategories(token);

    console.log(categories.date)

    return (
        <div>
            {categories.date.map(async (category: Category) => {
                const products = await getAllProductForCategory(category.id.toString(), token);
                return (
                    <CategoryProduct key={category.id} category={category} token={token} products={products} />
                )
            })}
        </div>
    )
}

export default CategoriesMenu