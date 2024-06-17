import React, { useEffect } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsModalState } from "@/src/atoms/settingsModalAtom";

type CodeEditorProps = {
    userCode: string;
    onChange: (value: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({userCode, onChange}) => {
    const settingsModal = useRecoilValue(settingsModalState);
    const setSettingsModalState = useSetRecoilState(settingsModalState);

    useEffect(() => {
        const initialFontSize = localStorage.getItem("editor-font-size");
        setSettingsModalState((prev) => ({...prev, fontSize: initialFontSize ? initialFontSize : prev.fontSize}));
    }, []);

    return (
        <div className="w-full overflow-auto">
            <ReactCodeMirror
                value={userCode}
                onChange={onChange}
                theme={vscodeDark}
                extensions={[javascript()]}
                style={{fontSize: settingsModal.fontSize}}
            />
        </div>
    )
}

export default CodeEditor;
