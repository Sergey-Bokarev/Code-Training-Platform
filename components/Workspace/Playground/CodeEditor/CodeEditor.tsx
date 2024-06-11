import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { Problem } from "@/utils/types/problem";

type CodeEditorProps = {
    problem: Problem;
    onChange: (value: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({problem, onChange}) => {

    return (
        <div className="w-full overflow-auto">
            <ReactCodeMirror
                value={problem.starterCode}
                onChange={onChange}
                theme={vscodeDark}
                extensions={[javascript()]}
                style={{fontSize: 16}}
            />
        </div>
    )
}

export default CodeEditor;
