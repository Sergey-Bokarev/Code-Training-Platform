import React, { useEffect, useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {

    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    const formatTime = (time: number) => {
        const hours = Math.floor(time/ 3600);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    const handleResetClick = () => {
        setShowTimer(false);
        setTime(0);
    }

    const handleClockClick = () => {
        setShowTimer(true);
    }

    useEffect(() => {
        let intervalId: number;

        if (showTimer) {
            intervalId = window.setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [showTimer]);

    return (
        <div>
            {showTimer ? (
                <div className="flex items-center space-x-2 bg-dark-fill-3 px-3 py-1.5 cursor-pointer rounded hover:bg-dark-fill-2">
                    <div>{formatTime(time)}</div>
                    <FiRefreshCcw onClick={handleResetClick} />
                </div>
            ) : (
                <div className="flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer">
                    <CiAlarmOn fontSize="24" width="24" onClick={handleClockClick} />
                </div>
            )}
        </div>
    )
}

export default Timer;
