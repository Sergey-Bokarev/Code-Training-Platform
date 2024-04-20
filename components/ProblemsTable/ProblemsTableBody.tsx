import React from "react";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { youtubeModalState } from "@/atoms/youtubeModalAtom";
import { useGetProblems } from "./ProblemsTableBody.hooks";
import IFirebaseProblem from "@/firebase/interface/IProblem";

type ProblemsTableBodyProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTableBody:React.FC<ProblemsTableBodyProps> = ({setLoadingProblems}) => {

    const problems = useGetProblems(setLoadingProblems);
    const setYoutubeState = useSetRecoilState(youtubeModalState);

    const openModal = (videoId: string | undefined) => {
        setYoutubeState((prev) => ({...prev, isOpen: true, videoId: videoId ?? ""}));
    }

    return (
        <tbody className="text-white ">
            {problems.map((problem: IFirebaseProblem, idx: number) => {
                const dificultyColor: string = problem.difficulty === "Easy" ? "text-dark-green-s" : problem.difficulty === "Medium" ? "text-dark-yellow" : "text-dark-pink";
                return (
                    <tr className={`${idx % 2 === 1 ? 'bg-dark-layer-1' : ""}`} key={problem.id}>
                        <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                            <BsCheckCircle fontSize="18" width="18" />
                        </th>
                        <td className="px-6 py-4">
                            <Link href={`/problems/${problem.id}`} className="hover:text-blue-600 cursor-pointer">
                                {problem.title}
                            </Link>
                        </td>
                        <td className={`px-6 py-4 ${dificultyColor}`}>
                            {problem.difficulty}
                        </td>
                        <td className="px-6 py-4">
                            {problem.category}
                        </td>
                        <td className="px-6 py-4">
                            {problem.videoId
                                ? <AiFillYoutube
                                    fontSize="28"
                                    className="cursor-pointer hover:text-red-500"
                                    onClick={() => openModal(problem.videoId)}
                                />
                                : <p className="text-gray-400">Coming Soon</p>}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default ProblemsTableBody;
