import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playgroung from "./Playground/Playground";

type WorkspaceType = {};

const Workspace: React.FC<WorkspaceType> = () => {

    return (
        <Split className="split" minSize={0}>
            <ProblemDescription />
            <Playgroung />
        </Split>
    )
}

export default Workspace;
