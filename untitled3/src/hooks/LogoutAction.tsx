import { deleteCookie } from 'cookies-next';

export default async function LogoutAction() {
    deleteCookie("Authentication")
};