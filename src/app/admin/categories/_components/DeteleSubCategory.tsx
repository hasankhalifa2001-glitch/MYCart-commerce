"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { deleteSubCategory } from "../_action/SubCategory";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingComponent from "@/components/LoadingComponent";

interface Props {
    id: number;
    token: string;
    categoryId: number
}

const DeteleSubCategory = ({ id, token, categoryId }: Props) => {
    const router = useRouter();

    const [state, setState] = useState({
        pending: false,
        message: "",
        status: 0,
    });

    async function deleteSub() {
        setState((prev) => ({ ...prev, pending: true }));

        try {
            await deleteSubCategory(id, token, categoryId);
            setState((prev) => ({
                ...prev,
                message: "Brand deleted successfull",
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
            variant={"destructive"}
            size={"icon"}
            className="cursor-pointer"
            disabled={state.pending}
            onClick={deleteSub}
        >
            {state.pending ? <LoadingComponent /> : <Trash2 />}
        </Button>
    );
};

export default DeteleSubCategory;
