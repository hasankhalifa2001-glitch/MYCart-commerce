/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from "@/components/link/Link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import signup from "../_action/signup";
import { validationError } from "@/validation/auth";
import LoadingComponent from "@/components/LoadingComponent";

type FormInputs = {
    name: string;
    email: string;
    password: string;
    age: string;
    phone: string;
    address: string;
};

const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,
    formData?: FormData | null,

} = {
    message: '',
    error: {},
    status: null,
    formData: null,
}

const Form = () => {
    const router = useRouter()

    const data = useRef<FormInputs>({
        name: "",
        email: "",
        password: "",
        age: '',
        phone: '',
        address: '',
    });

    // const onSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     try {
    //         const res = await axios.post(`${domain}/auth/sign-up`, {
    //             name: data.current.name,
    //             email: data.current.email,
    //             password: data.current.password,
    //             age: Number(data.current.age),
    //             phone: data.current.phone,
    //             address: data.current.address
    //         })
    //             ;
    //         // console.log(res)
    //         if (res.status !== 201) {
    //             toast('llll', { className: '!text-destructive' })
    //         }
    //         // if (res.ok) {
    //         //     toast(res.statusText, { className: '!text-green-400' })
    //         //     router.replace(`/auth/signin`)
    //         // }

    //     } catch (error: any) {
    //         console.log(error)
    //         toast(error.response.data.message, { className: '!text-red-600 ', position: "top-center" })
    //     }
    // }

    const [state, action, pending] = useActionState(signup, initialState)


    useEffect(() => {
        if (state.message && !pending) {
            toast(state.message, {
                className: state.status === 201 ? "!text-green-400" : "!text-destructive",
                position: "top-center"
            });
        }
        if (state.status === 201) router.replace(`/auth/signin`)
    }, [pending, router, state.message, state.status]);

    return (
        <form action={action} className="grid grid-cols-1 sm:grid-cols-2 mx-5 gap-5">
            <div className="flex flex-col space-y-3">
                <div className="w-full my-4">
                    <Label htmlFor="name" className="mb-1">
                        Name
                    </Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        autoFocus={true}
                        placeholder="Enter your Name"
                        onChange={(e) => (data.current.name = e.target.value)}
                        defaultValue={state?.formData?.get('name') as string || ''}
                    />
                    {state?.error && state?.error['name'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['name'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['name']}
                        </p>
                    )}
                </div>
                <div className="w-full my-4">
                    <Label htmlFor="email" className="mb-1">
                        Email
                    </Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email"
                        onChange={(e) => (data.current.email = e.target.value)}
                        defaultValue={state ? state?.formData?.get('email') as string : ''}
                    />
                    {state?.error && state?.error['email'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['email'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['email']}
                        </p>
                    )}
                </div>
                <div className="w-full my-4">
                    <Label htmlFor="password" className="mb-1">
                        Password
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        onChange={(e) => (data.current.password = e.target.value)}
                        defaultValue={state ? state?.formData?.get('password') as string : ''}
                    />
                    {state?.error && state?.error['password'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['password'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['password']}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="w-full my-4">
                    <Label htmlFor="age" className="mb-1">
                        Age
                    </Label>
                    <Input
                        type="text"
                        name="age"
                        id="age"
                        placeholder="Enter your Age"
                        onChange={(e) => (data.current.age = e.target.value)}
                        defaultValue={state ? state?.formData?.get('age') as string : ''}
                    />
                    {state?.error && state?.error['age'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['age'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['age']}
                        </p>
                    )}
                </div>
                <div className="w-full my-4">
                    <Label htmlFor="phone" className="mb-1">
                        Phone
                    </Label>
                    <Input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your Phone"
                        onChange={(e) => (data.current.phone = e.target.value)}
                        defaultValue={state ? state?.formData?.get('phone') as string : ''}
                    />
                    {state?.error && state?.error['phone'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['phone'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['phone']}
                        </p>
                    )}
                </div>
                <div className="w-full my-4">
                    <Label htmlFor="address" className="mb-1">
                        Address
                    </Label>
                    <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your Address"
                        onChange={(e) => (data.current.address = e.target.value)}
                        defaultValue={state ? state?.formData?.get('address') as string : ''}
                    />
                    {state?.error && state?.error['address'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state?.error['address'] ? "text-destructive" : ""
                                }`}
                        >
                            {state?.error['address']}
                        </p>
                    )}
                </div>
            </div>
            <Button type="submit" variant={"primary_two"} disabled={pending} className="w-full rounded-br-none">
                {pending ? <LoadingComponent /> : 'Register'}
            </Button>
            <div className='flex items-center justify-center text-gray-500 text-sm gap-3'>
                <span>Already have an account? </span>
                <Link
                    href={`/auth/signin`}
                    className={`${buttonVariants({ variant: "ghost", size: 'sm' })} !text-black`}
                >
                    Login
                </Link>
            </div>
        </form>
    );
};

export default Form;
