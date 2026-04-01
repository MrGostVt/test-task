import { useCallback, useState } from "react"
import { FormPreviewBuilder } from "../components/forms/formPreviewBuilder"
import { QuestionButton } from "../components/forms/questionButton";
import { QuestionBuilder } from "../components/forms/questionButilder";
import type { Question } from "../common/types/question.type";

const placeholders = {
    name: 'New form',
    description: 'Description',
};

export const FormBuilderPage = ({}) => {
    const [prev, setPrev] = useState(placeholders);
    const [questions, setQuestions] = useState<Question[]>([]);

    const AddQuestion = useCallback(() => {
        console.log('YOOO')
        setQuestions([...questions, {id: questions.length, title: 'Question', type: 0, answers: []}]);
    }, [questions]);

    return(
        <div className='Page'>
            <FormPreviewBuilder placeholders={placeholders} callback={() => {}}/>
            {questions.map((val) => (
                <QuestionBuilder key={val.id}/>
            ))}
            <QuestionButton callback={AddQuestion} title="Add a question" borderless={true}/>
            <QuestionButton callback={() => {}} title="Send"/>
        </div>
    )
}
