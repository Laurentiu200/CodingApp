
"use client";

import {RecoilRoot, atom} from "recoil"
import login from "@/app/components/Modal/Login";

type AuthModalState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassword'
};

const initialAuthModalState: AuthModalState = {
    isOpen: false,
    type:'login',
};

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: initialAuthModalState,
});
export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>
}

