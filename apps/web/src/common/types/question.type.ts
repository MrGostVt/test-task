export const QuestionTypes = ['One answer', 'Several answers', 'Date', 'Text']


export type Answer = {
    id: string,
    value: string
}
export type Question = {
    id: string,
    title: string,
    type: number,
    answers: Answer[],
    rightAnswers?: (number | string)[],
}