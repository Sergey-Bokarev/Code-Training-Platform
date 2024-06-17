import React, { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import TestCases from "./TestCases/TestCases";
import CodeEditor from "./CodeEditor/CodeEditor";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "@/src/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { problems } from "@/src/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type PlaygroungProps = {
    problem: Problem;
    setJustSolved: (justSoved: boolean) => void;
};

const Playgroung: React.FC<PlaygroungProps> = ({problem, setJustSolved}) => {
    let [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [user] = useAuthState(auth);
    const {query: {pid}} = useRouter();

    const handleSubmit = async () => {
        if (!user) {
            toast("Please login to submit your code");
            return;
        }
        try {
            userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
            const cb = new Function(`return ${userCode}`)();
            const handlerFunction = problems[pid as string].handlerFunction;
            const success = typeof handlerFunction === "function" ? handlerFunction(cb) : false;
            if (success) {
                const userRef = doc(firestore, "users", user!.uid);
                await updateDoc(userRef, {solvedProblems: arrayUnion(problem.id)});
                toast.success("Congratulations! All tests passed!");
                setJustSolved(true);
            }
        } catch (error: any) {
            if(error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
                toast.error("Oops, One or more test cases failed!");
            } else {
                toast.error(error.message);
            }
        }
    };

    const onChange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}`, JSON.stringify(value));
    };

    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode);
        } else {
            setUserCode(problem.starterCode);
        }
    }, [pid, user, problem.starterCode]);

    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
            <PreferenceNav />
            <Split className="h-[calc(100vh-94px)] pb-[40px]" direction="vertical" sizes={[55, 45]} minSize={60}>
                <CodeEditor userCode={userCode} onChange={onChange} />
                <TestCases problem={problem} />
            </Split>
            <EditorFooter handleSubmit={handleSubmit} />
        </div>
    )
}

export default Playgroung;
