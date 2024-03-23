import Topbar from "@/components/Topbar/Topbar";
import React from "react";

type ProblemPageType = {};

const ProblemPage: React.FC<ProblemPageType> = () => {

    return (
        <div>
            <Topbar problemPage />
        </div>
    );
}

export default ProblemPage;
