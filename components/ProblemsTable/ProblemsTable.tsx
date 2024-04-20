import React from "react";
import ProblemsTableBody from "./ProblemsTableBody";
import ProblemsTableHeader from "./ProblemsTableHeader";
import YoutubeModal from "../Modals/YoutubeModal/YoutubeModal";

type ProblemsTableProps = {
    loadingProblems: boolean;
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({loadingProblems, setLoadingProblems}) => {

    return (
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && <ProblemsTableHeader />}
            <ProblemsTableBody setLoadingProblems={setLoadingProblems} />
            <YoutubeModal />
        </table>
    )
}

export default ProblemsTable;
