import { graphql } from "msw";
import type { Question } from "../common/types/question.type";

const questions = [    
    {id: 1775123911889, type: 0, answers: [
        {id: 1775123918457, value: 'Answer 1'},
        {id: 1775123920641, value: 'Answer 2 '},
        {id: 1775123922849, value: 'Answer 3 '},
        {id: 1775123925209, value: 'Answer 4'},
    ], rightAnswers: [1775123920641], title: 'Test 1'},
    {id: 1775123912545, type: 1, answers: [
        {id: 1775123932217, value: 'Answer 1'},
        {id: 1775123934577, value: 'Answer 2'},
        {id: 1775123936697, value: 'Answer 3'},
        {id: 1775123938801, value: 'Answer 4'},
    ], rightAnswers: [1775123934577,1775123936697,1775123938801], title: 'Test 2'},
    {id: 1775123913273, type: 2, answers: [], rightAnswers: [], title: 'Test 3'},
    {id: 1775123914057, type: 3, answers: [], rightAnswers: [], title: 'Test 4'},
]

const forms: {id: number, name: string, description: string, questions: any[], userAnswers: any[]}[] = [
    {id: 0, name: 'First form', description: 'Question test form', questions: questions, userAnswers: []},
    {id: 1, name: 'Form2', description: 'Second Form', questions: questions, userAnswers: []},
    {id: 2, name: 'Form3', description: 'Third Form', questions: questions, userAnswers: []},
    {id: 3, name: 'Form4', description: 'Fourth Form', questions: [], userAnswers: []},
    {id: 4, name: 'Form5', description: 'Fifth Form', questions: [], userAnswers: []},
]

export const handlers = [
    graphql.query<{forms: {id: number, name: string}[]}>('forms', ({}) => {
        return Response.json(
            {
                data: {
                    forms: forms.map((val) => {
                        const {id, name, description} = val;
                        return {id, name, description}
                    })
                }
            }
        );
    }),
    graphql.query<{form: {id: number, name: string, questions: Question[]}}>('fillform', ({variables}) => {
        if(!forms[variables.id]) return Response.json({
            errors: [
                {
                    message: 'Not found',
                }
            ]
        })
        return Response.json(
            {
                data: {...forms[variables.id]}
            }
        );
    }),
    graphql.mutation('createForm', ({variables}) => {
        const {form} = variables;
        console.log(form);

        forms.push({...form, id: forms.length});
        return Response.json({data:{success: true}});
    }),
    graphql.mutation('fillForm', ({variables}) => {
        const {answers, formId} = variables;
        console.log(answers);
        const formIndex = forms.findIndex((val) => val.id === formId);
        if(formIndex === -1) return Response.json({
            errors: [
                {
                    message: 'Not found',
                }
            ]
        })
        forms[formIndex].userAnswers.push(answers);
        // forms.push({...form, id: forms.length});
        return Response.json({data:{success: true}});
    }),
];



// const res = await fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//         query forms {
//           forms {
//             id
//             name
//           }
//         }
//       `,
//     }),
//   });
//   const result = await res.json();
//   console.log(result);
