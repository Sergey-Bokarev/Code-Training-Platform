import { Example, Problem } from "@/utils/types/problem";
import React from "react";

type TestCasesProps = {
    problem: Problem;
};

const TestCases: React.FC<TestCasesProps> = ({problem}) => {

    return (
        <div className="w-full px-5 overflow-auto">
            <div className="flex h-10 items-center space-x-6">
                <div className="relative flex h-full flex-col justify-center cursor-pointer">
                    <div className="text-sm font-medium leading-5 text-white">Testcases</div>
                    <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
                </div>
            </div>
            <div className="flex">
                {problem.examples.map((example: Example, idx: number) => (
                    <div key={example.id} className="mr-2 items-start mt-2 text-white">
                        <div className="flex flex-wrap items-center gap-y-4">
                            <div className="tabBtn">
                                {`Case ${idx + 1}`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="font-semibold my-4">
                <p className="text-sm font-medium mt-4 text-white">Input:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    {problem.examples[0].inputText}
                </div>
                <p className="text-sm font-medium mt-4 text-white">Output:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                    {problem.examples[0].outputText}
                </div>
            </div>
        </div>
    )
}

export default TestCases;
