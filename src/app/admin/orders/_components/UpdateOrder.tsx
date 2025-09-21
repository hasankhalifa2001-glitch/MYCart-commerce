/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { updateOrderByAdmin } from '../_action/Orders';
import { toast } from 'sonner';
import LoadingComponent from '@/components/LoadingComponent';


interface Props {
    order: any;
    token: string;
}

const UpdateOrder = ({ order, token }: Props) => {

    const [state, setState] = useState({
        pending: false,
        message: "",
        status: 0,
    });

    const router = useRouter();

    async function handleUpdate(id: number) {
        setState((prev) => ({ ...prev, pending: true }));
        try {
            await updateOrderByAdmin(token, id);
            setState((prev) => ({
                ...prev,
                message: "Order updated successfull",
                status: 200,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setState((prev) => ({ ...prev, pending: false }));
        }
    }

    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            router.refresh();
            toast(state.message, {
                className:
                    state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
        }
    }, [state.pending, state.message, state.status, router]);

    return (
        <Button
            onClick={() => handleUpdate(order.id)}
            variant={"primary_two"}
            className="cursor-pointer"
            disabled={state.pending}
        >
            {state.pending ? <LoadingComponent /> : "Update"}
        </Button>
    )
}

export default UpdateOrder