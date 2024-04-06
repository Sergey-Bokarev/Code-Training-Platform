import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

type CodeEditorProps = {};

const CodeEditor: React.FC<CodeEditorProps> = () => {

    return (
        <div className="w-full overflow-auto">
            <ReactCodeMirror
                value="const a = 1;"
                theme={vscodeDark}
                extensions={[javascript()]}
                style={{fontSize: 16}}
            />
        </div>
    )
}

export default CodeEditor;
