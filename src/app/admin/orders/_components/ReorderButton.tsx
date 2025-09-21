"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { reOredr } from '../_action/Orders';
import { toast } from 'sonner';
import LoadingComponent from '@/components/LoadingComponent';
import { useRouter } from 'next/navigation';

interface Props {
    order: any;
    token: string;
}
const ReorderButton = ({ order, token }: Props) => {


    const [state, setState] = useState({
        pending: false,
        message: "",
        status: 0,
    });

    const router = useRouter();

    async function handleReorder(id: number) {
        setState((prev) => ({ ...prev, pending: true }));
        try {
            const res = await reOredr(token, id);
            if (res) {
                setState((prev) => ({
                    ...prev,
                    message: res.message,
                    status: res.status,
                }));
            }
            router.push('/cart')
        } catch (error) {
            console.log(error);
        } finally {
            setState((prev) => ({ ...prev, pending: false }));
        }
    }

    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            // router.refresh();
            toast(state.message, {
                className:
                    state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
        }
    }, [state.pending, state.message, state.status]);

    return (
        <Button disabled={!order.is_paid || state.pending} onClick={() => handleReorder(order.id)}>
            {state.pending ? <LoadingComponent /> : "Reorder"}
        </Button>
    )
}

export default ReorderButton