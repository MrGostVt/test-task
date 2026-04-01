import type { Form } from "./form.type"

export type RequestError = {
    error: string,
}

export type FillFormResponse = {
    data: Form,
    errors?: RequestError[]
}

export type DefaultResponse = {
    data: any,
    errors?: RequestError[];
}