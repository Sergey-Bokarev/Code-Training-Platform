import React from "react";

type ProblemsTable = {};

const ProblemsTableHeader:React.FC<ProblemsTable> = () => {

    return (
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
            <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                    Status
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Dificulty
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Solution
                </th>
            </tr>
        </thead>
    )
}

export default ProblemsTableHeader;
