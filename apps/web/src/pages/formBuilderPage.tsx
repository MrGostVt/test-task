import { useCallback, useState } from "react"
import { FormPreviewBuilder } from "../components/forms/formPreviewBuilder"
import { QuestionButton } from "../components/forms/questionButton";
import { QuestionBuilder } from "../components/forms/questionButilder";
import type { Question } from "src/common/types/question.type";
import { server } from "../common/serverController";
import { useNavigate } from "react-router";

const placeholders = {
    name: 'New form',
    description: 'Description',
};

export const FormBuilderPage = ({}) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState(placeholders.name);
    const [description, setDescription] = useState(placeholders.description);
    const navigate = useNavigate();

    const AddQuestion = useCallback(() => {
        console.log('YOOO')
        setQuestions([...questions, {id: +new Date(), title: 'Question', type: 0, answers: []}]);
    }, [questions]);
    const UpdateQuestions = useCallback((id: number, data: Question | null) => {
        if(data === null) return setQuestions(questions.filter(quest => quest.id !== id));

        setQuestions(questions.map(val => {
            if(val.id === id) return data;
            return val;
        }));
    }, [questions]);
    const HandlePreviewUpdate = useCallback((property: string, value: string) => {
        switch(property){
            case 'name': setTitle(value); break;
            case 'description': setDescription(value); break;
        }
    }, []);

    return(
        <div className='Page'>
            <FormPreviewBuilder placeholders={placeholders} callback={HandlePreviewUpdate}/>
            {questions.map((val) => (
                <QuestionBuilder id={val.id} callback={UpdateQuestions} key={val.id}/>
            ))}
            <QuestionButton callback={AddQuestion} title="Add a question" borderless={true}/>
            <QuestionButton callback={() => {
                if(questions.length > 0) server.createForm({id: 0, name: title, questions, description}).then((result) => {if(result) navigate('/', {replace: true})});
                else{alert('The form must have at least 1 question.')}
            }} title="Send"/>
        </div>
    )
}
