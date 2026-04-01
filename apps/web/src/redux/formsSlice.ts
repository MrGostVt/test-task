import { createSlice } from "@reduxjs/toolkit";
import type { Action } from "../common/interfaces/Action.interface";
import type { FormPrev } from "../common/types/formPreview.type";
import type { FormState } from "../common/types/FormState";

const defaultState: FormState = {
    forms: []
};

const formsSlice = createSlice({
    name: 'forms',
    initialState: defaultState,
    reducers: {
        addForms(state: FormState, action: Action<FormPrev[]>){
            state.forms.push(...action.payload);
        },
        updateForms(state, action: Action<FormPrev[]>) {
            state.forms = [...action.payload];
        },
    }
});

export const {addForms, updateForms} = formsSlice.actions;
export const formsReducer = formsSlice.reducer;

