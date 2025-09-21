"use client";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "../link/Link";
import { usePathname } from "next/navigation";

interface Props {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
    role?: string
}

const NavLinks = ({ setOpenMenu, role }: Props) => {
    const Items = [
        { name: "Menu", href: `/menu` },
        { name: "About", href: `/about` },
        { name: "Contact", href: `/contact` },
        { name: "Orders", href: `/orders` },
    ];

    const pathname = usePathname();
    // console.log(pathname.startsWith(role === 'user' ? '/profile' : '/admin'))


    return (
        <div className="lg:flex lg:items-center lg:gap-6">
            {Items.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="p-5 mx-5 md:mx-25 hover:bg-neutral-100 duration-300 lg:hover:bg-transparent lg:p-0 lg:mx-0 border-b lg:border-b-0 flex space-x-6 font-semibold"
                    >
                        <Link
                            href={item.href}
                            onClick={() => setOpenMenu(false)}
                            className={`hover:text-primary-two duration-300 ${pathname.startsWith(item.href) ? `text-primary-two` : ""
                                }`}
                        >
                            {item.name}
                        </Link>
                        {index < Items.length - 1 && (
                            <Separator
                                orientation="vertical"
                                className="hidden lg:block !h-6 bg-neutral-300"
                            />
                        )}
                    </div>
                )
            })}
            {role && <div
                className="p-5 mx-5 md:mx-25 hover:bg-neutral-100 duration-300 lg:hover:bg-transparent lg:p-0 lg:mx-0 border-b lg:border-b-0 flex space-x-6 font-semibold"
            >
                <Separator
                    orientation="vertical"
                    className="hidden lg:block !h-6 bg-neutral-300"
                />
                <Link
                    href={`/${role === 'user' ? 'profile' : 'admin'}`}
                    onClick={() => setOpenMenu(false)}
                    className={`hover:text-primary-two duration-300 ${pathname.startsWith(role === 'user' ? '/profile' : '/admin') ? `text-primary-two` : ""
                        }`}
                >
                    {role === 'user' ? 'Profile' : 'Admin'}
                </Link>
            </div>}
        </div>
    );
};

export default NavLinks;
