
import { domain } from "@/constant/postman"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export const getUsersByAdmin = async () => {

    const token = (await cookies()).get('jwtToken')?.value

    try {
        const res = await axios.get(`${domain}/crud/all/users`, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                role: 'user',
                // name: 
            },
        })
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}


export const getUserByAdmin = async (userId: number) => {

    const token = (await cookies()).get('jwtToken')?.value

    try {
        const res = await axios.get(`${domain}/crud/${userId}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserByAdmin = async (userId: number, token: string) => {

    // const token = (await cookies()).get('jwtToken')?.value

    try {
        await axios.delete(`${domain}/crud/${userId}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        revalidatePath('/admin/users')
    } catch (error) {
        console.log(error)
    }
}