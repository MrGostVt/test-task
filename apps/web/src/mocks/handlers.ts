import { graphql } from "msw";
import type { Question } from "../common/types/question.type";

const forms = [
    {id: 0, name: 'Form1', description: 'First Form', questions: []},
    {id: 1, name: 'Form2', description: 'Second Form', questions: []},
    {id: 2, name: 'Form3', description: 'Third Form', questions: []},
    {id: 3, name: 'Form4', description: 'Fourth Form', questions: []},
    {id: 4, name: 'Form5', description: 'Fifth Form', questions: []},
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
