import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import {useRouter} from "next/navigation";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = cookies().get('Authorization')
    if(!cookie)
    {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
    console.log("middle")
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}