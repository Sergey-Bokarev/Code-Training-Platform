import { AuthModalType } from "@/src/enum/AuthModalType";
import { atom } from "recoil";

type AuthModalState = {
    isOpen: boolean;
    type: AuthModalType;
};

const initialAuthModalState: AuthModalState = {
    isOpen: false,
    type: AuthModalType.Login
};

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: initialAuthModalState
});
