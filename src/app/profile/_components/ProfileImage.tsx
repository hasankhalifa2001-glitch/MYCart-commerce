/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LoadingComponent from "@/components/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { domain } from "@/constant/postman";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProfileImage = ({ profile, token }: { profile?: any; token: string }) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedImage, setSelectedImage] = useState(profile ? (profile.image === 'null' ? "" : profile.image) : '');

    console.log(selectedImage)

    const [pending, setPending] = useState(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files && event.target.files[0];
        setSelectedFile(file)
        if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
        }
    };


    async function saveImage() {

        if (!selectedFile) return;

        const formData = new FormData()
        formData.append('photo', selectedFile)

        try {
            setPending(true)
            const res = await fetch(`${domain}/user/photo`, {
                body: formData,
                method: 'PUT',
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            setPending(false)
            console.log(res)
        } catch (error) {
            console.log(error)
            setPending(false)
        }

    }

    return (
        <div className="mt-10 lg:mt-20 lg:ml-10 relative flex justify-between items-center flex-col gap-20">
            <div className="size-[250px] flex justify-center items-center absolute overflow-hidden rounded-full">
                {selectedImage ? (
                    <Image
                        alt="Add User Image"
                        src={selectedImage}
                        width={250}
                        height={250}
                        className="object-cover"
                    />
                ) : ''}
            </div>
            <div className=" relative flex justify-center items-center">
                <Input
                    type="file"
                    name="image"
                    accept="images/*"
                    id="profile-image"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <Label
                    htmlFor="profile-image"
                    className={`size-[250px] border rounded-full flex justify-center items-center duration-300 bg-gray-50/40 
                        ${selectedImage
                            ? "opacity-0 transition-opacity hover:opacity-100"
                            : ""
                        }`}
                >
                    <Camera className="text-gray-600" />
                </Label>
            </div>
            <Button type="button" disabled={pending} variant={"primary_two"} onClick={saveImage}>
                {pending ? <LoadingComponent /> : 'Upload Image'}
            </Button>
        </div>
    );
};

export default ProfileImage;
