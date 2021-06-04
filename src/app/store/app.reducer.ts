import { ActionReducerMap } from "@ngrx/store";
import * as fromProducts from '../features/products/store/products.reducer';
import * as fromAuth from '../auth/store/reducers/auth.reducer';
import * as fromHome from '../home/store/reducers/home.reducer';
import * as fromApp from '../store/reducers/globel.reducer'

export interface AppState {
  products: fromProducts.State;
  auth: fromAuth.State
  home:fromHome.State 
  global:fromApp.State
}


export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  auth: fromAuth.authReducer,
  home:fromHome.homeReducer,
  global:fromApp.homeReducer
};
