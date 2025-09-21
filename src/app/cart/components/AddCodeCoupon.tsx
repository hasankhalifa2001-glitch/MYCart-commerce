/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { applyCoupon } from "@/app/admin/coupon/_action/coupon";
import LoadingComponent from "@/components/LoadingComponent";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
    token: string
}

const AddCodeCoupon = ({ token }: Props) => {

    const [code, setCode] = useState("");
    const [state, setState] = useState({
        pending: false,
        message: '',
        status: 0
    })

    const handleApplyCoupon = async () => {
        setState((prev) => ({ ...prev, pending: true }))
        try {
            const res = await applyCoupon(code, token);
            setState((prev) => ({ ...prev, message: res.message, status: res.statusCode }))
        } catch (error) {
            console.log(error)
        } finally {
            setState((prev) => ({ ...prev, pending: false }))
        }
    }

    useEffect(() => {
        if (state?.message && state.status && !state.pending) {
            toast(state.message, {
                className: state.status === 201 ? '!text-green-400' : '!text-destructive',
                position: 'top-center'
            })
        }
    }, [state.pending, state.message, state.status])



    return (
        <Dialog>
            <DialogTrigger>
                <div className={`${buttonVariants({ variant: "secondary" })}`}>
                    Add Coupon
                </div>
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-md sm:max-w-[425px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Add Code Coupon
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <Label htmlFor="couponName">Code Coupon</Label>
                    <Input
                        id="couponName"
                        type="text"
                        placeholder="Enter coupon code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={state.pending}
                        className="mt-1 focus-visible:ring-[1px]"
                    />
                </div>
                <DialogFooter className="flex-row justify-end">
                    <Button
                        onClick={handleApplyCoupon}
                        disabled={state.pending || code.length === 0}
                        type="submit"
                        size={"default"}
                        variant={"primary_two"}
                    >
                        {state.pending ? <LoadingComponent /> : "Apply"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddCodeCoupon