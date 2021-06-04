import { createReducer, on, Action } from '@ngrx/store';
import { Category } from "src/app/shared/shared/models/category";
import * as AppActions from '../actions/app.actions'


export interface State{
    categories:Category[];
    errorMessage:string;
}

const initialState:State = {
    categories:[],
    errorMessage:''
}


const homePageReducer = createReducer(
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
  
  export function homeReducer(state: State | undefined, action: Action) {
    return homePageReducer(state, action);
  }
  