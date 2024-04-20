import React from "react";
import { firestore } from "@/firebase/firebase";
import IFirebaseProblem from "@/firebase/interface/IProblem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

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

export {
    useGetProblems
}
