"use client";
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
import { Edit } from "lucide-react";
import Rate from "./Rate";
import { useActionState, useState } from "react";
import { AddReview, UpdateReview } from "../_action/Review";
import LoadingComponent from "@/components/LoadingComponent";
import { Review } from "../page";


interface ErrorState {
    error: { Review?: string[] };
    formData: FormData;
    message?: undefined;
    status?: undefined;
}

interface SuccessState {
    message: string;
    status: number;
    error?: undefined;
    formData?: undefined;
}

type State = ErrorState | SuccessState;



interface Props {
    token: string;
    id: number;
    status: string;
    review?: Review;
}

const WriteReview = ({ token, id, status, review }: Props) => {
    const initialState: State = {
        error: {},
        formData: new FormData(),
    };

    const [rating, setRating] = useState(review ? review.rating : 0);

    const [state, action, pending] = useActionState(
        status === "Add"
            ? AddReview.bind(null, { token, id, rating })
            : UpdateReview.bind(null, { token, id, rating }),
        initialState
    );

    console.log(state);

    return (
        <Dialog>
            <DialogTrigger>
                {/* <Edit /> {status === 'Add' ? 'Write Review' : ''} */}
                {status === "Add" ? (
                    <div
                        className={`${buttonVariants({
                            size: "default",
                            variant: "outline",
                        })} cursor-pointer`}
                    >
                        <Edit /> Write Review
                    </div>
                ) : (
                    <div
                        className={`${buttonVariants({
                            size: "icon",
                            variant: "default",
                        })} cursor-pointer !size-8`}
                    >
                        <Edit />
                    </div>
                )}
            </DialogTrigger>
            <DialogContent className="w-5/6 rounded-md sm:max-w-[425px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-left">
                        {status === "Add" ? "Write Review" : "Update Review"}
                    </DialogTitle>
                </DialogHeader>
                <form className="flex flex-col space-y-2" action={action}>
                    <div>
                        <Label htmlFor="Review">Review Subject</Label>
                        <Input
                            type="text"
                            name="Review"
                            id="Review"
                            autoFocus={true}
                            placeholder="Enter review subject"
                            className="mt-1 focus-visible:ring-[1px]"
                            defaultValue={review ? review.review_text : ""}
                        />
                        {state?.error && state.error["Review"] && (
                            <p
                                className={`text-accent mt-2 text-sm font-medium ${state.error["Review"] ? "text-destructive" : ""
                                    }`}
                            >
                                {state.error["Review"]}
                            </p>
                        )}
                    </div>
                    <div>
                        <Rate rating={rating} setRating={setRating} />
                    </div>
                    <DialogFooter className="flex-row justify-end">
                        <Button
                            type="submit"
                            className=""
                            size={"default"}
                            variant={"primary_two"}
                            disabled={pending}
                        >
                            {pending ? <LoadingComponent /> : "Submit Review"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default WriteReview;
