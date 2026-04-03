import type { FormPrev } from "./formPreview.type";
import type { Question } from "./question.type";
import type { UserAnswer } from "./user-answers.type";

export type Form = {
    questions: Question[]
} & FormPrev

export type DefaultForm = {
    userAnswers: UserAnswer[][],
} & Form