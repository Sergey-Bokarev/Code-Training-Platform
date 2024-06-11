import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { Problem } from "@/utils/types/problem";

type CodeEditorProps = {
    problem: Problem;
    userCode: string;
    onChange: (value: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({problem, userCode, onChange}) => {

    return (
        <div className="w-full overflow-auto">
            <ReactCodeMirror
                value={userCode}
                onChange={onChange}
                theme={vscodeDark}
                extensions={[javascript()]}
                style={{fontSize: 16}}
            />
        </div>
    )
}

export default CodeEditor;
