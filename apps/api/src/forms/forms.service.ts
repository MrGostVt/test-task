import { Injectable } from '@nestjs/common';
import { RamDbService } from 'src/ram-db/ram-db.service';
import { InputFormDto } from './dto/inputForm.dto';
import { InputUserAnswersDto } from './dto/inputUserAnswers.dto';
import { GraphQLError } from 'graphql/error';

@Injectable()
export class FormsService {
    constructor(
        private readonly ramDb: RamDbService
    ){}
    
    createForm(data: InputFormDto){
        const {name, description, questions} = data;
        this.ramDb.addEntry(
            {
                name, description, questions, userAnswers: [],
                id: +new Date(),
            }
        )
        return true;
    }
    fillForm(formId: number, answers: InputUserAnswersDto){
        const index = this.ramDb.findEntry((val) => val.id === formId);
        if(index === -1) throw new GraphQLError('Form not found', {extensions: {code:'NOT_FOUND', http: {status: 404}}});

        this.ramDb.getEntry(index).userAnswers.push(answers.answers);
        
        console.log(this.ramDb.getEntry(index).userAnswers);
        // this.ramDb.updateEntry((val) => val.id === formId, {
        //     ...form, userAnswers: [...form.userAnswers, answers.answers],
        // });

        return true;
    }
    get(){
        return this.ramDb.getAll();
    }
    getForm(formId: number){
        const index = this.ramDb.findEntry((val) => val.id === formId);
        if(index === -1) throw new GraphQLError('Form not found', {extensions: {code:'NOT_FOUND', http: {status: 404}}});
        const form = this.ramDb.getEntry(index);
        return form;
    }

}
