"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { allergensDetection } from "../_action/Allergens";
import LoadingComponent from "@/components/LoadingComponent";
import { toast } from "sonner";
import { CircleCheckBig, CircleX } from "lucide-react";

export type AllergensResponse = {
    contains_allergens: boolean;
    detected_allergens: string[];
    message: string;
};

export type ValidationError = {
    Food_Product?: string[];
    Main_Ingredient?: string[];
    Sweetener?: string[];
    Fat_Oil?: string[];
    Seasoning?: string[];
};

export type State = {
    status?: number;
    data: AllergensResponse;
    error?: ValidationError;
    message?: string;
    formData?: FormData;
};

// const result = {
//     contains_allergens: true,
//     detected_allergens: ["Dairy", "Wheat"],
//     message: "Allergens detected: Dairy, Wheat",
// };

const AiForm = () => {
    const initialState: State = {
        data: {
            contains_allergens: false,
            detected_allergens: [],
            message: "",
        },
        error: {},
        message: "",
        status: undefined,
        formData: undefined,
    };

    const [state, action, pending] = useActionState<State, FormData>(
        allergensDetection,
        initialState
    );

    console.log(state.data);

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            toast(state.message, {
                className:
                    state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
        }
    }, [pending, state?.message, state?.status]);

    return (
        <div>
            <div className="font-semibold text-lg">
                Enter food ingredients to check for allergens
            </div>
            <form action={action} className="p-2 flex flex-col space-y-5">
                <div className="grid grid-cols-2 gap-5 my-4">
                    <div>
                        <Label htmlFor="Food_Product" className="mb-1">
                            Food Product
                        </Label>
                        <Input
                            type="text"
                            name="Food_Product"
                            id="Food_Product"
                            placeholder="Entar food product"
                            defaultValue={
                                (state?.formData?.get("Food_Product") as string) || ""
                            }
                        />
                        {state?.error && state.error["Food_Product"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Food_Product"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Food_Product"]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="Main_Ingredient" className="mb-1">
                            Main Ingredient
                        </Label>
                        <Input
                            type="text"
                            name="Main_Ingredient"
                            id="Main_Ingredient"
                            placeholder="Entar main ingredient"
                            defaultValue={
                                (state?.formData?.get("Main_Ingredient") as string) || ""
                            }
                        />
                        {state?.error && state.error["Main_Ingredient"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Main_Ingredient"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Main_Ingredient"]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="Sweetener" className="mb-1">
                            Sweetener
                        </Label>
                        <Input
                            type="text"
                            name="Sweetener"
                            id="Sweetener"
                            placeholder="Entar sweetener"
                            defaultValue={(state?.formData?.get("Sweetener") as string) || ""}
                        />
                        {state?.error && state.error["Sweetener"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Sweetener"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Sweetener"]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="Fat_Oil" className="mb-1">
                            Fat/Oil Ingredients
                        </Label>
                        <Input
                            type="text"
                            name="Fat_Oil"
                            id="Fat_Oil"
                            placeholder="Entar fat/oil (comma-separated)"
                            defaultValue={(state?.formData?.get("Fat_Oil") as string) || ""}
                        />
                        {state?.error && state.error["Fat_Oil"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Fat_Oil"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Fat_Oil"]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="Seasoning" className="mb-1">
                            Seasoning
                        </Label>
                        <Input
                            type="text"
                            name="Seasoning"
                            id="Seasoning"
                            placeholder="Entar seasoning"
                            defaultValue={(state?.formData?.get("Seasoning") as string) || ""}
                        />
                        {state?.error && state.error["Seasoning"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Seasoning"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Seasoning"]}
                            </p>
                        )}
                    </div>
                    <Button
                        variant={"primary_two"}
                        type="submit"
                        disabled={pending}
                        className="my-[17px]"
                    >
                        {pending ? <LoadingComponent /> : "Submit"}
                    </Button>
                </div>
            </form>
            {/* {state.data.message === '' ? "" : <div
                className={`${state.data.contains_allergens === true
                    ? `text-destructive border-destructive`
                    : `text-primary border-primary`
                    } 
            text-xl border bg-white w-1/2 py-10 px-6 rounded mx-auto my-10 flex justify-between items-center`}
            >
                <div>{state.data.message}</div>
                <div>
                    {state.data.contains_allergens === true ? (
                        <CircleX />
                    ) : (
                        <CircleCheckBig />
                    )}
                </div>
            </div>} */}
            {/* {!state.data.contains_allergens ? "" : <div
                className={`${state.data.message.length > 0
                    ? `text-destructive border-destructive`
                    : `text-primary border-primary`
                    } 
            text-xl border bg-white w-1/2 py-10 px-6 rounded mx-auto my-10 flex justify-between items-center`}
            >
                <div>{state.data.message.length > 0 ? state.data.message : "There isn't Detected Allergens Food"}</div>
                <div>
                    {state.data.message.length > 0 ? (
                        <CircleX />
                    ) : (
                        <CircleCheckBig />
                    )}
                </div>
            </div>} */}
            {!state.data.contains_allergens ? null : (
                <div
                    className={`
                        ${state.data.message.length > 0
                            ? "text-red-700 border-red-400 bg-red-50"
                            : "text-green-700 border-green-400 bg-green-50"
                        }
                        max-w-xl w-full mx-auto my-10 px-6 py-5 rounded-lg border shadow-md flex items-center justify-between
                        text-lg font-medium
                        `}
                >
                    <div className="flex-1">
                        {state.data.message.length > 0
                            ? state.data.message
                            : "No Allergens Detected"}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        {state.data.message.length > 0 ? (
                            <CircleX className="w-7 h-7 text-red-600" />
                        ) : (
                            <CircleCheckBig className="w-7 h-7 text-green-600" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiForm;
