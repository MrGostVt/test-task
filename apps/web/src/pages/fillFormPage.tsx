
import { useCallback, useState } from "react";
import { FormPreview } from "../components/forms/formPreview";
import { useLoaderData, useNavigate } from "react-router";
import type { Form } from "../common/types/form.type";
import { server } from "../common/serverController";
import { QuestionBlock } from "../components/forms/question";
import { QuestionButton } from "../components/forms/questionButton";
import type { UserAnswer } from "../common/types/user-answers.type";

export const FillFormLoader = async ({params}: any) => {
    const {id} = params;
    await server.loading(1000);
    console.log('Form data loading')
    const result = await server.getForm(id);
    if(!result) throw new Response('Not Found', { status: 404 });
    return result;
}

export const FillFormPage = ({}) => {
    const form = useLoaderData<Form>();
    const {questions} = form;
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(questions.map((val) => {return {questionId: val.id, answers: []}}));
    const navigate = useNavigate();

    const HandleUserAnswer = useCallback((id: number, answers: (string | number)[]) => {
        setUserAnswers(userAnswers.map((val) => {
            if(val.questionId === id) return {questionId: id, answers};
            else return val;
        }))    
    }, [questions, userAnswers]);

    return(
        <div className="Page">
            <FormPreview data={form} disabled={true} callback={() => {}}/>
            {
                questions.map((val) => (
                    <QuestionBlock data={val} updateAnswers={HandleUserAnswer} key={val.id}/>
                ))
            }
            <QuestionButton callback={() => {
                server.fillForm(userAnswers, form.id).then((result) => {console.log(result + ' RESGAG');if(result) navigate('/', {replace: true})});
            }} title="Send"/>
        </div>
    );
}