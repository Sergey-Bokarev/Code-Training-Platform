import { firestore } from "@/firebase/firebase";
import { IFirebaseProblem } from "@/firebase/interface/IFirebaseProblem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function useGetProblem(problemId: string) {
    const [currentProblem, setCurrentProblem] = useState<IFirebaseProblem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

    const getProblemDifficultyClass = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-olive text-olive";
            case "Medium":
                return "bg-dark-yellow text-dark-yellow";
            case "Hard":
                return "bg-dark-pink text-dark-pink";
            default:
                return "";
        }
    }

    useEffect(() => {
        const getProblem = async () => {
            setLoading(true);
            const problemSnapshot = await getDoc(doc(firestore, "problems", problemId));

            if (problemSnapshot.exists()) {
                const problem = problemSnapshot.data() as IFirebaseProblem;
                setCurrentProblem(problem);
                setProblemDifficultyClass(getProblemDifficultyClass(problem.difficulty));
            }

            setLoading(false);
        }

        getProblem();
    }, [problemId]);

    return {currentProblem, loading, problemDifficultyClass};
}

export {
    useGetProblem
}
