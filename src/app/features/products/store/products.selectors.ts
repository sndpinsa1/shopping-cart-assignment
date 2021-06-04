import { State } from "./products.reducer";
import * as fromApp from '../../../store/app.reducer'
export const getCartItems = (state:fromApp.AppState) => state.products.items;