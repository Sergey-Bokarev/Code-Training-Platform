import { auth } from "@/src/firebase/firebase";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FiLogOut } from "react-icons/fi";

type LogoutButton = {};

const LogoutButton:React.FC<LogoutButton> = () => {

    const [signOut, loading, error] = useSignOut(auth);

    const handleLogout = () => {
        if (loading) return;
        signOut();
    }

    return <button className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange" onClick={handleLogout}>
        <FiLogOut />
    </button>
}

export default LogoutButton;
