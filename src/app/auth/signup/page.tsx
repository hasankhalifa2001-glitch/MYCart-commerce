import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import Form from './_components/Form'

const SignupPage = () => {
    return (
        <div className='height-auth relative'>
            <Image
                src={"/—Pngtree—empty shopping basket on wood_15459455.png"}
                alt="my-cart"
                fill
                className='object-cover hidden md:flex'
            />
            <div className='md:absolute top-0 left-0 w-full md:w-1/2 h-full bg-white'>
                <div className="text-2xl font-semibold my-5 mx-5">Welcome To Create New Account</div>
                <Form />
                <div className="flex w-full md:text-lg justify-center items-center font-semibold my-10">
                    <Separator className="!w-20 !h-[2px] mr-2 bg-neutral-400" />
                    OR CONTINUE WITH EMAIL
                    <Separator className="!w-20 !h-[2px] ml-2 bg-neutral-400" />
                </div>
                <div className="w-full flex justify-center my-3">
                    <Button className="w-1/2 font-semibold cursor-pointer" variant={"secondary"}>
                        <Image
                            src={
                                "/png-clipart-google-logo-google-search-search-engine-optimization-google-s-google-google-logo-google-thumbnail.png"
                            }
                            alt="google"
                            width={30}
                            height={30}
                        />
                        Google
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SignupPage