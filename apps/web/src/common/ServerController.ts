import type { Form } from "./types/form.type";
import type { FormPrev } from "./types/formPreview.type";
import type { DefaultResponse } from "./types/response.type";
import type { UserAnswer } from "./types/user-answers.type";


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
            mutation fillForm($formId: Int!, $answers: [UserAnswers!]!){
                success
            }
        `, {answers, formId});
        console.log(result);
        return result.success || false;
    }

    async createForm(form: Form){
        console.log(form);
        const result = await this.#makeRequest(`
            mutation createForm($input: Form!) {
                success
            }
        `, {form});
        console.log(result);
        return result.success || false;
    }

    async getForms () {
        const result = await this.#makeRequest(`
            query forms {
                forms {
                    id
                    name
                }
            }
        `);
        
        return (result.forms || []) as FormPrev[];
    }
    async getForm(id: number){
        const result = await this.#makeRequest(`
            query fillform($id: Int!) {
                form(id: $id) {
                    id
                    name
                    questions {
                        id
                        title
                        type
                    }
                }
            }
        `, {id});

        return result as Form;
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
            const response = await fetch('/graphql', request);
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
            console.log(error);
            return null;
        }
    }
}



export const server = new ServerController();