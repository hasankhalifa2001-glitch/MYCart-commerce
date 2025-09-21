import jwt from 'jsonwebtoken'

interface JWTPayload {
    id: number
    role: string
    email: string
}

export const getPayload = async (token: string) => {
    const Payload = jwt.decode(token) as JWTPayload
    if (!Payload) return null
    return Payload
}