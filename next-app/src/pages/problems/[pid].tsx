import React from "react";
import Topbar from "@/src/components/Topbar/Topbar";
import Workspace from "@/src/components/Workspace/Workspace";
import { problems } from "@/src/utils/problems";
import { Problem } from "@/src/utils/types/problem";

type ProblemPageType = {
    problem: Problem;
};

const ProblemPage: React.FC<ProblemPageType> = ({problem}) => {

    return (
        <div>
            <Topbar problemPage />
            <Workspace problem={problem} />
        </div>
    );
}

export default ProblemPage;

export async function getStaticPaths() {
    const paths = Object.keys(problems).map(key => ({
        params: {pid: key}
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}: {params: {pid: string}}){
    const {pid} = params;
    const problem = problems[pid];

    if (!problem){
        return {
            notFound: true
        }
    }

    problem.handlerFunction = problem.handlerFunction.toString();

    return {
        props: {
            problem
        }
    }
}
