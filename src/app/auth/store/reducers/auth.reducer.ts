import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as AuthActions from '../actions/auth.action';
export interface State {
  user: User;
}

export const initialState: State = {
  user: { email: '', password: '' },
};

const authPageReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(AuthActions.logout, (state, {}) => {
    return {
      ...state,
      user: { email: '', password: '' },
    };
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return authPageReducer(state, action);
}
