"use client";
import Link from "@/components/link/Link";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon, Users } from "lucide-react";
import { usePathname } from "next/navigation";
// import { BiCategory } from "react-icons/bi";
import { BsDiagram3 } from "react-icons/bs";
import { TbBrandShopee } from "react-icons/tb";
import { LuShoppingBag } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";

import React from "react";

const AdminTabs = () => {
    const pathname = usePathname();

    const tabs = [
        {
            name: "Dashboard",
            href: "/admin",
            logo: <HomeIcon />,
        },
        {
            name: "Categories",
            href: "/admin/categories",
            logo: <BsDiagram3 />,
        },
        // {
        //     name: "Sub Categories",
        //     href: "/admin/sub-categories",
        //     logo: <BsDiagram3 />,
        // },
        {
            name: "Brands",
            href: "/admin/brands",
            logo: <TbBrandShopee />,
        },
        {
            name: "Products",
            href: "/admin/products",
            logo: <LuShoppingBag />,
        },
        {
            name: "Orders",
            href: "/admin/orders",
            logo: <BiFoodMenu />,
        },
        {
            name: "Users",
            href: "/admin/users",
            logo: <Users />,
        },
        // {
        //     name: "Profile",
        //     href: "/admin/profile",
        //     logo: <User />,
        // },
    ];

    const linkColor = (href: string) => {
        const path = href.split("/");
        if (path.length <= 2) return pathname === href;
        if (path.length > 2) return pathname.startsWith(href);
    };

    return (
        <div
            className={`flex justify-start lg:justify-center px-4 w-full items-center gap-8 xl:gap-18 h-16 border-b shadow overflow-x-scroll scrollbar-hide`}
        >
            {tabs.map((tab, index) => {
                return (
                    <Link
                        href={tab.href}
                        key={index}
                        className={`flex items-center justify-center gap-4 text-gray-600 font-semibold ${linkColor(tab.href)
                            ? `${buttonVariants({ variant: "default", size: "lg" })}`
                            : `${buttonVariants({ variant: "outline" })}`
                            }`}
                    >
                        <div className="">{tab.logo}</div>
                        <div>{tab.name}</div>
                    </Link>
                );
            })}
        </div>
        // <div className=" w-3/20   bg-white border-r">
        //     <div className="flex flex-col gap-5 my-10">
        //         {tabs.map((tab, index) => {
        //             return (
        //                 <Link
        //                     href={tab.href}
        //                     key={index}
        //                     className={`flex items-center justify-center gap-4 text-gray-600 mx-5 font-semibold ${linkColor(tab.href)
        //                         ? `${buttonVariants({ variant: "default", size: "lg" })}`
        //                         : `${buttonVariants({ variant: "outline" })}`
        //                         }`}
        //                 >
        //                     <div className="">{tab.logo}</div>
        //                     <div>{tab.name}</div>
        //                 </Link>
        //             );
        //         })}
        //     </div>
        // </div>
    );
};

export default AdminTabs;
