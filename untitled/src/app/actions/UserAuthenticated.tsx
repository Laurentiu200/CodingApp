"use server"
import {cookies} from "next/headers";


type UserAuthenticatedProps = {}

export default async function UserAuthenticated() {

    const cookie = cookies().get('Authorization')
    console.log(cookie)
    if(cookie)
    {
        console.log("ceva")
        return true;
    }
    return false;

}