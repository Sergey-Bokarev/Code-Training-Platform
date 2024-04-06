import React from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import TestCases from "./TestCases/TestCases";
import CodeEditor from "./CodeEditor/CodeEditor";

type PlaygroungProps = {};

const Playgroung: React.FC<PlaygroungProps> = () => {

    return (
        <div className="flex flex-col bg-dark-layer-1 relative">
            <PreferenceNav />
            <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
                <CodeEditor />
                <TestCases />
            </Split>
        </div>
    )
}

export default Playgroung;
