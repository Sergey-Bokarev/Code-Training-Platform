import { useEffect, useState } from "react";

function useFullscreen() {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    useEffect(() => {
        const exitHandler = (e: any) => {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            } else {
                setIsFullScreen(true);
            }
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }
    }, [isFullScreen]);

    return {isFullScreen, setIsFullScreen}
}

export {
    useFullscreen
}
