"use client";
import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import signin, { adminSignin } from "../_action/signin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type FormInputs = {
    email: string;
    password: string;
};

interface RoleProps {
    role: string;
}

const initialState: {
    message?: string;
    // error?: validationError,
    status?: number | null;
    direct?: string
    // formData?: FormData | null,
} = {
    message: "",
    // error: {},
    status: null,
    direct: ""
    // formData: null,
};

const Form = ({ role }: RoleProps) => {

    const router = useRouter()

    const [state, action, pending] = useActionState(role === 'admin' ? adminSignin : signin, initialState)

    console.log(state?.message)
    useEffect(() => {
        if (state?.message && !pending) {
            toast(state.message, {
                className: state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center"
            });
            if (state.direct === 'admin') {
                router.replace('/admin')
            }
            if (state.direct === 'profile') {
                router.replace('/profile')
            }
        }
    }, [pending, router, state.direct, state.message, state.status]);

    return (
        <form action={action} className="flex flex-col items-center mt-10">
            <div className="w-7/8 mb-4">
                <Label htmlFor="email" className="mb-1">
                    Email
                </Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    autoFocus={true}
                    placeholder="Enter your email"
                />
            </div>
            <div className="w-7/8 mb-4">
                <Label htmlFor="password" className="mb-1">
                    Password
                </Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                />
            </div>
            <Button
                type="submit"
                variant={"primary_two"}
                disabled={pending}
                className="w-7/8 rounded-br-none"
            >
                {pending ? <LoadingComponent /> : "Login"}
            </Button>
        </form>
    );
};

export default Form;
