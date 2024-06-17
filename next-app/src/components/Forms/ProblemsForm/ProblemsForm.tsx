import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { firestore } from "@/src/firebase/firebase";
import { IFirebaseProblem } from "@/src/firebase/interface/IFirebaseProblem";

type ProblemsFormType = {};

const ProblemsForm: React.FC<ProblemsFormType> = () => {
    const [inputs, setInputs] = useState<IFirebaseProblem>({
        id: "",
        title: "",
        difficulty: "",
        category: "",
        videoId: "",
        link: "",
        order: "0",
        likes: 0,
        dislikes: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProblem = {
            ...inputs,
            order: Number(inputs.order)
        };
        await setDoc(doc(firestore, "problems", inputs.id), newProblem);
        toast.success("saved to firestore");
    }

    return (
        <form className="p-6 flex flex-col w-[600px] gap-3" onSubmit={handleSubmit}>
            <input
                className="formTextInput"
                type="text"
                placeholder="problem id"
                name="id"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="title"
                name="title"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="difficulty"
                name="difficulty"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="category"
                name="category"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="order"
                name="order"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="videoId?"
                name="videoId"
                onChange={handleInputChange}
            />
            <input
                className="formTextInput"
                type="text"
                placeholder="link?"
                name="link"
                onChange={handleInputChange}
            />
            <button
                className="formSubmitButton"
                type="submit"
            >
                Save to db
            </button>
        </form>
    );
}

export default ProblemsForm;
