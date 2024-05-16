import { auth, firestore } from "@/firebase/firebase";
import { IFirebaseProblem } from "@/firebase/interface/IFirebaseProblem";
import { IFirebaseUser } from "@/firebase/interface/IFirebaseUser";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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

    return {currentProblem, loading, problemDifficultyClass, setCurrentProblem};
}

function useGetUsersDataOnProblem(problemId: string) {
    const [userDataOnProblem, setUserDataOnProblem] = useState({
        liked: false,
        disliked: false,
        starred: false,
        solved: false
    });

    const [user] = useAuthState(auth);

    useEffect(() => {
        const getUserDataOnProblem = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const {
                    solvedProblems,
                    likedProblems,
                    dislikedProblems,
                    starredProblems
                } = data as IFirebaseUser;
                setUserDataOnProblem({
                    solved: solvedProblems.includes(problemId),
                    liked: likedProblems.includes(problemId),
                    disliked: dislikedProblems.includes(problemId),
                    starred: starredProblems.includes(problemId)
                });
            }
        }

        if (user) getUserDataOnProblem();

        return () => setUserDataOnProblem({
            liked: false,
            disliked: false,
            starred: false,
            solved: false
        })
    }, [problemId, user]);

    return {...userDataOnProblem, setUserDataOnProblem}
}

export {
    useGetProblem,
    useGetUsersDataOnProblem
}
