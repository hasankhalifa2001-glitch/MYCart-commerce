

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


interface JWTPayload {
    id: number
    role: string
    email: string

}

export async function middleware(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);

    const jwtToken = req.cookies.get('jwtToken')
    // const token = jwtToken?.value as string
    // const userPayload = jwt.decode(token) as JWTPayload
    // if (!userPayload) return null

    // const role = userPayload?.role
    // console.log(req.nextUrl.pathname.startsWith(`/admin`))
    if (jwtToken === undefined) {
        if (req.nextUrl.pathname.startsWith(`/admin`) || req.nextUrl.pathname.startsWith(`/profile`)) {
            return NextResponse.redirect(new URL(`/auth/signin`, req.url))
        }
    }
    if (jwtToken) {
        const token = jwtToken?.value as string
        const userPayload = jwt.decode(token) as JWTPayload
        if (!userPayload) return null
        const role = userPayload?.role
        if (role === 'user' && req.nextUrl.pathname.startsWith(`/admin`)) {
            return NextResponse.redirect(new URL(`/profile`, req.url))
        }
        if (role === 'admin' && req.nextUrl.pathname.startsWith(`/profile`)) {
            return NextResponse.redirect(new URL(`/admin`, req.url))
        }
        if (req.nextUrl.pathname.startsWith('/auth/signin') || req.nextUrl.pathname.startsWith('/signup')) {
            return NextResponse.redirect(new URL(`/profile`, req.url))
        }
    }

}

export const config = {
    // Matcher ignoring `/_next/`, `/api/`, ..etc
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};