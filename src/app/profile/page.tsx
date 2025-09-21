import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { getProfile } from "../admin/profile/_action/Profile";
import Form from "./_components/Form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfileImage from "./_components/ProfileImage";

const page = async () => {
    const token = (await cookies()).get("jwtToken")?.value;
    if (!token) {
        redirect("/");
    }

    const profile = await getProfile();
    console.log(profile);

    return (
        <div className="height-auth">
            {/* <MaxWidthWrapper className="flex items-start gap-20"> */}
            <MaxWidthWrapper className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-20">
                <div>
                    <ProfileImage profile={profile} token={token} />
                </div>
                <div className="w-full">
                    <Form profile={profile} token={token} />
                </div>
            </MaxWidthWrapper>
        </div>
    );
};

export default page;
