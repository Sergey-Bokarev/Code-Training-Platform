import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playgroung from "./Playground/Playground";
import { Problem } from "@/utils/types/problem";

type WorkspaceType = {
    problem: Problem;
};

const Workspace: React.FC<WorkspaceType> = ({problem}) => {

    return (
        <Split className="split" minSize={0}>
            <ProblemDescription problem={problem} />
            <Playgroung problem={problem} />
        </Split>
    )
}

export default Workspace;
