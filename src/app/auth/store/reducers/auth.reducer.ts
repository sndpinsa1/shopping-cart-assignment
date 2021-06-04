import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as AuthActions from '../actions/auth.action'
export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};


const authPageReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, {email, password, firstName})=>{
        const user = {email,password,firstName};
        return {
            ...state,
            user
        }
    }),
    on(AuthActions.logout, (state, {})=>{
        return {
            ...state,
            user:null
        }
    })
  );
  
  export function authReducer(state: State | undefined, action: Action) {
    return authPageReducer(state, action);
  }
  