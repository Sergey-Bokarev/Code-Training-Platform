import { authModalState } from "@/atoms/authModalAtom";
import { AuthModalType } from "@/enum/AuthModalType";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function useCloseModal() {
    const setAuthModalState = useSetRecoilState(authModalState);

    const closeModal = () => {
        setAuthModalState((prev) => ({...prev, isOpen: false, type: AuthModalType.Login}));
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleEsc);
        return () =>  window.removeEventListener("keydown", handleEsc);
    }, []);

    return closeModal;
}

export {
    useCloseModal
}
