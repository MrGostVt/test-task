import { useEffect, useMemo, useState } from "react";
import {  type Answer, type Question } from "../../common/types/question.type"
import { TextInput } from "../input/textinput"


export const QuestionBlock = (props: {
    preview?: boolean, userAnswers?: (number | string)[],
    data: Question, 
    updateAnswers: (id: string, value: (number | string)[]) => void},
) => {
    const {title, type, answers, id, rightAnswers = []} = props.data;
    const {preview = false, userAnswers = []} = props;
    const [,setChosen] = useState<(number | string)[]>([])

    function HandleAnswersUpdate(value: (number | string)[]){
        setChosen(value); 
        props.updateAnswers(id, value);
    }

    useEffect(() => {console.log(rightAnswers, 'RIGHT ANSWERS')}, [])

    return(
        <div className="QuestionBuilder VerticalMargin">
            <div style={{
                position: 'relative',
                marginTop: '1.5vh',
                display: 'flex',
                left: '5%', width: '90%',
                height: '5.5vh', gap: '10%'
            }}>
                <TextInput callback={() => {}} defaults={title} disabled={true} fontSize="2em"/>
            </div>
            
            <AnswerBlock type={type} callback={HandleAnswersUpdate} 
            answers={answers} rightAnswers={rightAnswers} preview={preview}
            userAnswers={userAnswers}/>
        </div>
    )
}

interface AnswerProps {
    type: number, callback: (value: (string | number)[]) => void, answers: Answer[],
    preview?: boolean, userAnswers?: (string | number)[], rightAnswers?: (string | number)[],
}

const AnswerBlock = (props: AnswerProps) => {
    const {type, callback, answers, preview, userAnswers = [], rightAnswers=[]} = props;
    const [chosen, setChosen] = useState<(number | string)[]>([]);

    useEffect(() => {
        callback(chosen);
    }, [chosen]);

    const answerList = useMemo(() => {
        switch(type){
            case 3: return <TextInput callback={(val: string) => {setChosen([val])}}
            defaults={preview? userAnswers.join(' '): ''}
            placeholder="Answer" disabled={preview}/>;
            case 2: return <input type="date" disabled={preview} defaultValue={preview? userAnswers.join(' '): ''} onChange={(ev) => setChosen([ev.target.value])}></input>;
            case 1:
            case 0:
                return answers.map((val) => (
                    <div style={{
                        position: 'relative', display: 'flex', alignItems: 'center',
                        flexDirection: 'row', gap: '10px'
                    }} key={val.id}>
                        <input name="answers" checked={preview? userAnswers.includes(val.id): chosen.includes(val.id)} value={val.id} type={type === 0? 'radio': 'checkbox'} 
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
                        <span style={{borderBottom: preview && rightAnswers.includes(val.id)
                            ? 'solid 3px green': ''}}> {val.value} </span>
                       
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