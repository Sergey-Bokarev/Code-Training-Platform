import { authModalState } from "@/atoms/authModalAtom";
import { AuthModalType } from "@/enum/AuthModalType";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

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
            toast.loading("Creating your account...", {toastId: "loadingToast"});
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: []
            };
            await setDoc(doc(firestore, "users", newUser.user.uid), userData);
            toast.success("User created");
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            toast.dismiss("loadingToast");
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
                className="formTextInput"
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
                className="formTextInput"
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
                className="formTextInput"
                placeholder="********"
            />
        </div>

        <button type="submit" className="formSubmitButton">
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
