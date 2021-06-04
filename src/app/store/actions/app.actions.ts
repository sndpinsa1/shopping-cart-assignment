import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/shared/models/category';

export const setCategories = createAction(
    '[App] set categories',
    props<{categories:Category[]}>()
)

export const fetchCategories = createAction(
    '[App] fetch categories',
)

export const catLoadFail = createAction(
    '[App] categories load fail',
    props<{errorMessage:string}>()
)