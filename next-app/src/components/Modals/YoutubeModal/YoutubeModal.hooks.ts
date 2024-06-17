import { youtubeModalState } from "@/src/atoms/youtubeModalAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

function useCloseModal() {
    const setYoutubeState = useSetRecoilState(youtubeModalState);

    const closeModal = () => {
        setYoutubeState((prev) => ({...prev, isOpen: false, videoId: ""}));
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
