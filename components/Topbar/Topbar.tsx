import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LogoutButton from "../Buttons/LogoutButton";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { AuthModalType } from "@/enum/AuthModalType";
import Image from "next/image";

type TopbarProps = {};

const Topbar:React.FC<TopbarProps> = () => {

    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen: true, type: AuthModalType.Login}));
    }

    return (
        <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
            <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
                <Link href="/" className="h-[22px] flex-1">
                    <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
                </Link>
                <div className="flex items-center space-x-4 flex-1 justify-end">
                    {!user
                        ?   <Link href="/auth" onClick={handleClick}>
                                <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded" >
                                    Sign In
                                </button>
                            </Link>
                        :   <div className="cursor-pointer group relative">
                                <Image src="/avatar.png" alt="user profile img" height={30} width={30} className="rounded-full" />
                                <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                                    <p className="text-sm">{user.email}</p>
                                </div>
                            </div>
                    }
                    {user && <LogoutButton />}
                </div>
            </div>
        </nav>
    )
}

export default Topbar;