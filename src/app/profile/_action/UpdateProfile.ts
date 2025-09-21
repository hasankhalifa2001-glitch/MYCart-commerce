// import { domain } from "@/constant/postman"
// import axios from "axios"
// import { cookies } from "next/headers"

// export const UpdateFormProfile = async () => {
//     const token = (await cookies()).get('jwtToken')?.value

//     try {

// const res = await axios.patch(`${domain}/crud`, {
//     headers: {
//         Authorization: "Bearer " + token,
//     }
// })
// return res.data.data
//     } catch (error) {
//         console.log(error)
//     }
// }