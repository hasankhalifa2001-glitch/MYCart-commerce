'use client'
import React from "react";
import Link from "../link/Link";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { signout } from "@/app/auth/signin/_action/signin";
import { useRouter } from "next/navigation";


interface Props {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
    token: string
}

const NavAuth = ({ setOpenMenu, token }: Props) => {

    const router = useRouter()

    const SignOutButton = () => {
        try {
            signout()
            router.replace('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {token ? (
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <Button onClick={SignOutButton} variant={"primary_two"} className="cursor-pointer">Signout</Button>
                    <Separator
                        orientation="vertical"
                        className="hidden lg:block !h-6 bg-neutral-300"
                    />
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
                    <div className="p-3 duration-300 border-b lg:border-b-0 mx-5 md:mx-25 lg:p-0 lg:mx-0">
                        <Link
                            href={"/auth/signin"}
                            onClick={() => setOpenMenu(false)}
                            className={`${buttonVariants({ variant: "outline" })} text-black`}
                        >
                            Sign in
                        </Link>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden lg:block !h-6 bg-neutral-300"
                    />
                    <div className="p-3 duration-300 mx-5 md:mx-25 lg:p-0 lg:mx-0">
                        <Link
                            href={"/auth/signup"}
                            onClick={() => setOpenMenu(false)}
                            className={`${buttonVariants({ variant: "primary_two" })}`}
                        >
                            Create account
                        </Link>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden lg:block !h-6 bg-neutral-300"
                    />
                </div>
            )}
        </div>
    );
};

export default NavAuth;
