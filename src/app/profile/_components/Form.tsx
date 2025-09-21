/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { domain } from "@/constant/postman";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const Form = ({ profile, token }: { profile: any; token: string }) => {

    const [name, setName] = useState(profile ? profile.name : '')
    const [age, setAge] = useState(profile ? profile.age : '')
    const [email, setEmail] = useState(profile ? profile.email : '')
    const [phone, setPhone] = useState(profile ? profile.phone : '')
    const [address, setaddress] = useState(profile ? profile.address : '')

    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    async function updateProfile(e: React.FormEvent) {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            const res = await axios.patch(
                `${domain}/crud`,
                {
                    name,
                    email,
                    age: Number(age),
                    phone,
                    address,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setUpdateLoading(false)
            if (res.status !== 200) {
                toast("An unexpected error occurred", { className: '!bg-destructive !text-white', position: "top-center" })
            }
            if (res.status === 200) {
                toast("User updated successfull", { className: '!bg-green-600 !text-white', position: "top-center" })
            }
            console.log(res)
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    async function DeleteMyAccount() {
        setDeleteLoading(true)
        try {
            const res = await axios.delete(
                `${domain}/crud/delete`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(res)
            setDeleteLoading(false)
            return res.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="w-full" onSubmit={updateProfile}>
            <div className="my-10 ">
                <div className="text-2xl font-semibold text-gray-950">
                    Personal Information
                </div>
                <div className="grid sm:grid-cols-2 gap-5 my-10">
                    <div>
                        <Label htmlFor="name" className="mb-2 !font-semibold">
                            Name
                        </Label>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="age" className="mb-2 font-semibold">
                            Age
                        </Label>
                        <Input
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            id="age"
                            type="number"
                            placeholder="Enter Your Age"
                        />
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div className="text-2xl font-semibold text-gray-950">
                    Cantact Information
                </div>
                <div className="grid sm:grid-cols-2 gap-5 my-10 ">
                    <div>
                        <Label htmlFor="email" className="mb-2 font-semibold">
                            Email
                        </Label>
                        <Input
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="teemailxt"
                            readOnly
                            placeholder="Enter Your Email"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="mb-2 font-semibold">
                            Phone
                        </Label>
                        <Input
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="text"
                            placeholder="Enter Your Phone"
                        />
                    </div>
                    <div>
                        <Label htmlFor="address" className="mb-2 font-semibold">
                            Address
                        </Label>
                        <Input
                            name="address"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            id="address"
                            type="text"
                            placeholder="Enter Your Address"
                        />
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <Button type="submit" className="lg:w-1/2" variant={"primary_two"} disabled={updateLoading}>
                        {updateLoading ? <LoadingComponent /> : 'Save'}
                    </Button>
                    <Button type="button" className="lg:w-1/2" variant={"destructive"} onClick={DeleteMyAccount} disabled={deleteLoading}>
                        {deleteLoading ? <LoadingComponent /> : 'Delete My Account'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Form;
