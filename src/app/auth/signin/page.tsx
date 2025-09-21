import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import Form from "./_components/Form";
import Link from "@/components/link/Link";
import { ArrowRight } from "lucide-react";

const SigninPage = () => {
    return (
        <div className="relative bg-neutral-50 height-auth flex items-center justify-center">
            <div className="relative">
                <Image
                    src={"/—Pngtree—empty shopping basket on wood_15459455.png"}
                    alt="my-cart"
                    width={900}
                    height={900}
                    className="hidden lg:block"
                />
                <div className="relative py-2 border lg:absolute top-0 left-0 w-[350px] h-full bg-white">
                    <Link
                        href={"/auth/signin/admin"}
                        className={`${buttonVariants({
                            variant: "link",
                        })} absolute z-10 top-2 right-2 !text-neutral-600`}
                    >
                        Admin Login <ArrowRight />
                    </Link>
                    <div className="text-2xl font-semibold mt-10 ml-5">Welcome Back</div>
                    <div className="text-xs ml-5 mt-2 text-gray-600">
                        Connect to <span className="text-primary">MYCart</span> with
                    </div>
                    <div className="w-full flex justify-center my-3">
                        <Button
                            className="w-7/8 font-semibold cursor-pointer"
                            variant={"secondary"}
                        >
                            <Image
                                src={
                                    "/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google-thumbnail.png"
                                }
                                alt="google"
                                width={30}
                                height={30}
                            />
                            Google
                        </Button>
                    </div>
                    <div className="flex w-full justify-center items-center font-semibold mt-10">
                        <Separator className="!w-12 !h-[2px] mr-2 bg-neutral-400" />
                        OR CONTINUE WITH EMAIL
                        <Separator className="!w-12 !h-[2px] ml-2 bg-neutral-400" />
                    </div>
                    <Form role={'user'} />
                    <div className="mt-2 flex items-center justify-center text-gray-500 text-sm gap-3">
                        <span>Don&apos;t have an account? </span>
                        <Link
                            href={`/auth/signup`}
                            className={`${buttonVariants({
                                variant: "link",
                                size: "sm",
                            })} !text-black`}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
