"use server"
import {cookies} from "next/headers";

export default async function GetCookie() {
    return cookies().get('Authorization')
};