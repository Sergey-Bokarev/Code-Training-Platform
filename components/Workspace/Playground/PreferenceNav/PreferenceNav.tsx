import React from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { useFullscreen } from "./PreferenceNav.hooks";
import { settingsModalState } from "@/atoms/settingsModalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import SettingsModal from "@/components/Modals/SettingsModal/SettingsModal";

type PreferenceNavProps = {};

const PreferenceNav: React.FC<PreferenceNavProps> = ({}) => {
    const {isFullScreen, setIsFullScreen} = useFullscreen();
    const settingsModal = useRecoilValue(settingsModalState);
    const setSettingsModalState = useSetRecoilState(settingsModalState);

    const handleSettings = () => {
        setSettingsModalState((prev) => ({...prev, settingsModalIsOpen: true}));
    }
    
    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    }

    return (
        <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
            <div className="flex items-center text-white">
                <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
                    <div className="flex items-center px-1">
                        <div className="text-xs text-label-2 dark:text-dark-label-2">JavaScript</div>
                    </div>
                </button>
            </div>
            <div className="flex items-center m-2">
                <button className="preferenceBtn group" onClick={handleSettings}>
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                        <AiOutlineSetting />
                    </div>
                    <div className="preferenceBtn-tooltip">
                        Settings
                    </div>
                </button>
                <button className="preferenceBtn group" onClick={handleFullScreen}>
                    <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                        {isFullScreen ? <AiOutlineFullscreenExit /> : <AiOutlineFullscreen /> }
                    </div>
                    <div className="preferenceBtn-tooltip">
                        {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                    </div>
                </button>
            </div>
            {settingsModal.settingsModalIsOpen && <SettingsModal />}
        </div>
    )
}

export default PreferenceNav;
