/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fromatCurrency } from "@/lib/formatters";
// import { useCartStore } from '@/store/cart.store'
import React from "react";
import AddCodeCoupon from "./AddCodeCoupon";
import CheckOutButton from "./CheckOutButton";
import { Fade } from "react-awesome-reveal";

interface Props {
    cartItems: any;
    tax: any;
    token: string;
    orders: any
}

const CheckoutForm = ({ cartItems, tax, token, orders }: Props) => {

    let pay = true

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].is_paid === false) pay = false
    }

    return (
        <Fade direction="up" cascade damping={0.15} triggerOnce>
            <div className="flex flex-col justify-center items-center lg:items-end">
                <div className="flex flex-col justify-end w-7/8 md:w-3/5 lg:w-2/5 font-bold my-5">
                    <div className="flex justify-between items-center py-3 border-b">
                        <div>Sub Total:</div>
                        <div className="text-gray-500 font-semibold">
                            {fromatCurrency(cartItems.total_price_after_discount)}
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                        <div>Tax:</div>
                        <div className="text-gray-500 font-semibold">
                            +{fromatCurrency(tax.taxprice)}
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                        <div>Coupon Code:</div>
                        {cartItems.coupons ? (
                            <div className="text-gray-500 font-semibold">
                                -
                                {fromatCurrency(
                                    Number(
                                        cartItems.coupons.reduce(
                                            (acc: any, coupon: { discount: any }) => {
                                                return acc + coupon.discount;
                                            },
                                            0
                                        )
                                    )
                                )}
                            </div>
                        ) : (
                            <AddCodeCoupon token={token} />
                        )}
                    </div>

                    <div className="flex justify-between items-center py-3">
                        <div>Grand total:</div>
                        <div className="text-gray-900 font-bold text-lg">
                            {fromatCurrency(
                                Number(cartItems.total_price_after_discount) +
                                Number(tax.taxprice)
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-7/8 md:w-3/5 lg:w-fit">
                    <CheckOutButton token={token} pay={pay} />
                </div>
            </div>
        </Fade>
    );
};

export default CheckoutForm;
