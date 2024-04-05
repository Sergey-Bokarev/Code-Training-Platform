import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";

type WorkspaceType = {};

const Workspace: React.FC<WorkspaceType> = () => {

    return (
        <Split className="split" minSize={0}>
            <ProblemDescription />
            <div>Code editor</div>
        </Split>
    )
}

export default Workspace;
