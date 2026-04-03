import type { DefaultForm, Form } from "./types/form.type";
import type { FormPrev } from "./types/formPreview.type";
import type { DefaultResponse } from "./types/response.type";
import type { UserAnswer } from "./types/user-answers.type";

const API = import.meta.env.API || 'http://localhost:3000/graphql'

class ServerController {

    async loading (time: number){
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        })
    }

    async fillForm(answers: UserAnswer[], formId: number){
        const result = await this.#makeRequest(`
            mutation fillForm($formId: ID!, $data: InputUserAnswersDto!) {
                fillForm(
                    formId: $formId
                    userAnswers: $data
                ) {
                    success
                }
            }
        `, {data: {answers: answers}, formId});
        console.log(result);
        if(!result) return false;
        return result.fillForm.success || false;
    }

    async createForm(form: Form){
        const {name, description, questions} = form;

        const result = await this.#makeRequest(`
            mutation createForm($data: InputFormDto!) {
                createForm(
                    data: $data
                ){
                    success
                }
            }
        `, {data: {name, description, questions}});
        console.log(result);
        if(!result) return false;
        return result.createForm.success || false;
    }

    async getForms () {
        const result = await this.#makeRequest(`
            query {
                forms {
                    id
                    name
                    description
                }
            }
        `);

        if(!result) return [];
        return (result.forms || []) as FormPrev[];
    }
    async getForm(id: number){
        const result = await this.#makeRequest(`
            query ($id: ID!){
                form(id: $id) {
                    id
                    name
                    description
                    questions {
                        id
                        type
                        title
                        answers{
                            id
                            value
                        }
                    }
                }
            }
        `, {id});

        if(!result) return null;
        return result.form as Form;
    }

    async getResponces(id: number){
        const result = await this.#makeRequest(`
            query ($id: ID!){
                form(id: $id) {
                    id
                    name
                    description
                    questions {
                        id
                        type
                        title
                        answers{
                            id
                            value
                        }
                    }
                    userAnswers{
                        questionId
                        answers
                    }
                }
            }
        `, {id});

        if(!result) return null;
        return result.form as DefaultForm ;
    }


    async #makeRequest(query: string, variables?: Object){
        const body = {
            query,
            variables: variables || {},
        }

        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        }

        try{

            const response = await fetch(API, request);
            if(response.status > 400){
                throw {
                    messages: ['Something went wrong'],
                    status: response.status
                };
            }
            const payload = await response.json() as DefaultResponse;
            if(!!payload.errors && payload.errors.length > 0) {
                throw {
                    messages: payload.errors,
                    status: 404,
                } 
            }

            return payload.data;
        }
        catch(error){
            console.log(error, "Error");
            return null;
        }
    }
}



export const server = new ServerController();