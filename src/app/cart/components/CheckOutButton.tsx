"use client";
import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import CashPayment from "./CashPayment";
import CardPayment from "./CardPayment";

interface Props {
    token: string;
    pay: boolean
}

const CheckOutButton = ({ token, pay }: Props) => {


    return (
        <Dialog>
            <DialogTrigger className={`${buttonVariants({ size: "lg" })} !w-full `} disabled={!pay} >
                Check out
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-md sm:max-w-[425px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-left">Select Payment Method</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <CashPayment token={token} />

                    <CardPayment token={token} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CheckOutButton;
