import React from "react";
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";

type ProblemPageType = {};

const ProblemPage: React.FC<ProblemPageType> = () => {

    return (
        <div>
            <Topbar problemPage />
            <Workspace />
        </div>
    );
}

export default ProblemPage;
