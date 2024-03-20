import { atom } from "recoil";

type YoutubeModalState = {
    isOpen: boolean;
    videoId: string;
};

const initialYoutubeModalState: YoutubeModalState = {
    isOpen: false,
    videoId: ""
};

export const youtubeModalState = atom<YoutubeModalState>({
    key: 'youtubeModalState',
    default: initialYoutubeModalState
});
