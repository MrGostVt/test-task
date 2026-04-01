import type { FormPrev } from "./formPreview.type";
import type { Question } from "./question.type";

export type Form = {
    questions: Question[]
} & FormPrev