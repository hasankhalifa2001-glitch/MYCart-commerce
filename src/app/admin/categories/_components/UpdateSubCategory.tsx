"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validationError } from "@/validation/auth"
import { Edit } from "lucide-react"
import { useActionState, useEffect } from "react"
import { SubCategoryUpdate } from "../_action/SubCategory"
import LoadingComponent from "@/components/LoadingComponent"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Props {
    sub: {
        id: number,
        name: string
    },
    token: string
}

const initialState: {
    message?: string,
    error?: validationError,
    status?: number | null,

} = {
    message: '',
    error: {},
    status: null,
}

const UpdateSubCategory = ({ sub, token }: Props) => {

    const { id, name } = sub

    const router = useRouter()

    const [state, action, pending] = useActionState(SubCategoryUpdate.bind(null, { token, Id: id }), initialState)

    useEffect(() => {
        if (state?.message && state.status && !pending) {
            router.refresh();
            toast(state.message, {
                className:
                    state.status === 200 ? "!text-green-400" : "!text-destructive",
                position: "top-center",
            });
        }
    }, [pending, router, state?.message, state?.status]);

    return (
        <Dialog>
            <DialogTrigger className={`${buttonVariants({ size: "icon" })} cursor-pointer`}>
                <Edit />
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-md sm:max-w-[425px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-left">Change Sub Category Name</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <Label htmlFor='updateSubCategory'  >
                        Sub Category Name
                    </Label>
                    <Input
                        type='text'
                        name='updateSubCategory'
                        id='updateSubCategory'
                        autoFocus={true}
                        defaultValue={name}
                        placeholder='Enter sub-category name'
                        className='mt-1 focus-visible:ring-[1px]'
                    />
                    {state?.error && state.error['updateSubCategory'] && (
                        <p
                            className={`text-accent mt-2 text-sm font-medium ${state.error['updateSubCategory'] ? "text-destructive" : ""
                                }`}
                        >
                            {state.error['updateSubCategory']}
                        </p>
                    )}
                    <DialogFooter className="flex-row justify-end">
                        <Button type='submit' className='mt-2' disabled={pending} size={"default"} variant={"primary_two"}>
                            {pending ? <LoadingComponent /> : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateSubCategory