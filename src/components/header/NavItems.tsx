"use client";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import NavAuth from "./NavAuth";
import { MenuIcon, XIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Slide } from "react-awesome-reveal";

interface Props {
    role?: string
    token: string
}

const NavItems = ({ role, token }: Props) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="w-full flex">
            <div className="flex items-center mr-0 ml-auto lg:hidden">
                <Button
                    className="mr-4 cursor-pointer"
                    variant={"primary_two"}
                    size={"icon"}
                    onClick={() => setOpenMenu((prev) => !prev)}
                >
                    {openMenu ? <XIcon /> : <MenuIcon />}
                </Button>
                <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
            </div>

            <div
                className={`absolute py-5 lg:py-0 flex flex-col text-black lg:text-white bg-neutral-50 w-full duration-300 top-16 ${openMenu ? `left-0` : `-left-full`
                    } lg:relative lg:flex lg:flex-row lg:top-0 lg:left-0 lg:bg-transparent lg:items-center lg:justify-between lg:w-full`}
            >
                <Slide direction="right" triggerOnce>
                    <div className="lg:ml-20 xl:ml-40">
                        <NavLinks setOpenMenu={setOpenMenu} role={role} />
                    </div>
                </Slide>

                <Slide direction="right" triggerOnce>
                    <div className="lg:mr-4 lg:ml-auto">
                        <NavAuth setOpenMenu={setOpenMenu} token={token} />
                    </div>
                </Slide>
            </div>
        </div>
    );
};

export default NavItems;
