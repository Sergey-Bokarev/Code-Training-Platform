import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playgroung from "./Playground/Playground";
import { Problem } from "@/src/utils/types/problem";

type WorkspaceType = {
    problem: Problem;
};

const Workspace: React.FC<WorkspaceType> = ({problem}) => {
    const [justSolved, setJustSolved] = useState<boolean>(false);

    return (
        <Split className="split" minSize={0}>
            <ProblemDescription problem={problem} justSolved={justSolved} />
            <Playgroung problem={problem} setJustSolved={setJustSolved} />
        </Split>
    )
}

export default Workspace;
