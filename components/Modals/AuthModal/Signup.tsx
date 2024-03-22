import { authModalState } from "@/atoms/authModalAtom";
import { AuthModalType } from "@/enum/AuthModalType";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

    const [inputs, setInputs] = useState({
        email: '',
        displayName: '',
        password: ''
    });

    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const handleClick = (type: AuthModalType) => {
        setAuthModalState((prev) => ({...prev, type}));
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        if (!inputs.email || !inputs.password || !inputs.displayName) return toast.info("Please fill all fields");
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error]);

    return <form className="space-y-6 px-6 py-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to LeetClone</h3>
        <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                Email
            </label>
            <input
                onChange={handleChangeInput}
                type="email"
                name="email"
                id="email"
                className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
                placeholder="name@fojin.tech"
            />
        </div>
        <div>
            <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
                Display Name
            </label>
            <input
                onChange={handleChangeInput}
                type="displayName"
                name="displayName"
                id="displayName"
                className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
                placeholder="John Doe"
            />
        </div>
        <div>
            <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                Password
            </label>
            <input
                onChange={handleChangeInput}
                type="password"
                name="password"
                id="password"
                className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                "
                placeholder="********"
            />
        </div>

        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
        ">
            {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-sm font-medium text-gray-300">
            Already have an account?
            <a href="#" className="pl-2 text-blue-700 hover:underline" onClick={() => handleClick(AuthModalType.Login)}>
                Log In
            </a>
        </div>
    </form>
}

export default Signup
