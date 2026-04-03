import { Injectable } from '@nestjs/common';
import type { Form } from 'src/common/types/commonform.type';

const questions = [    
    {id: 1775123911889, type: 0, answers: [
        {id: 1775123918457, value: 'Answer 1'},
        {id: 1775123920641, value: 'Answer 2 '},
        {id: 1775123922849, value: 'Answer 3 '},
        {id: 1775123925209, value: 'Answer 4'},
    ], rightAnswers: [1775123920641], title: 'Test 1'},
    {id: 1775123912545, type: 1, answers: [
        {id: 1775123932217, value: 'Answer 1'},
        {id: 1775123934577, value: 'Answer 2'},
        {id: 1775123936697, value: 'Answer 3'},
        {id: 1775123938801, value: 'Answer 4'},
    ], rightAnswers: [1775123934577,1775123936697,1775123938801], title: 'Test 2'},
    {id: 1775123913273, type: 2, answers: [], rightAnswers: [], title: 'Test 3'},
    {id: 1775123914057, type: 3, answers: [], rightAnswers: [], title: 'Test 4'},
];

@Injectable()
export class RamDbService {
    private store: Form[] = [    
        {id: 0, name: 'First form', description: 'Question test form', questions: questions, userAnswers: []}
    ];

    addEntry(val: Form){
        this.store.push(val);
    }
    getEntry(id: number){
        return this.store[id];
    }
    findEntry(predicate: (val: Form) => boolean){
        const result = this.store.findIndex(predicate);
        return result;
    }
    updateEntry(predicate: (val: Form) => boolean, value:Form){
        const entry = this.findEntry(predicate);
        this.store[entry] = value;
    }
    getAll(){
        return [...this.store];
    }
}
