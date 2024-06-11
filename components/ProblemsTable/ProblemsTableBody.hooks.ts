import React from "react";
import { auth, firestore } from "@/firebase/firebase";
import { IFirebaseProblem } from "@/firebase/interface/IFirebaseProblem";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IFirebaseUser } from "@/firebase/interface/IFirebaseUser";

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<IFirebaseProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const problemsQuery = query(collection(firestore, "problems"), orderBy("order", "asc"));
            const problemsQuerySnapshot = await getDocs(problemsQuery);
            const dbProblems: IFirebaseProblem[] = [];
            problemsQuerySnapshot.forEach((doc) => {
                const problem = doc.data() as IFirebaseProblem;
                dbProblems.push(problem);
            });
            setProblems(dbProblems);
            setLoadingProblems(false);
        }

        getProblems();
    }, []);

    return problems;
}

function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

    const [user] = useAuthState(auth);

    useEffect(() => {
        const getSolvedProblems = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const { solvedProblems } = data as IFirebaseUser;
                setSolvedProblems(solvedProblems);
            }
        }

        if (user) getSolvedProblems();

        return () => setSolvedProblems([]);
    }, [user]);

    return solvedProblems;
}

export {
    useGetProblems,
    useGetSolvedProblems
}
