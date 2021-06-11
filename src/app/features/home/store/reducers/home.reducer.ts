import { createReducer, on, Action } from '@ngrx/store';
import { Category } from '../../../../shared/models/category';
import { Banner } from '../../models/banner';
import * as HomeActions from '../actions/home.action';

export interface State {
  banners: Banner[];
  categories: Category[];
  errorMessage: string;
}

export const initialState: State = {
  banners: [],
  categories: [],
  errorMessage: '',
};

const homePageReducer = createReducer(
  initialState,
  on(HomeActions.fetchBanners, (state, {}) => {
    return {
      ...state,
    };
  }),

  on(HomeActions.setBanners, (state, { banners }) => {
    return {
      ...state,
      banners: [...banners],
    };
  }),

  on(HomeActions.loadingFail, (state, { errorMessage }) => {
    return {
      ...state,
      errorMessage,
    };
  })
);

export function homeReducer(state: State | undefined, action: Action) {
  return homePageReducer(state, action);
}
