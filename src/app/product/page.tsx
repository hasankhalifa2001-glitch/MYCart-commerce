import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { fromatCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import StarRating from "./_components/StarRating";
import { Separator } from "@/components/ui/separator";
import WriteReview from "./_components/WriteReview";
import { cookies } from "next/headers";
import TimeAgo from "./_components/TimeAgo";
import jwt from "jsonwebtoken";
import DeleteReview from "./_components/DeleteReview";

export type token = {
    id: number;
    email: string;
    role: string;
};

export type Review = {
    id: number;
    review_text: string;
    rating: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    product: {
        id: number;
        name: string;
    };
};

const page = async () => {
    const token = (await cookies()).get("jwtToken")?.value as string;
    const decoded = jwt.decode(token) as token;
    console.log(decoded);

    // const cart = await getCart(token)

    // const product = await getProductForId(productId, token)

    const product = {
        id: 9,
        name: "Sahale snacks",
        image:
            "https://res.cloudinary.com/dleetnqyg/image/upload/v1751547229/file_zwlldo.jpg",
        description:
            "Enjoy the experience of indulging in luxurious salted nuts! This delicious blend combines a variety of carefully selected nuts, such as almonds, pistachios, cashews, and other nuts, giving you a tasty and crunchy flavor!",
        price: "2000.00",
        price_after_discount: null,
        quantity: 98,
        sold: 2,
        category: "Pills",
        ratings_average: "0.00",
        ratings_quantity: 0,
        created_at: "2025-07-28T11:20:37.331Z",
        updated_at: "2025-08-30T13:52:55.570Z",
    };

    const reviews = [
        {
            id: 5,
            review_text: "osama",
            rating: 5,
            created_at: "2025-08-01T15:58:26.083Z",
            updated_at: "2025-08-01T15:58:26.083Z",
            user: { id: 2, name: "Hasan khailfa", email: "hasan@gmail.com" },
            product: { id: 7, name: "Kiri" },
        },
        {
            id: 6,
            review_text: "hadeel",
            rating: 4,
            created_at: "2025-08-07T16:09:52.110Z",
            updated_at: "2025-08-07T16:09:52.110Z",
            user: { id: 2, name: "Hasan khailfa", email: "hasan@gmail.com" },
            product: { id: 7, name: "Kiri" },
        },
        {
            id: 8,
            review_text: "Enjoy the experience of indulging in luxurious salted nuts! This delicious blend combines a variety of carefully selected nuts, such as almonds, pistachios, cashews, and other nuts, giving you a tasty and crunchy flavor!",
            rating: 5,
            created_at: "2025-08-27T09:00:34.713Z",
            updated_at: "2025-08-27T09:00:34.713Z",
            user: { id: 4, name: "Hasan khailfa", email: "hasankh@gmail.com" },
            product: { id: 7, name: "Kiri" },
        },
        {
            id: 13,
            review_text: "nice",
            rating: 3,
            created_at: "2025-08-27T16:54:14.819Z",
            updated_at: "2025-08-27T16:54:14.819Z",
            user: { id: 3, name: "hadeel", email: "hadeel@gmail.com" },
            product: { id: 7, name: "Kiri" },
        },
    ];

    // let myReview: Review[] = [];
    // let otherReview: Review[] = [];

    // reviews.map((review) => {
    //     if (review.user.id === decoded.id) {
    //         myReview.push(review);
    //     } else {
    //         otherReview.push(review);
    //     }
    // });

    // console.log(myReview);

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
                                    {/* {product.subcategory ? <div>SubCategory: </div> : ''}
                                    {product.brand ? <div>Brand: </div> : ''} */}

                                </div>
                                <div className="text-slate-600">
                                    <div>{product.category}</div>
                                    {/* <div>{product.subcategory}</div>
                                    <div>{product.brand}</div> */}
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
                        {/* <div className='py-5 text-lg'>
                            <div>Quantity: {product.quantity}</div>
                            <AddToCart token={token} product={product} cartItems={cart.data.cartitems} />
                        </div> */}
                    </div>
                </div>
                <div className="py-5 text-lg">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="">
                            <div>My Review</div>
                            {reviews.map((review: Review, index: number) => {
                                if (review.user.id === decoded.id) {
                                    return (
                                        <div
                                            key={index}
                                            className="border p-5 shadow relative my-5 flex flex-col space-y-3"
                                        >
                                            <div className="absolute -top-5 left-5 bg-white p-1 text-slate-600">
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
                            {reviews.map((review: Review, index: number) => {
                                if (review.user.id !== decoded.id) {
                                    return (
                                        <div
                                            key={index}
                                            className="border p-5 shadow relative my-5 flex flex-col space-y-3"
                                        >
                                            <div className="absolute -top-5 left-5 bg-white p-1 text-slate-600">
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
    );
};

export default page;
