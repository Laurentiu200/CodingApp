import { getCookie } from 'cookies-next';

export default async function GetCookie() {
    return getCookie("Authentication")
};