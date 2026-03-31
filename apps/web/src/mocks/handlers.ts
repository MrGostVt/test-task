import { graphql } from "msw";

export const handlers = [
    graphql.query<{forms: {id: number, name: string}[]}>('forms', ({}) => {
        return Response.json(
            {
                data: {
                    forms: [
                        {id: 0, name: 'Form1'},
                    ]
                }
            }
        );
    })
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
