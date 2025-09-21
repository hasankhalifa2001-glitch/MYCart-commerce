'use client'
import LoadingComponent from '@/components/LoadingComponent'
import { Button } from '@/components/ui/button'
import { domain } from '@/constant/postman'
import axios from 'axios'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    token: string
}

const CashPayment = ({ token }: Props) => {

    const [state, setState] = useState({
        pending: false,
        message: "",
        status: 0,
    });

    const router = useRouter();

    const handleCashPayment = async () => {
        setState((prev) => ({ ...prev, pending: true }));
        try {
            const res = await axios.post(
                `${domain}/order/cash`,
                {},
                {
                    params: {
                        success_url: "/",
                        cancel_url: "/",
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res);
            setState((prev) => ({
                ...prev,
                message: res.data.message,
                status: res.status,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setState((prev) => ({ ...prev, pending: false }));
        }
    };

    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            router.refresh();
            toast(state.message, {
                className:
                    state.status === 201 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
        }
    }, [state.pending, state.message, state.status, router]);

    return (
        <Button variant="outline" onClick={handleCashPayment}>
            {state.pending ? (
                <LoadingComponent />
            ) : (
                <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Pay with Cash
                </div>
            )}
        </Button>
    )
}

export default CashPayment