import { setCookie } from 'cookies-next';
export default async function LoginAction(json_response: string) {

    setCookie('Authentication', json_response, { maxAge: 60 * 60 * 24 });
};