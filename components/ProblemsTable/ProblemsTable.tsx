import React, { useState } from "react";
import ProblemsTableBody from "./ProblemsTableBody";
import ProblemsTableHeader from "./ProblemsTableHeader";
import YoutubeModal from "../Modals/YoutubeModal/YoutubeModal";

type ProblemsTable = {};

const ProblemsTable:React.FC<ProblemsTable> = () => {

    return (
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            <ProblemsTableHeader />
            <ProblemsTableBody />
            <YoutubeModal />
        </table>
    )
}

export default ProblemsTable;
