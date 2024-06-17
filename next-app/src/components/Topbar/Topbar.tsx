import { auth } from "@/src/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LogoutButton from "../Buttons/LogoutButton";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { AuthModalType } from "@/src/enum/AuthModalType";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/src/utils/problems";
import { Problem } from "@/src/utils/types/problem";

type TopbarProps = {

    problemPage?: boolean;
};

enum NavDirection {
    Backward,
    Forward
}

const Topbar:React.FC<TopbarProps> = ({
    problemPage
}: TopbarProps) => {

    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleSignIn = () => {
        setAuthModalState((prev) => ({...prev, isOpen: true, type: AuthModalType.Login}));
    }

    const handleProblemChange = (direction: NavDirection) => {
        const { order } = problems[router.query.pid as string] as Problem;
        const idxChange = direction === NavDirection.Backward ? -1 : 1;
        const nextProblemOrder = order + idxChange;
        const nextProblemKey = Object.keys(problems).find(key => problems[key].order === nextProblemOrder);

        if (direction === NavDirection.Forward && !nextProblemKey) {
            const firstProblemKey = Object.keys(problems).find(key => problems[key].order === 1);
            router.push(`/problems/${firstProblemKey}`);
        } else if (direction === NavDirection.Backward && !nextProblemKey) {
            const lastProblemKey = Object.keys(problems).find(key => problems[key].order === Object.keys(problems).length);
            router.push(`/problems/${lastProblemKey}`);
        } else {
            router.push(`/problems/${nextProblemKey}`);
        }
    }

    return (
        <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
            <div className={`flex w-full items-center justify-between${!problemPage ? " max-w-[1200px] mx-auto" : ""}`}>
                <Link href="/" className="h-[22px] flex-1">
                    <Image
                        src="/logo-full.png"
                        alt="Logo"
                        width={100}
                        height={25}
                        className="w-[100px] h-[25px]"
                    />
                </Link>
                {problemPage && (
                    <div className="flex items-center gap-4 flex-1 justify-center">
                        <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                            onClick={() => handleProblemChange(NavDirection.Backward)}
                        >
                            <FaChevronLeft />
                        </div>
                        <Link href="/" className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer">
                            <div>
                                <BsList />
                            </div>
                            <p>Problem List</p>
                        </Link>
                        <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
                            onClick={() => handleProblemChange(NavDirection.Forward)}
                        >
                            <FaChevronRight />
                        </div>
                    </div>
                )}
                <div className="flex items-center space-x-4 flex-1 justify-end">
                    {user && problemPage && <Timer />}
                    {!user
                        ?   <Link href="/auth" onClick={handleSignIn}>
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