import React from "react";
import { IoClose } from "react-icons/io5";
import Signup from "./Signup";
import Login from "./Login";
import ResetPassword from "./ResetPasswors";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { useCloseModal } from "./AuthModal.hooks";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {

    const authModal = useRecoilValue(authModalState);
    const closeModal = useCloseModal();

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60" onClick={closeModal}></div>
            <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
                <div className="relative w-full h-full mx-auto flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                                onClick={closeModal}
                            >
                                <IoClose className="h-5 w-5" />
                            </button>
                        </div>
                        {authModal.type === 'register' && <Signup />}
                        {authModal.type === 'login' && <Login />}
                        {authModal.type === 'forgotPassword' && <ResetPassword />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthModal;
