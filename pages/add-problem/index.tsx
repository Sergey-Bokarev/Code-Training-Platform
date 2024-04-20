import React from "react";
import ProblemsForm from "@/components/Forms/ProblemsForm/ProblemsForm";

type AddProblemType = {};

const AddProblem: React.FC<AddProblemType> = () => {

    return (
        <div className="flex items-center justify-center h-screen">
            <ProblemsForm />
        </div>
    );
}

export default AddProblem;
