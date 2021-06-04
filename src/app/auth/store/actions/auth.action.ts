import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Auth] Login',
    props<{email:string, password:string, firstName?:string}>()
);

export const logout = createAction(
    '[Auth] logout',
)




