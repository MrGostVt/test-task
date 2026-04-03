import type { Question } from "./question.type";
import { UserAnswer } from "./user-answers.type";

export type Form = {
    id: number,
    name: string,
    description: string,
    questions: Question[],
    userAnswers: UserAnswer[][],
}