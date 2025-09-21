/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProductForId } from '@/app/admin/products/_action/Product';
import { cookies } from 'next/headers';
import React from 'react'
import StarRating from '../_components/StarRating';
import { fromatCurrency } from '@/lib/formatters';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Separator } from '@/components/ui/separator';
import WriteReview from '../_components/WriteReview';
import { getCart } from '@/app/cart/_action/ActionCart';
import { getReview } from '../_action/Review';
import AddToCart from '@/components/products/AddToCart';
import TimeAgo from '../_components/TimeAgo';
import jwt from 'jsonwebtoken';
import DeleteReview from '../_components/DeleteReview';
import { buttonVariants } from '@/components/ui/button';


export type token = {
    id: number;
    email: string;
    role: string;
};


interface Props {
    params: Promise<{ productId: string }>;
}

const ProductId = async ({ params }: Props) => {

    const { productId } = await params;

    const token = (await cookies()).get("jwtToken")?.value as string;
    const decoded = jwt.decode(token) as token;


    const cart = await getCart(token)
    console.log(cart)

    const product = await getProductForId(productId, token)

    const reviews = await getReview(Number(productId), token)


    return (
        <div>
            <MaxWidthWrapper className="max-w-screen-2xl my-10 font-semibold">
                <div className="flex flex-col mx-2 lg:flex-row gap-10 ">
                    <div className="mx-2 lg:mx-0">
                        <Image
                            alt={product.name}
                            src={product.image}
                            width={600}
                            height={600}
                            className="border"
                        />
                    </div>
                    <div className="w-9/10 mx-auto">
                        <div className="flex flex-col lg:flex-row items-start lg:items-start lg:justify-between w-full text-lg font-semibold border-b pb-5 gap-10">
                            <div className=" text-xl flex justify-between gap-5 flex-col w-3/5">
                                <div className="font-bold text-primary-two">{product.name}</div>
                                <div className="text-lg">{product.description}</div>
                            </div>
                            <div className="grid grid-cols-2 text-base w-3/10">
                                <div className="">
                                    <div>Category: </div>
                                    <div>SubCategory: </div>
                                    <div>Brand: </div>
                                </div>
                                <div className="text-slate-600">
                                    <div>{product.category}</div>
                                    <div>{product.subcategory}</div>
                                    <div>{product.brand}</div>
                                </div>
                            </div>
                        </div>
                        <div className="border-b py-5">
                            <div>Premium Quality</div>
                            <div className="text-2xl text-primary font-blod my-2">
                                {fromatCurrency(Number(product.price))}
                            </div>
                            <div className="flex flex-col lg:flex-row gap-5 items-center">
                                <StarRating
                                    rating={parseFloat(product.ratings_average)}
                                    textSize="text-3xl"
                                    show={true}
                                />
                                <Separator
                                    orientation="vertical"
                                    className="lg:!h-6 !text-slate-700"
                                />
                                <WriteReview token={token} id={Number(product.id)} status="Add" />
                            </div>
                        </div>
                        <div className='py-5 text-lg flex flex-col items-start space-y-2 gap-2'>
                            <div>Quantity: {product.quantity}</div>
                            <AddToCart token={token} product={product} cartItems={cart.status === 200 && cart.data.cartitems} />
                        </div>
                    </div>
                </div>
                <div className="py-5 text-lg">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="">
                            <div>My Review</div>
                            {reviews.map((review: any, index: number) => {
                                if (review.user.id === decoded.id) {
                                    return (
                                        <div
                                            key={index}
                                            className="border p-5 shadow rounded bg-gray-50 hover:bg-gray-100 duration-300 relative my-8 flex flex-col space-y-3"
                                        >
                                            <div className={`absolute -top-5 left-5 ${buttonVariants()}`}>
                                                {review.user.name}
                                            </div>
                                            <div className="absolute top-2 right-2 text-sm text-primary font-bold flex gap-2">
                                                <TimeAgo timestamp={review.created_at} />
                                                <WriteReview token={token} id={review.id} status="Update" review={review} />
                                                <DeleteReview reviewId={review.id} token={token} />
                                            </div>
                                            <div className="w-4/5">{review.review_text}</div>
                                            <StarRating
                                                rating={review.rating}
                                                textSize="text-2xl"
                                                show={false}
                                            />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div>
                            <div>Other Review</div>
                            {reviews.map((review: any, index: number) => {
                                if (review.user.id !== decoded.id) {
                                    return (
                                        <div
                                            key={index}
                                            className="border p-5 shadow rounded bg-gray-50 hover:bg-gray-100 duration-300 relative my-8 flex flex-col space-y-3"
                                        >
                                            <div className={`absolute -top-5 left-5 ${buttonVariants()}`}>
                                                {review.user.name}
                                            </div>
                                            <div className="absolute top-2 right-2 text-sm text-primary font-bold">
                                                <TimeAgo timestamp={review.created_at} />
                                            </div>
                                            <div className="">{review.review_text}</div>
                                            <StarRating
                                                rating={review.rating}
                                                textSize="text-2xl"
                                                show={false}
                                            />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default ProductId