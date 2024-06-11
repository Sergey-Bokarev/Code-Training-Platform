import { settingsModalState } from "@/atoms/settingsModalAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function useCloseSettingsModal() {
    const setSettingsState = useSetRecoilState(settingsModalState);

    const closeModal = () => {
        setSettingsState((prev) => ({...prev, settingsModalIsOpen: false, dropdownIsOpen: false}));
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return closeModal;
}

export {
    useCloseSettingsModal
}
