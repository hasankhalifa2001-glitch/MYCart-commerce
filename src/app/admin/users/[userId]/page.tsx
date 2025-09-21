import React from "react";
import { getUserByAdmin } from "../_action/Users";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserIdProps {
    params: Promise<{ userId: string }>;
}

const EditUserPage = async ({ params }: UserIdProps) => {
    const { userId } = await params;

    const user = await getUserByAdmin(parseInt(userId));

    // console.log(user);

    return (
        <div className="flex gap-20 p-10">
            <div className="flex justify-center w-[300px]">
                {user.image ? (
                    <Image src={user.image ? user.image : ''} alt={`${user.name} Image`} width={200} height={200} />
                ) : (
                    <div className="w-[250px] h-[250px] bg-gray-50 rounded-full border flex justify-center items-center text-gray-700" >
                        No Image
                    </div>
                )}
            </div>
            <div>
                <div className="flex justify-between gap-30 items-center ">
                    <div className="text-2xl text-gray-800 font-bold">{user.name}</div>
                    <div className="text-gray-600 flex justify-center items-center gap-1 text-sm">
                        <MapPin size={20} /> <span className="font-semibold">{user.address}</span>
                    </div>
                </div>
                <div className="font-semibold text-gray-700 my-4">{user.age} year</div>
                {/* <div className="font-semibold text-primary my-4">Client</div> */}
                <Separator className="mb-20" />
                <div className="font-semibold uppercase text-lg text-gray-700" >
                    Contact Information
                </div>
                <Separator className="mt-2 mb-10" />
                <div className="font-semibold grid grid-cols-2">
                    {/* <div className="flex justify-between">Email: <span>hasan@gmail.com</span></div>
                    <div className="flex justify-between">Phone: <span>0997931652</span></div>
                    <div className="flex justify-between">Address: <span>Homs</span></div> */}
                    <div className="flex flex-col space-y-4 font-bold">
                        <div>Email :</div>
                        <div>Phone :</div>
                        <div>Address :</div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                        <div>{user.address}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
