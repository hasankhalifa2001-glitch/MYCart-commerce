'use server'

import { domain } from "@/constant/postman"
import axios from "axios"
import { cookies } from "next/headers"
// import { redirect } from "next/navigation"

// interface Props {
//     email: string,
//     password: string
// }

export default async function signin(prevState: unknown, formData: FormData) {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    try {
        const res = await axios.post(`${domain}/auth/login`, { email, password })
        if (!res) {
            return {
                message: 'unodmlm',
                status: 401
            }
        }
        const token = res.data.access_token
        if (token) {
            (await cookies()).set({
                name: 'jwtToken',
                value: token,
                secure: true,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
            })
        }
        return {
            message: "User SignIn Successful",
            status: 200,
            direct: "profile"
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'Unauthoriztion',
            status: 500
        }
    }
}
export async function adminSignin(prevState: unknown, formData: FormData) {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    try {
        const res = await axios.post(`${domain}/auth/login/admin`, { email, password })
        if (!res) {
            return {
                message: 'unodmlm',
                status: 401
            }
        }
        const token = res.data.token.access_token
        if (token) {
            (await cookies()).set({
                name: 'jwtToken',
                value: token,
                secure: true,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
            })
        }
        // redirect('/admin')
        return {
            message: "Admin SignIn Successful",
            status: 200,
            direct: "admin"
        }
    } catch (error) {
        console.log(error)
        return {
            message: 'Unauthoriztion',
            status: 500
        }
    }
}

export async function signout() {
    try {
        (await cookies()).delete('jwtToken')
        return {
            message: 'SignOut successfully'
        }
    } catch (error) {
        console.log(error)
    }

}