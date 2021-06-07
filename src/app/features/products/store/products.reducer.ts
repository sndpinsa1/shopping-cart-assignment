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
  items:getCartItemFromLocalStorage(),
  products:[],
  errorMsg:'',
  selectedCategoryId: null
};

const productPageReducer = createReducer(
  initialState,
  on(ProductActions.addToCart, (state, { cart }) => {
    const cartItems = [...state.items, cart];
    setCartItemToLocalStorage(cartItems);
    return {
      ...state,
      items: cartItems
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
      setCartItemToLocalStorage(updatedCartArray);
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

function setCartItemToLocalStorage(cartItems:Cart[]):void{
  localStorage.setItem('cart',JSON.stringify(cartItems))
}

function getCartItemFromLocalStorage():Cart[]{

  let cartItems:Cart[] = [];

  const cartString = localStorage.getItem('cart');

  if(cartString){
    try{
      cartItems = JSON.parse(cartString);
    }catch(e){
      console.log(e);
      cartItems = [];
    }
  }
  return cartItems;
}
export function productsReducer(state: State | undefined, action: Action) {
  return productPageReducer(state, action);
}
