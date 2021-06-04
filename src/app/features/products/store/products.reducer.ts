import { Product } from '../../../shared/shared/models/product';
import { Cart } from '../../../shared/shared/models/cart';
import * as ProductActions from './products.action';
import { Action, createReducer, on, Store } from '@ngrx/store';

export interface State {
    items:Cart[],
    products:Product[],
    errorMsg:string,
    selectedCategoryId:string | null
}

const initialState: State = {
  items:[],
  products:[],
  errorMsg:'',
  selectedCategoryId: null
};

const productPageReducer = createReducer(
  initialState,
  on(ProductActions.addToCart, (state, { cart }) => {
    return {
      ...state,
      items: [...state.items, cart]
    };
  }),
  on(ProductActions.updateCartItem, (state, {index,action})=>{
      const item = state.items[index];
      const updatedItem = {
          ...item,
          qty: action === 'add' ? item.qty + 1 : item.qty - 1
      };
      const updatedCartArray = [...state.items];
      if(updatedItem.qty < 1){
          updatedCartArray.splice(index,1);
      }else{
          updatedCartArray[index] = updatedItem
      }
      return {
        ...state,
        items: updatedCartArray
      }
  }),
  on(ProductActions.emptyCart, (state)=>{
    return {
      ...state,
      items:[]
    }
  }),

  on(ProductActions.loadProducts, (state, {id})=>{
    return {
      ...state
    }
  }),

  on(ProductActions.setProducts, (state, {products, selectedCategoryId})=>{
    return {
      ...state,
      products: [...products],
      selectedCategoryId
    }
  }),

  on(ProductActions.productLoadFailed, (state, {errorMsg})=>{
    return {
      ...state,
      errorMsg
    }
  })
);

export function productsReducer(state: State | undefined, action: Action) {
  return productPageReducer(state, action);
}
