import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "../link/Link";
import NavItems from "./NavItems";
import CartButton from "./CartButton";
import { getPayload } from "@/lib/getPayload";
import { cookies } from "next/headers";
import { ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { getCart } from "@/app/cart/_action/ActionCart";
import { Slide } from "react-awesome-reveal";


const Navbar = async () => {
    const token = (await cookies()).get("jwtToken")?.value || "";
    const payload = await getPayload(token);
    const role = payload?.role;

    const cart = await getCart(token);

    return (
        <div className="h-16 sticky z-50 top-0 inset-0 bg-primary text-white">
            <MaxWidthWrapper>
                <div className="h-16 flex items-center">
                    <Slide direction="left" triggerOnce>
                        <div className="ml-4 lg:ml-0 font-bold flex">
                            <Link href={"/"} className="flex items-center">
                                <div className="flex flex-col items-end justify-center relative">
                                    <div className="text-sm relative top-1 font-semibold flex items-center gap-[2px]">
                                        <div className="flex flex-col gap-[2px] items-end">
                                            <Separator className="!w-6" />
                                            <Separator className="!w-4" />
                                        </div>
                                        Platform
                                    </div>
                                    <div className="text-3xl relative -top-1">
                                        <span className="text-primary-two">MY</span>Cart
                                    </div>
                                </div>
                                <ShoppingCart size={40} />
                            </Link>
                        </div>
                    </Slide>

                    <div className="lg:flex text-base mr-4 lg:mr-0  w-full ">
                        <NavItems role={role} token={token} />
                    </div>

                    <div className="mr-4 lg:mr-0 ml-auto">
                        <Slide direction="right" triggerOnce>
                            <CartButton
                                cartItems={cart.status === 200 && cart.data.cartitems}
                            />
                        </Slide>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default Navbar;
