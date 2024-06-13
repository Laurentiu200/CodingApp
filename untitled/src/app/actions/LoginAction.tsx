"use server"
import {cookies} from "next/headers";

export default async function LoginAction(json_response: string) {

    cookies().set('Authorization', json_response,
        {
            expires: Date.now() + 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: "strict"
        })
};