import { useEffect, useMemo, useState } from "react";
import {  type Answer, type Question } from "../../common/types/question.type"
import { TextInput } from "../input/textinput"


export const QuestionBlock = (props: {data: Question, updateAnswers: (id: number, value: (number | string)[]) => void}) => {
    const {title, type, answers, id} = props.data;
    const [,setChosen] = useState<(number | string)[]>([])

    function HandleAnswersUpdate(value: (number | string)[]){
        setChosen(value); 
        props.updateAnswers(id, value);
    }

    return(
        <div className="QuestionBuilder VerticalMargin">
            <div style={{
                position: 'relative',
                marginTop: '1.5vh',
                display: 'flex',
                left: '5%', width: '90%',
                height: '5.5vh', gap: '10%'
            }}>
                {/* <h1 className="QuestionTitleBuilder">{title}</h1> */}
                <TextInput callback={() => {}} defaults={title} disabled={true} fontSize="2em"/>
                
            </div>
            
            <AnswerBlock type={type} callback={HandleAnswersUpdate} answers={answers}/>
        </div>
    )
}

interface AnswerProps {
    type: number, callback: (value: any) => void, answers: Answer[]
}

const AnswerBlock = (props: AnswerProps) => {
    const {type, callback, answers} = props;
    const [chosen, setChosen] = useState<(number | string)[]>([]);

    useEffect(() => {
        callback(chosen);
    }, [chosen]);

    const answerList = useMemo(() => {
        switch(type){
            case 3: return <TextInput callback={(val: string) => {setChosen([val])}} placeholder="Answer"/>;
            case 2: return <input type="date" onChange={(ev) => setChosen([ev.target.value])}></input>;
            case 1:
            case 0:
                return answers.map((val) => (
                    <div style={{
                        position: 'relative', display: 'flex', alignItems: 'center',
                        flexDirection: 'row', gap: '10px'
                    }} key={val.id}>
                        <input name="answers" checked={chosen.includes(val.id)} value={val.id} type={type === 0? 'radio': 'checkbox'} 
                        onChange={() => {
                            
                            if(chosen.includes(val.id) && type === 1){
                                setChosen(chosen.filter(answer => answer != val.id));
                            }
                            else if(type === 0){
                                setChosen([val.id]);
                            }
                            else{
                                setChosen([...chosen, val.id])
                            }
                        }}>
                        </input>
                        {val.value}
                    </div>
                ));
        }
    }, [answers, type, chosen]);

    return(
        <div className="AnswersList">
            <form>
                {answerList}
            </form>
            <div className="InvisPlaceHolder" />
        </div>
    )
}