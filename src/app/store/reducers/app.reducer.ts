import { ActionReducerMap } from "@ngrx/store";
import * as fromProducts from '../../features/products/store/reducers/products.reducer';
import * as fromAuth from '../../auth/store/reducers/auth.reducer';
import * as fromHome from '../../features/home/store/reducers/home.reducer';
import * as fromShared from '../../shared/store/reducers/shared.reducer';

export interface AppState {
  products: fromProducts.State;
  auth: fromAuth.State
  home:fromHome.State 
  global:fromShared.State
}


export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  auth: fromAuth.authReducer,
  home:fromHome.homeReducer,
  global:fromShared.sharedReducer
};
