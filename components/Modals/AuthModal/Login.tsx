import { authModalState } from "@/atoms/authModalAtom";
import { AuthModalType } from "@/enum/AuthModalType";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const handleClick = (type: AuthModalType) => {
        setAuthModalState((prev) => ({...prev, type}));
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        if (!inputs.email || !inputs.password) return toast.info("Please fill all fields");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (error) toast.error(error.message);
    }, [error]);

    return <form className="space-y-6 px-6 py-4" onSubmit={handleLogin}>
        <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
        <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                Your Email
            </label>
            <input
                onChange={handleChangeInput}
                type="email"
                name="email"
                id="email"
                className="formTextInput"
                placeholder="name@fojin.tech"
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
                className="formTextInput"
                placeholder="********"
            />
        </div>
        <button type="submit" className="formSubmitButton">
            {loading ? "Loging in..." : "Login"}
        </button>
        <button className="flex w-full justify-end" onClick={() => handleClick(AuthModalType.ForgotPassword)}>
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
                Forgot Password?
            </a>
        </button>
        <div className="text-sm font-medium text-gray-300">
            Not Registered?
            <a href="#" className="pl-2 text-blue-700 hover:underline" onClick={() => handleClick(AuthModalType.Register)}>
                Create account
            </a>
        </div>
    </form>
};

export default Login;
