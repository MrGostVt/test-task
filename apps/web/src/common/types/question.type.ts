export const QuestionTypes = ['One answer', 'Several answers', 'Date', 'Text']


export type Answer = {
    id: number,
    value: string
}
export type Question = {
    id: number,
    title: string,
    type: number,
    answers: Answer[],
    rightAnswers?: (number | string)[],
}