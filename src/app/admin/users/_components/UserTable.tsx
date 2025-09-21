/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import Link from "@/components/link/Link";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { domain } from "@/constant/postman";
import { ChevronLeftIcon, ChevronRightIcon, UserSearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Fade } from "react-awesome-reveal";

interface Props {
    token: string;
    usersLength: number
}

const UserTable = ({ token, usersLength }: Props) => {
    const head = ["id", "Name", "Email", "Phone", "Age", "Address", "Actions"];

    const limit = 6
    const role = 'user'
    const [name, setName] = useState("");
    const [row, setRow] = useState(Math.ceil(usersLength / limit));
    const [skip, setSkip] = useState(0);

    const [users, setUsers] = useState([]);

    console.log(usersLength)

    let arr = []
    for (let i = 1; i <= row; i++) {
        arr.push(i)
    }

    useEffect(() => {
        const getUsersByAdmin = async () => {
            try {

                if (!name) {
                    setRow(Math.ceil(usersLength / limit))
                    const res = await axios.get(`${domain}/crud/all/users`, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                        params: {
                            role,
                            limit,
                            skip,
                        },
                    });
                    setUsers(res.data.data);
                }

                else {
                    setSkip(0)
                    const response = await axios.get(`${domain}/crud/all/users`, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                        params: {
                            name,
                        },
                    });
                    setRow(Math.ceil(response.data.data.length / limit))
                    const res = await axios.get(`${domain}/crud/all/users`, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                        params: {
                            limit,
                            skip,
                            name,
                        },
                    });
                    setUsers(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUsersByAdmin();
    }, [name, skip, token, usersLength]);

    console.log(name)

    return (
        <Fade direction="up" cascade damping={0.15} triggerOnce>
            <div className="w-1/2 mx-auto my-5 flex items-center gap-5 relative">
                <Input
                    type="text"
                    name="search"
                    placeholder={`Search`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-700">
                    <UserSearchIcon />
                </div>
            </div>
            {users.length > 0 ? (
                <div className="w-full table shadow  rounded-lg border mb-20">
                    <div className="table-header-group">
                        <div className="table-row font-bold">
                            {head.map((item, index) => (
                                <div className="table-cell bg-gray-100" key={index}>
                                    <div
                                        className={`m-4 ml-0  ${index === 0 ? `` : `border-l border-l-slate-300`
                                            } pl-4`}
                                    >
                                        {item}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="table-row-group text-[15px]">
                        {users.map((user: any) => {
                            return (
                                <div className={`table-row  overflow-hidden `} key={user.id}>
                                    <div className="table-cell p-4 rounded-bl-lg border-t font-semibold">
                                        {user.id}
                                    </div>
                                    <div className="table-cell p-4 rounded-bl-lg border-t font-semibold">
                                        {user.name}
                                    </div>
                                    <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                        {user.email}
                                    </div>
                                    <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                        {user.phone}
                                    </div>
                                    <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                        {user.age}
                                    </div>
                                    <div className="table-cell text-slate-700 p-4 border-t font-semibold">
                                        {user.address}
                                    </div>
                                    <div className="table-cell p-4 rounded-br-lg border-t font-semibold">
                                        <div className="flex items-center gap-5">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className={`${buttonVariants({ variant: "outline" })}`}
                                            >
                                                Details
                                            </Link>
                                            <DeleteButton userId={user.id} token={token} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center text-2xl font-semibold">
                    No Users
                </div>
            )}
            <div className='flex justify-center items-center gap-1'>
                <Button variant={'ghost'}><ChevronLeftIcon />Previous</Button>
                {arr.map((item, index) => {
                    return (
                        <div key={index}>
                            <Button onClick={() => setSkip((item - 1) * limit)} size={'icon'} variant={skip / limit + 1 === item ? 'outline' : 'ghost'}>{item}</Button>
                        </div>
                    )
                })}
                <Button variant={'ghost'}>Next<ChevronRightIcon /></Button>
            </div>
        </Fade>
    );
};

export default UserTable;
