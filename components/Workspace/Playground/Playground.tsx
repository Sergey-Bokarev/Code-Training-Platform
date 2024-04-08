import React from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import TestCases from "./TestCases/TestCases";
import CodeEditor from "./CodeEditor/CodeEditor";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "@/utils/types/problem";

type PlaygroungProps = {
    problem: Problem;
};

const Playgroung: React.FC<PlaygroungProps> = ({problem}) => {

    return (
        <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
            <PreferenceNav />
            <Split className="h-[calc(100vh-94px)] pb-[40px]" direction="vertical" sizes={[55, 45]} minSize={60}>
                <CodeEditor problem={problem} />
                <TestCases problem={problem} />
            </Split>
            <EditorFooter />
        </div>
    )
}

export default Playgroung;
