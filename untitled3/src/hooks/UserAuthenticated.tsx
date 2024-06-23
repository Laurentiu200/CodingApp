import {hasCookie} from 'cookies-next';

type UserAuthenticatedProps = {

}

export default async function UserAuthenticated() {


    return hasCookie("Authentication")

}