'use client'

import LoadingComponent from "@/components/LoadingComponent"
import { Button } from "@/components/ui/button"
import { domain } from "@/constant/postman"
import axios from "axios"
import { CreditCard } from "lucide-react"
// import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
    token: string
}

const CardPayment = ({ token }: Props) => {

    const [state, setState] = useState({
        pending: false,
        message: "",
        status: 0,
    });

    // const router = useRouter();

    const handleCardPayment = async () => {
        setState((prev) => ({ ...prev, pending: true }));
        try {
            const res = await axios.post(
                `${domain}/order/card`,
                {},
                {
                    params: {
                        success_url: "http://localhost:3000/orders",
                        cancel_url: "http://localhost:3000/cart",
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(res);
            window.location.href = res.data.data.url;
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

    return (
        <Button
            onClick={handleCardPayment}

        >
            {state.pending ? (
                <LoadingComponent />
            ) : (
                <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pay with Card
                </div>
            )}
        </Button>
    )
}

export default CardPayment