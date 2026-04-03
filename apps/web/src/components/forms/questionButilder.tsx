import { useEffect, useMemo, useState } from "react";
import { QuestionTypes, type Answer, type Question } from "@repo/shared"
import { DropDownList } from "../input/dropDownList"
import { TextInput } from "../input/textinput"

const types = QuestionTypes.map((val,i) => {return {value: val, id: i}});

export const QuestionBuilder = (props: {id: number, callback: (id: number, data: Question | null) => void}) => {
    const {callback, id} = props;
    const [type, setType] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [rightAnswers, setRightAnswers] = useState<number[]>([])
    const [title, setTitle] = useState<string>('Title');

    function HandleAnswersUpdate(property: string, value: any){
        switch(property){
            case 'answers': setAnswers(value); break;
            case 'rightAnswers': setRightAnswers(value); break;
        }
    }

    useEffect(() => {
        callback(id, {id, type, answers, rightAnswers, title});
    }, [type, answers, rightAnswers, title]);

    return(
        <div className="QuestionBuilder VerticalMargin">
            <div style={{
                position: 'relative',
                marginTop: '1.5vh',
                display: 'flex',
                left: '5%', width: '90%',
                height: '5.5vh', gap: '10%'
            }}>
                <TextInput callback={(val) => {setTitle(val);}} placeholder="Title"
                fontSize="2em" classes="QuestionTitleBuilder" defaults="Title"
                />
                <DropDownList callback={(id) => {
                    setType(id)
                    }} values={types}/>
            </div>
            
            <AnswersBuilder type={type} callback={HandleAnswersUpdate}/>
            <button className="AddButton" style={{left: '5%', width: '90%', marginBottom: '10px'}} onClick={() =>{
                callback(id, null);
            }}>Remove</button>    
        </div>
    )
}

interface AnswerProps {
    type: number, callback: (prop: string, value: any) => void
}

const AnswersBuilder = (props: AnswerProps) => {
    const {type, callback} = props;
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [rightAnswers, setRightAnswers] = useState<number[]>([]);
    const [tempInput, setInput] = useState<string>('Answer');

    useEffect(() => {
        setRightAnswers([]);
        if(type > 1) setAnswers([]);
    }, [type]);
    useEffect(() => {
        callback('answers', answers);
    }, [answers])
    useEffect(() => {
        callback('rightAnswers', rightAnswers);
    }, [rightAnswers])

    const answerList = useMemo(() => {
        switch(type){
            case 3: return <TextInput disabled={true} callback={() => {}} placeholder="Answer"/>;
            case 2: return <input type="date" disabled={true}></input>;
            case 1:
            case 0:
                return answers.map((val) => (
                    <div style={{
                        position: 'relative', display: 'flex', alignItems: 'center',
                        flexDirection: 'row', gap: '10px', marginTop: '5px',
                    }} key={val.id}>
                        <input name="answers" checked={rightAnswers.includes(val.id)} value={val.id} type={type === 0? 'radio': 'checkbox'} 
                        onChange={() => {
                            
                            if(rightAnswers.includes(val.id) && type === 1){
                                setRightAnswers(rightAnswers.filter(answer => answer != val.id));
                            }
                            else if(type === 0){
                                setRightAnswers([val.id]);
                            }
                            else{
                                setRightAnswers([...rightAnswers, val.id])
                            }
                        }}>
                        </input>
                        {val.value}
                        <button style={{width: '45%', marginLeft: 'auto'}} onClick={(ev) => {
                            ev.preventDefault();
                            setAnswers(answers.filter(answer => answer.id !== val.id));
                            setRightAnswers(rightAnswers.filter(answer => answer !== val.id));
                        }}>Remove</button>
                    </div>
                ));
        }
    }, [answers, type, rightAnswers]);

    const AnswerInput = useMemo(() => {
        switch(type){
            case 0:
            case 1:
                return <div style={{display: 'flex', position: 'relative', marginTop:'5px', gap: '10%', height: '5vh', width: '100%'}}>
                    <TextInput callback={(val) => {setInput(val)}} placeholder="Answer" classes="AnswerInput"
                    fontSize="16px" defaults="Answer"
                    />
                    <button className="AddButton" onClick={() => {
                        setAnswers([...answers, {id: +(new Date()), value: tempInput}])
                    }}>Add</button>
                </div>;
            default: return null;
        }
    }, [type, answers, rightAnswers, tempInput])


    return(
        <div className="AnswersList">
            <form>
                {answerList}
            </form>
            {AnswerInput}
        </div>
    )
}