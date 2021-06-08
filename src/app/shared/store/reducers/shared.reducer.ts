import { createReducer, on, Action } from '@ngrx/store';
import { Category } from "src/app/shared/models/category";
import * as AppActions from '../actions/shared.actions'


export interface State{
    categories:Category[];
    errorMessage:string;
}

const initialState:State = {
    categories:[],
    errorMessage:''
}


const sharedPageReducer = createReducer(
    initialState,
    on(AppActions.fetchCategories, (state, {})=>{
        return {
            ...state
        }
    }),
    on(AppActions.setCategories, (state, {categories})=>{
        return {
            ...state,
            categories:[...categories]
        }
    }),
    on(AppActions.catLoadFail, (state, {errorMessage})=>{
        return {
            ...state,
            errorMessage
        }
    })
  );
  
  export function sharedReducer(state: State | undefined, action: Action) {
    return sharedPageReducer(state, action);
  }
  