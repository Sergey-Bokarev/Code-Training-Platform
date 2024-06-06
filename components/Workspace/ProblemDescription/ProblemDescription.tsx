import React, { useState } from "react";
import Image from "next/image";
import { AiFillDislike, AiFillLike, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { Example, Problem } from "@/utils/types/problem";
import { useGetProblem, useGetUsersDataOnProblem } from "./ProblemDescription.hooks";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { Transaction, arrayRemove, arrayUnion, doc, runTransaction, updateDoc } from "firebase/firestore";

type ProblemDescriptionType = {
    problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionType> = ({problem}) => {

    const [user] = useAuthState(auth);
    const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetProblem(problem.id);
    const { liked, disliked, starred, solved, setUserDataOnProblem } = useGetUsersDataOnProblem(problem.id);
    const [updating, setUpdating] = useState<boolean>(false);

    const returnUserAndProblemData = async(transaction: Transaction) => {
        const userRef = doc(firestore, "users", user!.uid);
        const problemRef = doc(firestore, "problems", problem.id);
        const userDoc = await transaction.get(userRef);
        const problemDoc = await transaction.get(problemRef);
        return {
            userRef,
            problemRef,
            userDoc,
            problemDoc
        }
    }

    const handleLike = async() => {
        if (updating) return;
        if (!user) {
            toast.error("You must be logged in to like a problem");
            return;
        }
        setUpdating(true);
        await runTransaction(firestore, async (transaction: Transaction) => {
            const {userDoc, problemDoc, userRef, problemRef} = await returnUserAndProblemData(transaction);
            if (userDoc.exists() && problemDoc.exists()) {
                if (liked) {
                    transaction.update(userRef, {
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes - 1
                    });

                    setUserDataOnProblem(prev => ({...prev, liked: false}));
                    setCurrentProblem(prev => prev ? {...prev, likes: prev.likes - 1} : null);
                } else if (disliked) {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id],
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes + 1,
                        dislikes: problemDoc.data().dislikes - 1
                    });

                    setUserDataOnProblem(prev => ({...prev, liked: true, disliked: false}));
                    setCurrentProblem(prev => prev
                        ? {
                            ...prev,
                            likes: prev.likes + 1,
                            dislikes: prev.dislikes - 1
                        }
                        : null
                    );
                } else {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id]
                    });
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes + 1
                    });

                    setUserDataOnProblem(prev => ({...prev, liked: true}));
                    setCurrentProblem(prev => prev ? {...prev, likes: prev.likes + 1} : null);
                }
            }
        });
        setUpdating(false);
    }

    const handleDislike = async() => {
        if (updating) return;
        if (!user) {
            toast.error("You must be logged in to dislike a problem");
            return;
        }
        setUpdating(true);
        await runTransaction(firestore, async (transaction: Transaction) => {
            const {userDoc, problemDoc, userRef, problemRef} = await returnUserAndProblemData(transaction);
            if (userDoc.exists() && problemDoc.exists()) {
                if (disliked) {
                    transaction.update(userRef, {
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        dislikes: problemDoc.data().dislikes - 1
                    });

                    setUserDataOnProblem(prev => ({...prev, disliked: false}));
                    setCurrentProblem(prev => prev ? {...prev, dislikes: prev.dislikes - 1} : null);
                } else if (liked) {
                    transaction.update(userRef, {
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                    });
                    transaction.update(problemRef, {
                        dislikes: problemDoc.data().dislikes + 1,
                        likes: problemDoc.data().likes - 1
                    });

                    setUserDataOnProblem(prev => ({...prev, liked: false, disliked: true}));
                    setCurrentProblem(prev => prev
                        ? {
                            ...prev,
                            dislikes: prev.dislikes + 1,
                            likes: prev.likes - 1
                        }
                        : null
                    );
                } else {
                    transaction.update(userRef, {
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id]
                    });
                    transaction.update(problemRef, {
                        dislikes: problemDoc.data().dislikes + 1
                    });

                    setUserDataOnProblem(prev => ({...prev, disliked: true}));
                    setCurrentProblem(prev => prev ? {...prev, dislikes: prev.dislikes + 1} : null);
                }
            }
        })
        setUpdating(false);
    }

    const handleStar = async() => {
        if (updating) return;
        if (!user) {
            toast.error("You must be logged in to dislike a problem");
            return;
        }
        setUpdating(true);
        const userRef = doc(firestore, "users", user!.uid);
        if (!starred) {
            await updateDoc(userRef, {starredProblems: arrayUnion(problem.id)});
            setUserDataOnProblem(prev => ({...prev, starred: true}));
        } else {
            await updateDoc(userRef, {starredProblems: arrayRemove(problem.id)});
            setUserDataOnProblem(prev => ({...prev, starred: false}));
        }
        setUpdating(false);
    }

    return (
        <div className="bg-dark-layer-1">
            <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
                <div className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">
                    Description
                </div>
            </div>
            <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
                <div className="px-5">
                    <div className="w-full">
                        <div className="flex space-x-4">
                            <div className="flex-1 mr-2 text-lg text-white font-medium">
                                {problem.title}
                            </div>
                        </div>
                        {!loading && currentProblem && (
                            <div className="flex items-center mt-3">
                                <div className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}>
                                    {currentProblem.difficulty}
                                </div>
                                {solved && (
                                    <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                                        <BsCheck2Circle />
                                    </div>
                                )}
                                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                                    onClick={handleLike}
                                >
                                    {liked && !updating && <AiFillLike className="text-dark-blue-s" />}
                                    {!liked && !updating && <AiFillLike />}
                                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                                    <span className="text-xs">{currentProblem.likes}</span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                                    onClick={handleDislike}
                                >
                                    {disliked && !updating && <AiFillDislike className="text-dark-blue-s" />}
                                    {!disliked && !updating && <AiFillDislike />}
                                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                                    <span className="text-xs">{currentProblem.dislikes}</span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                                    onClick={handleStar}
                                >
                                    {starred && !updating && <TiStarFullOutline className="text-dark-yellow" />}
                                    {!starred && !updating && <TiStarOutline />}
                                    {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                                </div>
                            </div>
                        )}
                        {loading && (
                            <div className="mt-3 flex space-x-2">
                                <RectangleSkeleton />
                                <CircleSkeleton />
                                <RectangleSkeleton />
                                <RectangleSkeleton />
                                <CircleSkeleton />
                            </div>
                        )}
                        <div className='text-white text-sm'>
							<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
						</div>
                        <div className='mt-4'>
							{problem.examples.map((example: Example, idx: number) => (
								<div key={example.id}>
									<p className='font-medium text-white '>{`Example: ${idx + 1}`}</p>
									{example.img && (
										<Image
											src={example.img}
											alt="example-img"
											height={200}
											width={200}
											className="mt-2"
										/>
									)}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong>{example.inputText}
											<br />
											<strong>Output: </strong>{example.outputText}<br />
											{example.explanation && <><strong>Explanation: </strong>example.explanation</>}
										</pre>
									</div>
								</div>
							))}
						</div>
                        <div className='my-5 pb-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc'>
								<div dangerouslySetInnerHTML={{__html: problem.constraints}} />
							</ul>
						</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemDescription;
