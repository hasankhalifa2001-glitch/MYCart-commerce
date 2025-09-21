/* eslint-disable @typescript-eslint/no-explicit-any */
"use clinet"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Form = ({ profile }: { profile: any }) => {

    // const [state, action, pending] = useActionState()

    return (
        <form className=''>
            <div className='my-10'>
                <div className='text-2xl font-semibold text-gray-950'>Personal Information</div>
                <div className='grid grid-cols-3 gap-5 p-6 my-5 border rounded-lg'>
                    <div>
                        <Label htmlFor='name' className='mb-2'>Name</Label>
                        <Input name='name' id='name' type='text' placeholder='Enter Your Name' />
                    </div>
                    <div>
                        <Label htmlFor='age' className='mb-2'>Age</Label>
                        <Input name='age' id='age' type='text' placeholder='Enter Your Age' />
                    </div>
                </div>
            </div>
            <div className='my-10'>
                <div className='text-2xl font-semibold text-gray-950'>Cantact Information</div>
                <div className='grid grid-cols-3 gap-5 p-6 my-5 border rounded-lg'>
                    <div>
                        <Label htmlFor='email' className='mb-2'>Email</Label>
                        <Input name='email' id='email' type='teemailxt' value={profile.email} readOnly placeholder='Enter Your Email' />
                    </div>
                    <div>
                        <Label htmlFor='phone' className='mb-2'>Phone</Label>
                        <Input name='phone' id='phone' type='text' placeholder='Enter Your Phone' />
                    </div>
                    <div>
                        <Label htmlFor='address' className='mb-2'>Address</Label>
                        <Input name='address' id='address' type='text' placeholder='Enter Your Address' />
                    </div>
                </div>
            </div>
            <Button type='submit'>Save</Button>
        </form>
    )
}

export default Form