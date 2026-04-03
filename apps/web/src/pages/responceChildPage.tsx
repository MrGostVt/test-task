import { useLayoutEffect, useState } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router";
import type { DefaultForm } from "../common/types/form.type";
import type { UserAnswer } from "../common/types/user-answers.type";
import type { Question } from "../common/types/question.type";
import { QuestionBlock } from "../components/forms/question";


export const ResponcePageLoader = ({params}: any) => {
    const {id}: {id: number} = params;
    return +id;
}

export const ResponcePage = ({}) => {
    const id = useLoaderData();
    const data: DefaultForm | undefined = useRouteLoaderData("responces");
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    useLayoutEffect(() => {
        if(!!data && !!data.userAnswers[id]){
            setUserAnswers(data.userAnswers[id]);
            setQuestions(data.questions);
            return;
        }

        throw new Error("Wrong id");
    }, []);

    return(
        <>
            {questions.map(val => (
                <QuestionBlock data={val} updateAnswers={() => {}} 
                preview={true} userAnswers={userAnswers.find((answer) => answer.questionId===val.id)?.answers}
                key={val.id}/>
            ))}
        </>
    )
}